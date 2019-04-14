const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport('smtp://waivers@summerfestivalcamp.com:hDy>T(Zz}hp&sN6@mail.summerfestivalcamp.com');

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

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

          const ids = [];
          groups.forEach(group => {
            ids.push(group.id);
          });

          req.groups = groups;
          req.campers = campers;
          req.users = users;
          req.nextGroupId = Math.max(...ids) + 1;
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
  };

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
  };

  const checkEmail = async (camper) => {
    console.log('in checkemail ');

    if (camper.registration !== 'Online' || camper.signed_status !== 'Not Sent') {
      console.log('returning')
      return;
    }

    try {
      console.log('in try block');
      const info = await transporter.sendMail({
        from: '"Summer Festival" <waiver@summerfestivalcamp.com>',
        to: camper.parent_email,
        subject: "Your Summer Festival Registration Waiver",
        text: "",
        html: ""
      });

      console.log('sent email. here is the info:');
      console.log(info);
    } catch (error) {
      console.log('ERROR:');
      console.log(error);
    }

    console.log('done')

    con.query(`UPDATE campers SET signed_status = 'Emailed' WHERE id = ${camper.id}`, (err) => {
      if (err) throw err;
    });
  };

  app.use((req, res, next) => {
    const oldFields = { ...req.body };
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
        newFields[field] = oldFields[field].replace(/'/g, "''");
      }
    });
    req.body = {
      ...oldFields,
      ...newFields
    };
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

      con.query(`INSERT INTO groups (id, leader_name, group_name) VALUES('${req.nextGroupId}', '', '')`, (err) => {
        if (err) throw err;
        con.query(`INSERT INTO users (username, password, status, group_id) VALUES ('${req.body.username}', '${hashedPassword}', 'leader', '${req.nextGroupId}')`, (err) => {
          if (err) throw err;
          con.query('SELECT * FROM groups', (err, groups) => {
            con.query('SELECT * FROM campers', (err, campers) => {
              con.query('SELECT * FROM users', (err, users) => {
                const group = groups.find(group => group.id === req.nextGroupId);
                const user = {
                  username: req.body.username,
                  status: 'leader'
                };
                res.status(200).send(JSON.stringify({ group, user, campers, groups, users }));
              });
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

      const group_id = req.body.status === 'admin' ? 0 : req.nextGroupId;
      const status = req.body.status === 'admin' ? 'admin' : 'leader';
      con.query(`INSERT INTO users (username, password, status, group_id) VALUES ('${req.body.username}', '${hashedPassword}', '${status}', '${group_id}')`, (err) => {
        if (err) throw err;

        con.query(`INSERT INTO groups (id, group_name, leader_name) VALUES ('${req.nextGroupId}', '', '${req.body.username}')`, (err) => {
          con.query('SELECT * FROM groups', (err, groups) => {
            con.query('SELECT * FROM campers', (err, campers) => {
              con.query('SELECT * FROM users', (err, users) => {
                res.status(200).send(JSON.stringify({ campers, groups, users }));
              });
            })
          });
        });
      });
    }
  })
  app.post('/groupEdit', (req, res) => {
    const body = fillNulls(req.body);

    con.query(`UPDATE groups SET leader_name = ${body.leader_name}, group_name = ${body.group_name} WHERE id = ${req.body.id}`, (err) => {
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
    const body = fillNulls(req.body);

    con.query(`INSERT INTO groups (id, leader_name, group_name) VALUES(${req.nextGroupId}, ${body.leader_name}, ${body.group_name})`, (err) => {
      if (err) throw err;

      con.query('SELECT * FROM groups', (err, groups) => {
        con.query('SELECT * FROM campers', (err, campers) => {
          con.query('SELECT * FROM users', (err, users) => {
            const group = groups.find(group => group.id === req.nextGroupId);
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

    con.query(`UPDATE campers SET first_name = ${body.first_name}, last_name = ${body.last_name}, gender = ${body.gender}, birthday = ${body.birthday}, grade_completed = ${body.grade_completed}, allergies = ${body.allergies}, parent_email = ${body.parent_email}, emergency_name = ${body.emergency_name}, emergency_number = ${body.emergency_number}, roommate = ${body.roommate}, notes = ${body.notes}, registration = ${body.registration}, signed_status = ${body.signed_status}, room = ${body.room} WHERE id=${body.id}`, (err) => {
      if (err) throw err;

      con.query('SELECT * FROM groups', (err, groups) => {
        con.query('SELECT * FROM campers', (err, campers) => {
          con.query('SELECT * FROM users', (err, users) => {
            checkEmail(campers.find(camper => camper.id === body.id))
            res.status(200).send(JSON.stringify({ campers, groups, users }));
          });
        });
      });
    });
  })
  app.post('/camperAdd', (req, res) => {
    const body = fillNulls(req.body);

    con.query(`INSERT INTO campers (group_id, first_name, last_name, gender, birthday, grade_completed, allergies, parent_email, emergency_name, emergency_number, roommate, notes, registration, signed_status, room) VALUES (${body.group_id}, ${body.first_name}, ${body.last_name}, ${body.gender}, ${body.birthday}, ${body.grade_completed}, ${body.allergies}, ${body.parent_email}, ${body.emergency_name}, ${body.emergency_number}, ${body.roommate}, ${body.notes}, ${body.registration}, ${body.signed_status}, ${body.room})`, (err, newCamper) => {
      if (err) throw err;
      con.query('SELECT * FROM groups', (err, groups) => {
        con.query('SELECT * FROM campers', (err, campers) => {
          con.query('SELECT * FROM users', (err, users) => {
            checkEmail(campers.find(camper => camper.id === newCamper.insertId))
            res.status(200).send(JSON.stringify({ campers, groups, users }));
          });
        });
      });
    });
  });
  app.post('/camperDelete', (req, res) => {
    con.query(`DELETE FROM campers WHERE id = '${req.body.id}'`, (err) => {
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
  app.post('/makeAdmin', (req, res) => {
    con.query(`UPDATE users SET status ='admin', group_id = 1 WHERE id = ${req.body.user_id}`, (err) => {
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