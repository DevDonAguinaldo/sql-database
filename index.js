const express = require('express');
const port = process.env.PORT || 5000;
const mysql = require('mysql');

const app = express();

app.use(express.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: "localhost",
  user: "Don",
  password: "D23asm774#"
});

con.connect((err) => {
  if(err) throw err;

  console.log("Successfully connected to MySQL!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => { console.log(`Server listening on port: ${port}.`)} );