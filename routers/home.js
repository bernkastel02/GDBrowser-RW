const Router = require("express").Router();

Router.get("/", (req, res) => {
    // render the home file
    res.render("home");
});

module.exports = Router;