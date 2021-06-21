const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10; // how many rolls through the encryptions are going to do 

var mysql = require('mysql');

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//assign db connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'duckie'
});

//connect to server

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected to database")
    }
});

// require("./app/routes/pepper.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("\n\tServer running on port" + `${PORT}\n`)
});
