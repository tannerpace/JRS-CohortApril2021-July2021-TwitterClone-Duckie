module.exports = app => {
    const duckie = require("../controllers/duckie.controller");

    app.get("/", duckie.welcome);
   
    // make a user
    app.post("/api/user", duckie.createUser); 
    
    //get a user
    app.get("/api/user/:userName", duckie.getUser);
    
    //edit a user
    app.put("/api/user/:userName", duckie.editUser);
    
    //delete a user
    app.delete("/api/user/:id", duckie.deleteUser);

    
    
};