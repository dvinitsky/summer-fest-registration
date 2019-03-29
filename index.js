const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

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

        // con.query('SELECT * FROM users', (err, result) => {
        //   if (err) throw err;
        //   let users = result;

        //   req.groups = groups;
        //   req.campers = campers;
        //   req.users = users;
        //   next();
        // });
        req.groups = groups;
        req.campers = campers;
        next();
      });
    });
  });

  const scrubApostrophes = oldFields => {
    const textFields = [
      'group_name',
      'leader_name',
      'first_name',
      'last_name'
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

  app.use((req, res, next) => {
    req.body = scrubApostrophes(req.body);
    next();
  });

  app.get('/groupsAndCampers', (req, res) => {
    res.send(JSON.stringify({ groups: req.groups, campers: req.campers }));
  })
    .get('/env', (req, res) => {
      console.log('oy')
      console.log(process.env.NODE_ENV)
      res.send(JSON.stringify({env: process.env.NODE_ENV || 'dev'}));
    })
    .post('/login', (req, res) => {
      let user = req.users.find(user => {
        return user.username === req.body.username;
      });
      if (user && user.password === req.body.password) {
        res.redirect('/admin');
      }
      else {
        // res.render('pages/login', { error: true });
      }
    })
    .post('/signup', (req, res) => {
      //check if the name is already taken
      let exists = false;
      for (let i = 0; i < req.campers.length; i++) {
        if (req.campers[i].name === req.body.name) {
          exists = true;
        }
      }

      if (exists) {
        // res.render('pages/signup', { error: true });
      } else {
        con.query(`INSERT INTO campers (name) VALUES ('${req.body.name}')`, (err) => {
          if (err) throw err;
          res.redirect('/');
        });
      }
    })
    .post('/groupEdit', (req, res) => {
      con.query(`UPDATE groups SET leader_name = '${req.body.leader_name}', group_name = '${req.body.group_name}' WHERE id = '${req.body.id}'`, (err) => {
        if (err) throw err;
      });

      con.query('SELECT * FROM groups', (err, groups) => {
        res.status(200).send(JSON.stringify({ groups }));
      });
    })
    .post('/groupAdd', (req, res) => {
      con.query(`INSERT INTO groups (id, leader_name, group_name) VALUES('${req.body.id}', '${req.body.leader_name}', '${req.body.group_name}')`, (err) => {
        if (err) throw err;
      });

      con.query('SELECT * FROM groups', (err, groups) => {
        const group = groups.find(group => group.id === req.body.id);
        res.status(200).send(JSON.stringify({ group }));
      });
    })
    .post('/groupDelete', (req, res) => {
      con.query(`DELETE FROM campers WHERE group_id = '${req.body.id}'`);
      con.query(`DELETE FROM groups WHERE id = '${req.body.id}'`, (err) => {
        if (err) throw err;
      });

      con.query('SELECT * FROM groups', (err, groups) => {
        res.status(200).send(JSON.stringify({ groups }));
      });
    })
    .post('/camperEdit', (req, res) => {
      con.query(`UPDATE campers SET first_name = '${req.body.first_name}', last_name = '${req.body.last_name}' WHERE id=${req.body.id}`, (err) => {
        if (err) throw err;
      });

      const campers = [...req.campers];
      let index;
      campers.forEach((camper, i) => {
        if (camper.id === req.body.id) {
          index = i;
        }
      });

      campers[index] = { ...campers[index], ...req.body };
      res.status(200).send(JSON.stringify({ campers }));
    })
    .post('/camperAdd', (req, res) => {
      con.query(`INSERT INTO campers (first_name, last_name, group_id) VALUES('${req.body.first_name}', '${req.body.last_name}', '${req.body.group_id}')`, (err) => {
        if (err) throw err;
      });
      var newSize = Number(req.body.size) + 1;
      con.query(`UPDATE groups SET size ='${newSize}' WHERE id = ${req.body.group_id}`);

      con.query('SELECT * FROM groups', (err, groups) => {
        con.query('SELECT * FROM campers', (err, campers) => {
          const group = groups.find(group => group.id === req.body.group_id);
          res.status(200).send(JSON.stringify({ group, campers }));
        });
      });
    })
    .post('/camperDelete', (req, res) => {
      con.query(`UPDATE campers SET group_id ='0' WHERE id = ${req.body.id}`);

      con.query(`DELETE FROM campers WHERE id = '${req.body.id}'`, (err) => {
        if (err) throw err;

        var newSize = Math.max(0, Number(req.body.size) - 1);
        con.query(`UPDATE groups SET size ='${newSize}' WHERE id = ${req.body.group_id}`);

        const campers = [...req.campers];
        let index;
        campers.forEach((camper, i) => {
          if (camper.id === req.body.id) {
            index = i;
          }
        });

        campers.splice(index, 1);
        res.status(200).send(JSON.stringify({ campers }));
      });
    });

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});