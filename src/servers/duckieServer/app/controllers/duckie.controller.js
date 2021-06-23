const db = require("../models/index");
const User = require("../models/user.model.js")
const { query } = require("@angular/animations");

const bcrypt = require("bcrypt");
const saltRounds = 4;

exports.welcome = (req, res) => {
    console.log("welcome")
    db.query("SELECT * FROM users", (err, data) => {
        // let user = new User({username: '', admin: false})
        res.send({ message: "Welcome to Duckie!" });
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
exports.createQuack = (req, res) => { //takes an object with userId and quack paramaters 

    console.log(req.body)

    let quack = req.body.quack

    console.log(quack)
    if (quack.length > 140) {//check if the tweet is too large here for detailed error hanfling 
        res.status(400).send({ message: "quack too large" })
    } else {

    }

    let user = req.body.userId
    let query = "INSERT INTO `duckie`.`quacks`(`body`,`userId`) \
                VALUES(?,?);"

    db.query(query, [quack, user], (err, data, fields) => {
        if (err) {
            res.status(500).send({ message: "error adding quack" })
        }
        res.send(data)
    })
}

exports.addLike = (req, res) => {

    let likeCount = req.body.likes + 1

    let id = req.body.id

    let query = "UPDATE `duckie`.`quacks` SET `likeCount` = ?  WHERE `id` = ?;"
    db.query(query, [likeCount, id], (err, data, fields) => {
        if (data.affectedRows == 0) {
            res.status(500).send({ err, message: "error updating likes" })
        } else {
            res.send(data)
        }

    })


}
exports.deleteQuack = (req, res) => {// delete tweet by id
    const id = req.params.id

    let query = "DELETE FROM `duckie`.`quacks` WHERE `id` = ?;"
    db.query(query, [id], (data, err, fields) => {
        if (err.affectedRows == 0) {
            res.status(500).send({ err, message: "no tweet with id " + id })

        } else {
            res.status(200).send(data)
            console.log(err, data)
        }

    })

}
exports.addRepost = (req, res) => {// add repost with QB and id

    let repost = req.body.quackback + 1

    let id = req.body.id

    let query = "UPDATE `duckie`.`quacks` SET `repostCount` = ?  WHERE `id` = ?;"
    db.query(query, [repost, id], (err, data, fields) => {
        if (data.affectedRows == 0) {
            res.status(500).send({ err, message: "error updating likes" })
        } else {
            res.send(data)
        }

    })


}
