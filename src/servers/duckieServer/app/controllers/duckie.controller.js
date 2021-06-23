const e = require("cors");
const db = require("../models/index");
const User = require("../models/user.model.js")

exports.welcome = (req, res) => {
    console.log("working?")
    db.query("SELECT * FROM users", (err, data) => {
        // let user = new User({username: '', admin: false})
        res.send({ message: "Welcome!" });
    })
}

exports.getUser = (req, res) => {
    console.log(req.params)
    let uName = req.params.userName
    if (uName != 'blake') {
        res.status(404).send({ message: 'User not found' });
        return;
    } else {
        res.send({ userName: req.params.username, screenName: 'test name' })
        return;
    }
}

exports.createUser = (req, res) => {
    res.send("it's working!")
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
