const db = require("../models/index");
const User = require("../models/user.model.js");

const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res) => {

  const userName = req.body.userName;
  const screenName = req.body.screenName;
  const birthDate = req.body.birthDate;

  const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);

  let query =
    "INSERT INTO users (userName, password, screenName, birthDate) \
      VALUES (?,?,?,?);";

  db.query(
    query,
    [userName, encryptedPassword, screenName, birthDate],
    (err, results) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res.status(409).send({ message: "user already exists!" });
        }

        console.error(err);
        res.status(500).send();
        return;
      } else {
        console.log(results);
        res.send("make user");
      }
    }
  );
};

exports.getUser = (req, res) => {
  let userName = req.params.userName;

  // select user by userName
  let query = "SELECT * FROM users where userName = ?;";

  db.query(query, [userName], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send();
      return;
    } else {
      if (results.length == 0) {
        //no user found
        res.status(404).send({ message: "user not found" });
        return;
      }
      res.send(results[0]);
    }
  });
};

exports.getUserById = (req, res) => {
  let id = req.params.id;

  // select user by id
  let query = "SELECT * FROM users where id = ?;";

  db.query(query, [id], (err, results) => {
    console.log(results);
    if (err) {
      console.error(err);
      res.status(500).send();
      return;
    } else {
      if (results.length == 0) {
        //no user found
        res.status(404).send({ message: "user id not found" });
        return;
      }
      res.send(results[0]);
    }
  });
};

exports.editUserInfo = (req, res) => {
  let id = req.params.id;

  //******** WARNING: do not update userName in this query? ********
  let screenName = req.body.screenName;
  let bio = req.body.bio;
  let website = req.body.website;
  let profilePic = req.body.profilePic;

  let query =
    "UPDATE users \
      SET screenName = ?, bio = ?, website = ?, profilePic = ? \
      WHERE id = ?;";

  db.query(
    query,
    [screenName, bio, website, profilePic, id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send();
        return;
      } else {
        res.send(results[0]);
      }
    }
  );
};

exports.deleteUser = (req, res) => {
  let id = req.params.id;

  let query = "DELETE FROM users where id = ?;";

  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send();
      return;
    } else {
      if (results.length == 0) {
        res.status(404).send({ message: "can not remove an empty user" });
        return;
      }
      res.send(results[0]);
    }
  });
};

exports.login = (req, res) => {
  let password = req.body.password;
  let userName = req.body.userName;
  let query = "Select * from users Where userName=?;";

  db.query(query, [userName], async (err, data) => {
    if (err) {
      res.status(500).send({ message: "error orrcured" });
    } else if (data && data.length == 0) {
      //empty request
      res.status(400).send({ message: "Username not found" });
      return;
    } else {
      const comparison = await bcrypt.compare(password, data[0].password);
      if (comparison) {
        console.log("password successs");
        res.send(data[0]);
      } else {
        res.status(204).send({ message: "password doesnt match" });
      }
    }
  });




};


exports.searchUsers = (req, res) => {

  search = '%' + req.params.search + '%'
  
  var searchusers = `SELECT * FROM users WHERE (userName LIKE '%${search}%' OR screenName LIKE '%${search}%' OR bio LIKE '%${search}%' OR website LIKE '%${search}%')`
  
  db.query(searchusers, [search,search,search,search],function (err, results) {
    if (err) {
      res.send(err)
    } else {
      console.log("no error")
      console.log(results[0])

       res.send(results[0])
    }
  })
};

