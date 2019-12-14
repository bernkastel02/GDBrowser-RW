const Router = require("express").Router();
Router.path = "/api"; // API Paths

Router.get("/credits", (req, res) => {
    try {
        let e = require(__dirname + "/../lib/misc/credits");
        e.code = 200;
        return e;
    } catch (e) {
        return res.json({
            code: 500,
            message: "Failed, not found!"
        })
    }
})

module.exports = Router;