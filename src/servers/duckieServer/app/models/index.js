const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

// open the MySQL connection
connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected to database")
    }
});

module.exports = connection;