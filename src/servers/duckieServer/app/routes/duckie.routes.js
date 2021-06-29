module.exports = (app) => {
  const duckie = require("../controllers/duckie.controller");

  app.get("/", duckie.welcome);

  // users
  app.get("/api/user/id/:id", duckie.getUserById);
  app.get("/api/user/:userName", duckie.getUser);
  app.post("/api/user", duckie.createUser);
  app.put("/api/user/:id", duckie.editUserInfo);
  app.delete("/api/user/:id", duckie.deleteUser);

  app.post("/api/user/login", duckie.login);

  app.post("/api/getQuacks", duckie.getQuacksByUser);
  app.post("/api/getqb", duckie.getReposts);
  app.post("/api/getlikes", duckie.getLikes);
  app.post("/api/quack/", duckie.createQuack);
  app.put("/api/quack/like", duckie.addLike);
  app.put("/api/quack/repost", duckie.addRepost);
  app.delete("/api/quack/:id", duckie.deleteQuack);

  app.post("/api/quack/reply", duckie.quackReply);
  app.post("/api/followedquacks", duckie.getFollowingQuacks);
  app.post("/api/following", duckie.getFollowingUser);
  app.post("/api/followers", duckie.getFollowersUser);

  app.post("/api/:followerId/follow/:userToFollowId", duckie.followUser);
  app.delete(
    "/api/:followerId/unfollow/:userToUnfollowId",
    duckie.unfollowUser
  );
};
