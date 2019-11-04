const express = require('express');
const session = require('express-session');
const port = process.env.PORT || 5050;
const oracledb = require('oracledb');
const path = require('path');
const router = express.Router();
const app = express();
app.set('view engine', 'ejs');

let data;

oracledb.getConnection({
  user: 'DAGUINALDO',
  password: 'DAGUINALDO#',
  connectString: '129.7.240.3/orcl'
}, (err, connection) => {
  if(err) throw err;

  console.log("Successfully connected to Oracle Database.");

  let sql = 'SELECT * FROM SalestoDate';
  connection.execute(sql, (err, results) => {
    if(err) throw err;

    // console.log(results.rows);
    data = results.rows;
  });
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
  res.render('home', { data: data });
});

app.use('/', router);
app.listen(port, () => { console.log(`Server listening on port: ${port}.`) });