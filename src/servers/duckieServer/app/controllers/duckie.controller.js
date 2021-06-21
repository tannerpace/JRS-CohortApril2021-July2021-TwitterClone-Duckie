const db = require("../models/index");
const User = require("../models/user.model.js")

exports.welcome = (req, res) => {
    console.log("working?")
    db.query("SELECT * FROM users", (err, data) => {
        // let user = new User({username: '', admin: false})
        res.send({message: "Welcome!"});
    })
}

exports.createUser = (req,res) => {
    res.send("it's working!")
};
