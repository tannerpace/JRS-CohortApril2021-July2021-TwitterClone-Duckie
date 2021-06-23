const db = require("../models/index");
const User = require("../models/user.model.js")
const { query } = require("@angular/animations");

const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.welcome = (req, res) => {
    console.log("welcome")
    db.query("SELECT * FROM users", (err, data) => {
        // let user = new User({username: '', admin: false})
        res.send({ message: "Welcome to Duckie!" });
    })
}

exports.createUser = async (req, res) => {

    console.log(req.body)

    const userName = req.body.userName;
    const screenName = req.body.screenName;
    const birthDate = req.body.birthDate;

    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);

    let query = "INSERT INTO users (userName, password, screenName, birthDate) \
    VALUES (?,?,?,?);"

    db.query(query, [userName, encryptedPassword, screenName, birthDate], (err, results) => {
        if (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                res.status(409).send({ message: "user already exists!" })
            }

            console.error(err)
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

    query = "SELECT * FROM users where userName = ?;"              // select user by userName

    db.query(query, [userName], (err, results) => {
        if (err) {
            res.status(500).send()
            return
        } else {
            if (results.length == 0) {
                res.status(404).send({ message: "user not found" })        //no user found
                return
            }
            res.send(results[0])
        }
    })

};

exports.editUser = (req, res) => {

    let userName = req.params.userName;

    let newUserName = req.body.userName;
    let screenName = req.body.screenName;
    let bio = req.body.bio;
    let website = req.body.website;

    let query = "UPDATE users \
    SET userName = ?, screenName = ?, bio = ?, website = ? \
    WHERE userName = ?;"

    db.query(query, [newUserName, screenName, bio, website, userName], (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).send()
            return
        } else {

            res.send(results[0])
        }
    })
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
                res.status(404).send({ message: "can not remove an empty user" })
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