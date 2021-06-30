const db = require("../models/index");
const User = require("../models/user.model.js");

const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.welcome = (req, res) => {
  console.log("welcome");
  db.query("SELECT * FROM users", (err, data) => {
    // let user = new User({username: '', admin: false})
    res.send({ message: "Welcome to Duckie!" });
  });
};




exports.getFollowersUser = (req, res) => {
  //returns array of a certain Id's followers
  let id = req.body.uId;
  let query = "SELECT * FROM duckie.follows WHERE followingId=?;";
  let followers = [];
  db.query(query, [id], (err, dta, fields) => {
    if (err) {
      res.status(500).send({ err, message: "unable to get followers" });
    } else if (dta.length == 0) {
      res.status(200).send({ mesage: "no followers" });
    } else {
      let followers = [];
      let stop = dta.length;
      let otherQuery = "select * from `users` WHERE `id`=?";
      for (let i = 0; i < stop; i++) {
        db.query(otherQuery, [dta[i].followerId], (err, data, fields) => {
          if (err) {
            res.status(500).send({ err, message: "could not get quacks" });
          } else {
            followers.push(data);
          }
          if (followers.length == stop) {
            res.send(followers);
          }
        });
      }
    }
  });
};



exports.getFollowersUser = (req, res) => {
  //returns array of a certain Id's followers
  let id = req.body.uId;
  let query = "SELECT * FROM duckie.follows WHERE followingId=?;";
  let followers = [];
  db.query(query, [id], (err, dta, fields) => {
    if (err) {
      res.status(500).send({ err, message: "unable to get followers" });
    } else if (dta.length == 0) {
      res.status(200).send({ message: "no followers" });
    } else {
      let followers = [];
      let stop = dta.length;
      let otherQuery = "select * from `users` WHERE `id`=?";
      for (let i = 0; i < stop; i++) {
        db.query(otherQuery, [dta[i].followerId], (err, data, fields) => {
          if (err) {
            res.status(500).send({ err, message: "could not get quacks" });
          } else {
            followers.push(data);
          }
          if (followers.length == stop) {
            res.send(followers);
          }
        });
      }
    }
  });
};

exports.getFollowingUser = (req, res) => {
  //returns array of who a certain id id is following
  let id = req.body.uId;
  let query = "SELECT * FROM duckie.follows WHERE followerId=?;";
  db.query(query, [id], (err, dta, fields) => {
    if (err) {
      res.status(500).send({ err, message: "unable to get following" });
    } else if (dta.length == 0) {
      res.status(200).send({ message: "no following" });
    }
    {
      let following = [];
      let stop = dta.length;
      let otherQuery = "select * from `users` WHERE `id`=?";
      for (let i = 0; i < stop; i++) {
        db.query(otherQuery, [dta[i].followingId], (err, data, fields) => {
          if (err) {
            res.status(500).send({ err, message: "could not get quacks" });
          } else {
            following.push(data);
          }
          if (following.length == stop) {
            res.send(following);
          }
        });
      }
    }
  });
};

exports.followUser = (req, res) => {
  // :followerId/follow/:userToFollowId

  let followerId = req.params.followerId;
  let userToFollowId = req.params.userToFollowId;

  console.log("follow a user request recieved", followerId, userToFollowId);
  console.log("Params: ", req.params);

  if (followerId == userToFollowId) {
    res.status(400).send({ message: "A user cannot follow their own account" });
    return;
  }

  const query =
    "INSERT INTO follows (followerId, followingId) \
        VALUES (?, ?);";

  db.query(query, [followerId, userToFollowId], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Could not follow user", error: error });
      return;
    } else {
      res.send("User followed successfully");
      return;
    }
  });
};

exports.unfollowUser = (req, res) => {
  // :followerId/follow/:userToUnfollowId

  let followerId = req.params.followerId;
  let userToUnfollowId = req.params.userToUnfollowId;

  console.log("unfollow a user request recieved", followerId, userToUnfollowId);
  console.log("Params: ", req.params);

  if (followerId == userToUnfollowId) {
    res
      .status(400)
      .send({ message: "A user cannot unfollow their own account" });
    return;
  }

  const query = "DELETE FROM follows WHERE followerId=? AND followingId=?;";

  db.query(query, [followerId, userToUnfollowId], (error, results) => {
    if (error) {
      res
        .status(500)
        .send({ message: "Could not unfollow user", error: error });
      return;
    } else {
      res.send("User unfollowed successfully");
      return;
    }
  });
};
