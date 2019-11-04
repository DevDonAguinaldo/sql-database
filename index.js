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
  database: "Project3"
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
  let sql = 'SELECT * FROM SalestoDate';
  con.query(sql, (error, results, fields) => {
    if(error) throw error;

    res.render('home', { data: results });
  });
});

app.use('/', router);
app.listen(port, () => { console.log(`Server listening on port: ${port}.`) });