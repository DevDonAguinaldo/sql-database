const express = require('express');
const session = require('express-session');
const port = process.env.PORT || 5050;
const mysql = require('mysql');
const path = require('path');
const router = express.Router();

const app = express();

app.set('view engine', 'ejs');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "D23asm774#",
  database: "nodelogin"
});

con.connect((err) => {
  if(err) throw err;

  console.log("Successfully connected to MySQL.");
});

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/auth', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    con.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/home');
      } else {
        res.send('Incorrect Username and/or Password!');
      }
      
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

router.get('/home', (req, res) => {
  if (req.session.loggedin) {
    // Query the database for Sales to Date
    // Return data to home page
  } else {
    res.send('Please login to view this page!');
  }
  res.end();
});

app.use('/', router);
app.listen(port, () => { console.log(`Server listening on port: ${port}.`) });