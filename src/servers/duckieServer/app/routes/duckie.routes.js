module.exports = app => {
    const duckie = require("../controllers/duckie.controller");

    app.get("/", duckie.welcome);
    app.get("/api/createUser", duckie.createUser);

};