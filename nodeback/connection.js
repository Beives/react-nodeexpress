const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"web4",
    multipleStatements:true
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Adatbázishoz csatlakozva!");
  });

  module.exports = con;