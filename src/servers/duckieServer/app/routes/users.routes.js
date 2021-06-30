module.exports = (app) => {

  const users = require("../controllers/users.controllers");

  // users
  app.get("/api/user/id/:id", users.getUserById);
  app.get("/api/user/:userName", users.getUser);
  app.post("/api/user", users.createUser);
  app.put("/api/user/:id", users.editUserInfo);
  app.delete("/api/user/:id", users.deleteUser);
  app.post("/api/user/login", users.login);
};
