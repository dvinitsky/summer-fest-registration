const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');

const app = express();
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

try {
  var con = mysql.createConnection({
    host: 'z12itfj4c1vgopf8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'o3oz6pr9yrn0t0ni',
    password: 'nw0pff7n9q2wwr8w',
    database: 'pnzix6kvk5havun0'
  });
} catch (err) {
  throw (err);
}

con.connect(err => {
  if (err) throw err;
  console.log('Connected!');

  // Middleware to fetch data from MySQL database on each HTTP call
  app.use((req, res, next) => {
    con.query('SELECT * FROM groups', (err, result) => {
      if (err) throw err;
      let groups = result;

      con.query('SELECT * FROM campers', (err, result) => {
        if (err) throw err;
        let campers = result;

        con.query('SELECT * FROM users', (err, result) => {
          if (err) throw err;
          let users = result;

          req.groups = groups;
          req.campers = campers;
          req.users = users;
          next();
        });
      });
    });
  });

  const userNameExists = (name, users) => {
    let exists = false;
    users.forEach(user => {
      if (user.username === name) {
        exists = true;
      }
    });
    return exists;
  }

  const scrubApostrophes = oldFields => {
    const textFields = [
      'group_name',
      'leader_name',
      'first_name',
      'last_name',
      'allergies',
      'parent_email',
      'emergency_name',
      'roommate',
      'notes'
    ];

    const newFields = {};
    textFields.forEach(field => {
      if (oldFields[field] && oldFields[field] !== '') {
        newFields[field] = replaceQuotes(oldFields[field]);
      }
    });
    return {
      ...oldFields,
      ...newFields
    };
  }

  const replaceQuotes = str => {
    return str.replace(/'/g, "''");
  }

  const fillNulls = reqBody => {
    let body = {};
    Object.keys(reqBody).map((key) => {
      if (reqBody[key]) {
        body[key] = `'${reqBody[key]}'`
      } else {
        body[key] = '\'\'';
      }
    });
    return body;
  }

  app.use((req, res, next) => {
    req.body = scrubApostrophes(req.body);
    next();
  });

  app.get('/allData', (req, res) => {
    res.send(JSON.stringify({ groups: req.groups, campers: req.campers, users: req.users }));
  })
  app.post('/login', (req, res) => {
    const user = req.users.find(user => {
      return user.username === req.body.username;
    });

    if (!user) {
      res.status(401).send(JSON.stringify({ error: 'Invalid username.' }));
      return;
    }

    const isMatch = passwordHash.verify(req.body.password, user.password);
    if (!isMatch) {
      res.status(401).send(JSON.stringify({ error: 'Invalid password.' }));
      return;
    }

    const redirectUrl = user.status === 'admin' ? '/admin' : '/groupEdit';

    const group = req.groups.find(group => {
      return group.id === user.group_id;
    });
    con.query('SELECT * FROM groups', (err, groups) => {
      con.query('SELECT * FROM campers', (err, campers) => {
        con.query('SELECT * FROM users', (err, users) => {
          res.send(JSON.stringify({ redirectUrl, group, user, campers, groups, users }))
        });
      });
    });
  })
  app.post('/signup', (req, res) => {
    const exists = userNameExists(req.body.username, req.users);
    if (exists) {
      res.status(400).send(JSON.stringify({ error: 'Username already exists.' }));
      return;
    } else {
      const hashedPassword = passwordHash.generate(req.body.password);

      con.query(`INSERT INTO groups (id, leader_name, group_name) VALUES('${req.body.nextGroupId}', '', '')`, (err) => {
        if (err) throw err;
      });

      const group = req.groups.find(group => group.id === req.body.nextGroupId);

      con.query(`INSERT INTO users (username, password, status, group_id) VALUES ('${req.body.username}', '${hashedPassword}', 'leader', '${req.body.nextGroupId}')`, (err, user) => {
        if (err) throw err;
        con.query('SELECT * FROM groups', (err, groups) => {
          con.query('SELECT * FROM campers', (err, campers) => {
            con.query('SELECT * FROM users', (err, users) => {
              res.status(200).send(JSON.stringify({ group, user, campers, groups, users }));
            });
          });
        });
      });
    }
  })
  app.post('/userAdd', (req, res) => {
    const exists = userNameExists(req.body.username, req.users);
    if (exists) {
      res.status(400).send(JSON.stringify({ error: 'Username already exists.' }));
      return;
    } else {
      const hashedPassword = passwordHash.generate(req.body.password);

      let group_id = null;
      if (req.body.group_name) {
        group_id = req.groups.find(group => group.group_name === req.body.group_name);
      }
      con.query(`INSERT INTO users (username, password, status, group_id) VALUES ('${req.body.username}', '${hashedPassword}', '${req.body.status}', '${group_id}')`, (err) => {
        if (err) throw err;

        con.query('SELECT * FROM groups', (err, groups) => {
          con.query('SELECT * FROM campers', (err, campers) => {
            con.query('SELECT * FROM users', (err, users) => {
              res.status(200).send(JSON.stringify({ campers, groups, users }));
            });
          });
        });
      });
    }
  })
  app.post('/groupEdit', (req, res) => {
    con.query(`UPDATE groups SET leader_name = '${req.body.leader_name}', group_name = '${req.body.group_name}' WHERE id = '${req.body.id}'`, (err) => {
      if (err) throw err;

      con.query('SELECT * FROM groups', (err, groups) => {
        con.query('SELECT * FROM campers', (err, campers) => {
          con.query('SELECT * FROM users', (err, users) => {
            res.status(200).send(JSON.stringify({ campers, groups, users }));
          });
        });
      });
    });
  })
  app.post('/groupAdd', (req, res) => {
    con.query(`INSERT INTO groups (id, leader_name, group_name) VALUES('${req.body.id}', '${req.body.leader_name}', '${req.body.group_name}')`, (err) => {
      if (err) throw err;

      con.query('SELECT * FROM groups', (err, groups) => {
        con.query('SELECT * FROM campers', (err, campers) => {
          con.query('SELECT * FROM users', (err, users) => {
            const group = groups.find(group => group.id === req.body.id);
            res.status(200).send(JSON.stringify({ campers, groups, users, group }));
          });
        });
      });
    });
  });
  app.post('/groupDelete', (req, res) => {
    con.query(`DELETE FROM campers WHERE group_id = '${req.body.id}'`, (err) => {
      con.query(`DELETE FROM groups WHERE id = '${req.body.id}'`, (err) => {
        if (err) throw err;

        con.query('SELECT * FROM groups', (err, groups) => {
          con.query('SELECT * FROM campers', (err, campers) => {
            con.query('SELECT * FROM users', (err, users) => {
              res.status(200).send(JSON.stringify({ campers, groups, users }));
            });
          });
        });
      });
    });
  })
  app.post('/camperEdit', (req, res) => {
    const body = fillNulls(req.body);

    con.query(`UPDATE campers SET first_name = '${body.first_name}', last_name = '${body.last_name}', gender = '${body.gender}', birthday = '${body.birthday}', grade_completed = '${body.grade_completed}', allergies = '${body.allergies}', parent_email = '${body.parent_email}', emergency_name = '${body.emergency_name}', emergency_number = '${body.emergency_number}', roommate = '${body.roommate}', notes = '${body.notes}', registration = '${body.registration}', signed_status = '${body.signed_status}', room = '${body.room}' WHERE id=${body.id}`, (err) => {
      if (err) throw err;

      con.query('SELECT * FROM groups', (err, groups) => {
        con.query('SELECT * FROM campers', (err, campers) => {
          con.query('SELECT * FROM users', (err, users) => {
            res.status(200).send(JSON.stringify({ campers, groups, users }));
          });
        });
      });
    });
  })
  app.post('/camperAdd', (req, res) => {
    const body = fillNulls(req.body);

    con.query(`INSERT INTO campers (group_id, first_name, last_name, gender, birthday, grade_completed, allergies, parent_email, emergency_name, emergency_number, roommate, notes, registration, signed_status, room) VALUES (${body.group_id}, ${body.first_name}, ${body.last_name}, ${body.gender}, ${body.birthday}, ${body.grade_completed}, ${body.allergies}, ${body.parent_email}, ${body.emergency_name}, ${body.emergency_number}, ${body.roommate}, ${body.notes}, ${body.registration}, ${body.signed_status}, ${body.room})`, (err) => {
      if (err) throw err;
    });

    const group = req.groups.find(group => group.id === req.body.group_id);
    var newSize = Number(group.size) + 1;

    con.query(`UPDATE groups SET size ='${newSize}' WHERE id = ${req.body.group_id}`, (err) => {
      con.query('SELECT * FROM groups', (err, groups) => {
        con.query('SELECT * FROM campers', (err, campers) => {
          con.query('SELECT * FROM users', (err, users) => {
            res.status(200).send(JSON.stringify({ campers, groups, users }));
          });
        });
      });
    });
  });
  app.post('/camperDelete', (req, res) => {
    // con.query(`UPDATE campers SET group_id ='0' WHERE id = ${req.body.id}`);

    con.query(`DELETE FROM campers WHERE id = '${req.body.id}'`, (err) => {
      if (err) throw err;

      const group = req.groups.find(group => group.id === req.body.group_id);

      var newSize = Math.max(0, Number(group.size) - 1);
      con.query(`UPDATE groups SET size ='${newSize}' WHERE id = ${req.body.group_id}`, (err) => {
        con.query('SELECT * FROM groups', (err, groups) => {
          con.query('SELECT * FROM campers', (err, campers) => {
            con.query('SELECT * FROM users', (err, users) => {
              res.status(200).send(JSON.stringify({ campers, groups, users }));
            });
          });
        });
      });
    });
  });
  app.post('/toggleAdmin', (req, res) => {
    const user = req.users.find(user => {
      return String(user.id) === req.body.user_id;
    });
    const newStatus = user.status === 'leader' ? 'admin' : 'leader';

    con.query(`UPDATE users SET status ='${newStatus}' WHERE id = ${req.body.user_id}`, (err) => {
      con.query('SELECT * FROM groups', (err, groups) => {
        con.query('SELECT * FROM campers', (err, campers) => {
          con.query('SELECT * FROM users', (err, users) => {
            res.status(200).send(JSON.stringify({ campers, groups, users }));
          });
        });
      });
    });
  });

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});