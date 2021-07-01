module.exports = (app) => {

const quacks = require("../controllers/quacks.controller")
app.get("/api/quacks/:userName", quacks.getQuacksByUser);
app.get("/api/replies/:id", quacks.getQuacksandRepliesByUser);
// app.get("/api/media/:userName", quacks.getMediaByUser);
app.get("/api/reposts/:userName", quacks.getReposts);
app.get("/api/likes/:userName", quacks.getLikes);
app.get("/api/quacks/following/:userName", quacks.getFollowingQuacks);

app.post("/api/quack/", quacks.createQuack);
app.post("/api/quack/reply/:id", quacks.quackReply);

app.put("/api/quack/like", quacks.addLike);
app.put("/api/quack/repost", quacks.addRepost);

app.delete("/api/quack/:id", quacks.deleteQuack);

}