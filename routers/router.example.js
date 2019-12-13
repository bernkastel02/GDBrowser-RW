const Router = require("express").Router();

// set path early
Router.path = "/routing_example";

Router.get("/", (req,res) => {
    res.json({
        message: "Hi!"
    })
})

module.exports = Router;