const db = require("../models/index");
const User = require("../models/user.model.js")

exports.welcome = (req, res) => {
    console.log("working?")
    db.query("SELECT * FROM users", (err, data) => {
        // let user = new User({username: '', admin: false})
        res.send({message: "Welcome!"});
    })
}

exports.getUser = (req, res) => {
    console.log(req.params)
    let uName = req.params.userName
    if (uName != 'blake') {
        res.status(404).send({message: 'User not found'});
        return;
    } else {
        res.send({userName: req.params.username, screenName: 'test name'})
        return;
    }
}

exports.createUser = (req,res) => {
    res.send("it's working!")
};
