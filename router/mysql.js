const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "GYF1999819",
  port: 3306,
  database: "alumni",
});

module.exports = db