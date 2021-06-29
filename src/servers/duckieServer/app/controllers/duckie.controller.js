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

exports.createUser = async (req, res) => {
  console.log(req.body);

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

exports.createQuack = (req, res) => {
  //takes an object with userId and quack paramaters
  const userId = req.body.userId;
  const quackBody = req.body.quackBody;

  let countQuery = "select * FROM `duckie`.`users` where id=?";
  console.log("recieved quack request");
  db.query(countQuery, [userId], (err, data, fields) => {
    if (err) {
      res.status(500).send({ err, message: "unable to get user" });
    } else if (data.length == 0) {
      res.status(200).send({ data, message: "there was a problem" });
    } else {
      let quackCount = data[0].quackCount + 1;

      let query =
        "INSERT INTO `duckie`.`quacks` (`body`,`userId`) \
      VALUES (?,?);";

      db.query(query, [quackBody, userId], (err, data, fields) => {
        if (err) {
          res.status(500).send({ message: "error adding quack" });
        } else {
          let addQuery =
            "UPDATE `duckie`.`users` SET `quackCount` = ? WHERE `id` = ?";
          db.query(addQuery, [quackCount, userId], (err, data, fields) => {
            if (err) {
              res
                .status(500)
                .send({ err, mesage: "unable to add quack count" });
            } else {
              res.status(200).send(data);
            }
          });
        }
      });
    }
  });
};

exports.addRepost = (req, res) => {
  //needs userId, and quackId
  console.log(req.body);
  let qbCount;
  let uId = req.body.uId;
  let qId = req.body.qId;
  let checkQuery =
    "SELECT * FROM duckie.reposts WHERE `userId` = ? AND `quackId`= ?";
  db.query(checkQuery, [uId, qId], (err, data) => {
    if (err) {
      res.status(500).send({ err, message: "error finding stuff" });
    } else if (data.length == 0) {
      let query = "select * from `quacks` WHERE `id`=?;";
      db.query(query, [qId], (err, data, fields) => {
        if (err) {
          res.status(500).send({ err, message: "error updating qb" });
        } else if (data.length == 0) {
          res.status(200).send({ data, message: "couldnt find quack" });
        } else {
          console.log(data);
          qbCount = data[0].repostCount + 1;
          let secondQuery =
            "UPDATE `duckie`.`quacks` SET `repostCount` = ? WHERE `id` = ?;";
          db.query(secondQuery, [qbCount, qId], (err, data, fields) => {
            if (err) {
              res
                .status(500)
                .send({ err, message: "could not update repost count" });
            } else {
              let thridQuery =
                "INSERT INTO `duckie`.`reposts` (`userId`, `quackId`) VALUES (?,?);";
              db.query(thridQuery, [uId, qId], (err, data, fields) => {
                if (err) {
                  res
                    .status(500)
                    .send({ err, message: "error adding to repost table" });
                } else {
                  res.status(200).send(data);
                }
              });
            }
          });
        }
      });
    } else {
      res.status(200).send({ message: "already reposted" });
    }
  });
};

exports.quackReply = (req, res) => {
  let qId = req.body.qId;
  let uId = req.body.uId;
  let text = req.body.text;
  let query =
    "INSERT INTO `duckie`.`quacks` (`body`, `userId`, `replyTo`) VALUES (?,?,?);";
  db.query(query, [text, uId, qId], (err, data) => {
    if (err) {
      res.status(500).send(err, { message: "error quacking reply" });
    } else {
      let countQuery = "select * FROM `duckie`.`users` where id=?";
      db.query(countQuery, [uId], (err, data, fields) => {
        if (err) {
          res.status(500).send({ err, message: "unable to get user" });
        } else if (data.length == 0) {
          res.status(200).send({ data, message: "there was a problem" });
        } else {
          let quackCount = data[0].quackCount + 1;
          let addQuery =
            "UPDATE `duckie`.`users` SET `quackCount` = ? WHERE `id` = ?";
          db.query(addQuery, [quackCount, uId], (err, data, fields) => {
            if (err) {
              res
                .status(500)
                .send({ err, mesage: "unable to add quack count" });
            } else {
              res.status(200).send(data);
            }
          });
        }
      });
    }
  });
};
exports.getQuacksByUser = (req, res) => {
  let quacks = [];
  let user = req.body.uId;
  let query =
    "SELECT * FROM `quacks`, `users` WHERE `quacks`.`userId` = `users`.`id`";
  db.query(query, [user], (err, data) => {
    if (err) {
      res.status(500).send({ err, message: "error getting quacks" });
    } else if (data.length == 0) {
      res.status(200).send({ mesage: "user has no Quacks" });
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].userId == user) {
          quacks.push(data[i]);
        }
      }
      res.status(200).send(quacks);
    }
  });
};

exports.getLikes = (req, res) => {
  //get likes by user; returns array of liked quacks
  let uId = req.body.uId; //user id

  let query = "select * from `likes` WHERE `userId`=?;";

  db.query(query, [uId], (err, dta, fields) => {
    if (err) {
      res.status(500).send({ err, message: "could not get likes" });
    } else if (dta.length == 0) {
      res.status(200).send({ message: "no likes" });
    } else {
      let quacks = [];
      let stop = dta.length;
      let otherQuery = "select * from `quacks` WHERE `id`=?";
      for (let i = 0; i < stop; i++) {
        db.query(otherQuery, [dta[i].quackId], (err, data, fields) => {
          if (err) {
            res.status(500).send({ err, message: "could not get quacks" });
          } else {
            quacks.push(data);
          }
          if (quacks.length == stop) {
            res.send(quacks);
          }
        });
      }
    }
  });
};

