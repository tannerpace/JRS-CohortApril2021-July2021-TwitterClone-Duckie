module.exports = app => {
    const duckie = require("../controllers/duckie.controller");

    app.get("/", duckie.welcome);
   
    // users
    app.post("/api/user", duckie.createUser); 
    app.get("/api/user/:userName", duckie.getUser);
    app.put("/api/user/:userName", duckie.editUser);
    app.delete("/api/user/:id", duckie.deleteUser);

    
    app.post("/api/tweet/", duckie.createQuack);
    app.put('/api/tweet/like', duckie.addLike);
    app.put('/api/tweet/repost', duckie.addRepost)
    app.delete("/api/tweet/:id", duckie.deleteQuack);

};