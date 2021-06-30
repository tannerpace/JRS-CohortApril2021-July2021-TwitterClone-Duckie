module.exports = (app) => {
  const duckie = require("../controllers/duckie.controller");

  app.get("/", duckie.welcome);



  app.post("/api/following", duckie.getFollowingUser);
  app.post("/api/followers", duckie.getFollowersUser);

  app.post("/api/:followerId/follow/:userToFollowId", duckie.followUser);
  app.delete(
    "/api/:followerId/unfollow/:userToUnfollowId",
    duckie.unfollowUser
  );
};
