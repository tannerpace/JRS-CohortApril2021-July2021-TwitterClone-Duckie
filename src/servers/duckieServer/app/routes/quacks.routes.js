module.exports = (app) => {

const quacks = require("../controllers/quacks.controller")
app.get("/api/quacks/:userName", quacks.getQuacksByUser)
// app.get("/api/media/:userName", quacks.getMediaByUser);
app.get("/api/reposts/:id", quacks.getReposts);
app.get("/api/likes/:id", quacks.getLikes);
app.get("/api/feedquacks/:id", quacks.getFeedQuacks);
app.get("/api/quackandreply/:id", quacks.getQuacksandRepliesByUser)

app.post("/api/quack/", quacks.createQuack);


app.put("/api/quack/like", quacks.addLike);
app.put("/api/quack/repost", quacks.addRepost);

app.delete("/api/quack/:id", quacks.deleteQuack);

}