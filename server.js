const methodOverride = require('method-override');

const express = require("express");
const app = express();
app.use(express.static("public"));

const routes = require("./controllers/burgers_controllers.js");
app.use("/", routes);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;
app.listen(port);
