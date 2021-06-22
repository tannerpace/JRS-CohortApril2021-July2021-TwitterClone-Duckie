module.exports = app => {
    const duckie = require("../controllers/duckie.controller");

    app.get("/", duckie.welcome);
    app.get("/api/user/:username", duckie.getUser);
    app.get("/api/createUser", duckie.createUser);
    app.post("/api/tweet/", duckie.createQuack);
    app.put('/api/tweet/like', duckie.addLike);
    app.put('/api/tweet/repost', duckie.addRepost)
    app.delete("/api/tweet/:id", duckie.deleteQuack);

};