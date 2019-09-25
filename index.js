const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.listen(port, () => { console.log(`Server listening on port: ${port}.`)} );