exports.getReposts = (req, res) => {
  //get reposts by user; returns array of reposted quacks
  let uId = req.body.uId; //user id

  let query = "select * from `reposts` WHERE `userId`=?;";

  db.query(query, [uId], (err, dta, fields) => {
    if (err) {
      res.status(500).send({ err, message: "could not get reposts" });
    } else if (dta.length == 0) {
      res.status(200).send({ message: "no Quackbacks" });
    } else {
      let quacks = [];
      let stop = dta.length;
      let otherQuery = "select * from `quacks` WHERE `id`=?";
      for (let i = 0; i < stop; i++) {
        db.query(otherQuery, [dta[i].quackId], (err, data, fields) => {
          if (err) {
            res.status(500).send({ err, message: "could not get quacks" });
          } else {
            quacks.push(data);
          }
          if (quacks.length == stop) {
            res.send(quacks);
          }
        });
      }
    }
  });
};
exports.addLike = (req, res) => {
  //needs userId, and quackId
  console.log(req.body);
  let likeCount;
  let uId = req.body.uId;

  let qId = req.body.qId;
  let checkQuery =
    "SELECT * FROM duckie.likes WHERE `userId` = ? AND `quackId`= ?";
  db.query(checkQuery, [uId, qId], (err, data) => {
    if (err) {
      res.status(500).send({ err, message: "error checking dB" });
    } else if (data.length == 0) {
      let query = "select * from `quacks` WHERE `id`=?;";
      db.query(query, [qId], (err, data, fields) => {
        if (err) {
          res.status(500).send({ err, message: "error updating likes" });
        } else if (data.length == 0) {
          console.log(data + "\n" + query, qId);
          res.status(200).send({ data, message: "couldn't find like" });
        } else {
          //data.likecount+1
          console.log(data);
          likeCount = data[0].likeCount + 1;

          let secondQuery =
            "UPDATE `duckie`.`quacks` SET `likeCount` = ? WHERE `id` = ?;";
          db.query(secondQuery, [likeCount, qId], (err, data, fields) => {
            if (err) {
              res
                .status(500)
                .send({ err, message: "could not update like count" });
            } else {
              let thirdQuery =
                "INSERT INTO `duckie`.`likes` (`userId`, `quackId`) VALUES (?,?);";
              db.query(thirdQuery, [uId, qId], (err, data, fields) => {
                if (err) {
                  res
                    .status(500)
                    .send({ err, message: "error adding to like table" });
                } else {
                  res.status(200).send(data);
                }
              });
            }
          });
        }
      });
    } else {
      res.status(200).send({ message: "already liked" });
    }
  });
};

exports.getQuacksByUser = (req, res) => {
  let user = req.body.uId;
  let query = "select * from `duckie`.`quacks` WHERE (userId=?)";
  db.query(query, [user], (err, data) => {
    if (err) {
      res.status(500).send({ err, message: "error getting quacks" });
    } else if (data.length == 0) {
      res.status(200).send({ mesage: "user has no Quacks" });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.getLikes = (req, res) => {
  //get likes by user; returns array of liked quacks
  let uId = req.body.uId; //user id

  let query = "select * from `likes` WHERE `userId`=?;";

  db.query(query, [uId], (err, dta, fields) => {
    if (err) {
      res.status(500).send({ err, message: "could not get likes" });
    } else if (dta.length == 0) {
      res.status(200).send({ message: "no likes" });
    } else {
      let quacks = [];
      let stop = dta.length;
      let otherQuery = "select * from `quacks` WHERE `id`=?";
      for (let i = 0; i < stop; i++) {
        db.query(otherQuery, [dta[i].quackId], (err, data, fields) => {
          if (err) {
            res.status(500).send({ err, message: "could not get quacks" });
          } else {
            quacks.push(data);
          }
          if (quacks.length == stop) {
            res.send(quacks);
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

exports.deleteQuack = (req, res) => {
  // delete Quack by id
  const id = req.params.id;

  let query = "DELETE FROM `duckie`.`quacks` WHERE `id` = ?;";
  db.query(query, [id], (data, err, fields) => {
    if (err.affectedRows == 0) {
      res.status(500).send({ err, message: "no quack with id " + id });
    } else {
      res.status(200).send(data);
      console.log(err, data);
    }
  });
};

exports.getFollowingQuacks = (req, res) => {
  //Given an id will return an array of quacks from who they follow
  let id = req.body.uId;
  let query =
    "SELECT *  FROM `follows`, `quacks` WHERE `quacks`.`userId` = `follows`.`followingId`";
  db.query(query, (err, dta, fields) => {
    if (err) {
      res.status(500).send({ err, message: "unable to get following" });
    } else if (dta.length == 0) {
      res.status(200).send({ message: "no following" });
    } else {
      let quacks = [];
      console.log(dta);
      for (let i = 0; i < dta.length; i++) {
        if (dta[i].followerId == id) {
          quacks.push(dta[i]);
        }
      }
      res.status(200).send(quacks);
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
