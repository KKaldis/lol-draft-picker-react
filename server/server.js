const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "segamao247",
  database: "counter_data",
});

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO tierlist (tier) VALUES ('Master');";
  db.query(sqlInsert, (err, result) => {
    console.log(err)
    console.log(result)
    res.send("test response");
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
