module.exports = app => {
    const duckie = require("../controllers/duckie.controller");

    app.get("/", duckie.welcome);

    // users
    app.get("/api/user/:userName", duckie.getUser);
    app.get("/api/user/:id", duckie.getUserById);
    app.post("/api/user", duckie.createUser);
    app.put("/api/user/:id", duckie.editUserInfo);
    app.delete("/api/user/:id", duckie.deleteUser);

    app.post("/api/user/login", duckie.login);

    app.post("/api/getQuacks", duckie.getQuacksByUser)
    app.post("/api/getqb", duckie.getReposts)
    app.post("/api/getlikes", duckie.getLikes)
    app.post("/api/tweet/", duckie.createQuack);
    app.put('/api/tweet/like', duckie.addLike);
    app.put('/api/tweet/repost', duckie.addRepost)
    app.delete("/api/tweet/:id", duckie.deleteQuack);

    app.post("/api/followedquacks",duckie.getFollowingQuacks);
    app.post("/api/following", duckie.getFollowingUser);
    app.post("/api/followers", duckie.getFollowersUser);

};