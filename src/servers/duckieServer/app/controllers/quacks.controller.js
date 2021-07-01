const db = require("../models/index");

exports.getQuacksByUser = (req, res) => {
  let userName = req.params.userName;
  let query =
    "SELECT quacks.id, quacks.body, users.userName, \
            users.screenName, quacks.dateAndTime, quacks.repostCount, \
            quacks.likeCount, users.profilePic, quacks.replyTo \
          FROM quacks \
        INNER JOIN users \
          ON quacks.userId = users.id \
        WHERE users.userName = ? and quacks.replyTo is null";
  db.query(query, [userName], (err, data) => {
    if (err) {
      res.status(500).send({ error: err, message: "error getting quacks" });
    } else if (data.length == 0) {
      console.log(data);
      res.status(200).send({ message: "user has no Quacks" });
    } else {
      res.status(200).send(data);
    }
  });
};
exports.getQuacksandRepliesByUser = (req, res) => {
  let userName = req.params.id
  let query= "SELECT * FROM duckie.quacks where userId= ?"
db.query(query,[userName], (err,data)=>{
  if (err){
    res.status(500).send({err, mesage:"problem gettin quacks"})
  }else {
    res.status(200).send(data)
  }
})
}

exports.getLikes = (req, res) => {
  //get likes by user; returns array of liked quacks
  let uId = req.params.id; //user id

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
            quacks.push(data[0]);
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
  let uId = req.params.id; //user id
console.log(uId)
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
            quacks.push(data[0]);
          }
          if (quacks.length == stop) {
            res.send(quacks);
          }
        });
      }
    }
  });
};

exports.getFeedQuacks = (req, res) => {//gets followed quacks and Users quacks 
  let id = req.params.id;
  quacks = [];
  let query =

    "SELECT  distinct quacks.id FROM `follows`, `quacks` WHERE `quacks`.`userId` = `follows`.`followingId` or quacks.userId=? ";
  db.query(query, [id], (err, dta, fields) => {
    if (err) {
      res.status(500).send({ err, message: "unable to get following" });
    } else if (dta.length == 0) {
      res.status(200).send({ message: "no following" });
    } else {
      for (let i = 0; i < dta.length; i++) {
        let query =
          "SELECT quacks.id, quacks.body, users.userName, \
                users.screenName, quacks.dateAndTime, quacks.repostCount, \
                quacks.likeCount, users.profilePic, quacks.replyTo \
              FROM quacks \
            INNER JOIN users \
              ON quacks.userId = users.id \
            WHERE quacks.id = ?";
        db.query(query, [dta[i].id], (err, data) => {
          if (err) {
            // res.status(500).send({ error: err, message: "error getting quacks" });
          } else if (data.length == 0) {
            console.log(data);
            // res.status(200).send({ message: "user has no Quacks" });
          } else {
            quacks.push(data[0])
          } if (quacks.length == dta.length - 1) {
            res.status(200).send(quacks)
          }


        });
      }

    }
  });
};



exports.createQuack = (req, res) => {
  //takes an object with userId and quack paramaters
  const userId = req.body.userId;
  const quackBody = req.body.quackBody;
  if (req.body.qId) {
    let qId = req.body.qId;

    let query =
      "INSERT INTO `duckie`.`quacks` (`body`, `userId`, `replyTo`) VALUES (?,?,?);";
    db.query(query, [quackBody, userId, qId], (err, data) => {
      if (err) {
        res.status(500).send(err, { message: "error quacking reply" });
      } else {
        let countQuery = "select * FROM `duckie`.`users` where id=?";
        db.query(countQuery, [userId], (err, data, fields) => {
          if (err) {
            res.status(500).send({ err, message: "unable to get user" });
          } else if (data.length == 0) {
            res.status(200).send({ data, message: "there was a problem" });
          } else {
            let quackCount = data[0].quackCount + 1;
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
  } else {
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
  }
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

exports.deleteQuack = (req, res) => {//done
  // delete Quack by id
  const id = req.params.id;

  let query = "SET foreign_key_checks = 0;"
  let secondQuery = "delete from duckie.quacks where id=?;"
  let thirdQuery = "set foreign_key_checks=1;"
  db.query(query, (err, data, fields) => {
    if (err) {
      res.status(500).send({ err, message: "no quack with id " + id });
    } else {
      db.query(secondQuery, [id], (err, data) => {
        if (err) {
          res.status(500).send(err)
        } else {
          db.query(thirdQuery, (err, data) => {
            res.status(200).send("yay")
          })
        }
      })
    }
  });
};
