// const db = require("../models");

exports.welcome = (req, res) => {
    console.log("working?")
    res.send({message: "Welcome!"});
}

exports.createUser = (req,res) => {
    res.send("it's working!")
};
