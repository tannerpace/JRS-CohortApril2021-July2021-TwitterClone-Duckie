const db = require("../models/index");
const User = require("../models/user.model.js")
const bcrypt = require("bcrypt");
const { query } = require("@angular/animations");
const saltRounds = 4;

exports.welcome = (req, res) => {
    console.log("exports welcome")
    db.query("SELECT * FROM users", (err, data) => {
        // let user = new User({username: '', admin: false})
        res.send({ message: "Welcome to Duckie Greeter!" });
    })
}

exports.createUser = (req, res) => {

    console.log(req.body)

    const userName = req.body.userName;
    const password = req.body.password;
    const screenName = req.body.screenName;
    const birthDate = req.body.birthDate;

    let query = "INSERT INTO users (userName, password, screenName, birthDate) \
    VALUES (?,?,?,?);"

    // INSERT INTO users (`userName`, `password`, `screenName`, `birthDate`) 
    // VALUES ( ?, ?, ?, ?);

    db.query(query, [userName, password, screenName, birthDate], (err, results) => {
        if (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                res.status(409).send()
            }
            console.log(err)
            //this is the error for duplicate user    
            // {
            //     code: 'ER_DUP_ENTRY',
            //     errno: 1062,
            //     sqlMessage: "Duplicate entry 'mruser2' for key 'users.userName'",
            //     sqlState: '23000',
            //     index: 0,
            //     sql: "INSERT INTO users (userName, password, screenName, birthDate)     VALUES ('mruser2','mrpassword3','testScreen','1990-02-02');"
            //   }
            res.status(500).send()
            return
        } else {

            console.log(results)
            res.send("make user")
        }
    })


};

exports.getUser = (req, res) => {

    let userName = req.params.userName

    query = "SELECT * FROM users where userName = ?;"

    db.query(query, [userName], (err, results) => {
        if (err) {
            res.status(500).send()
            return
        } else {
            if (results.length == 0) {
                res.status(404).send("user not found")
                return
            }
            res.send(results[0])
        }
    })

};

exports.editUser = (req, res) => {

    let id = req.params.id;
    let userName = req.params.userName;
    let screenName = req.params.screenName;
    let bio = req.params.bio;
    let website = req.params.website;

    // "INSERT INTO users \
    // (userName, password, screenName, birthDate) \
    // VALUES (?,?,?,?);"

    // query = "UPDATE users \
    // SET (userName, password, screenName, `bio` = '?', `website` = '?' WHERE (`userName` = '?');"

    // res.send("edituser")
};

exports.deleteUser = (req, res) => {

    let id = req.params.id;

    query = "DELETE FROM users where id = ?;"

    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send()
            return
        } else {

            if (results.length == 0) {
                res.status(404).send("can not remove an empty user")
                return
            }
            res.send(results[0])
        }
    })

};
