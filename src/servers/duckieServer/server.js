const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/models/index")

require("./app/routes/duckie.routes")(app);
require("./app/routes/quacks.routes")(app);
require("./app/routes/users.routes")(app);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`\n\tServer running on port ${PORT}\n`);
});
