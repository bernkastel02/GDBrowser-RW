const path = require("path");
const fs = require("fs");
const Util = require(path.resolve(`${__dirname}/lib/util/Util`));

// Application & all setup
const app = require("express")();
app.gdb_config = {};

// static files
app.use("/assets", require("express").static(path.resolve(`${__dirname}/static`)));

// site views
app.set("views", path.resolve(`${__dirname}/views`));
app.set("view engine", "pug");

// router load
fs.readdir(path.resolve(`${__dirname}/routers`), (err, files) => {
    if (err) throw err;

    files.forEach((routerPath) => {
        let router = require(path.resolve(`${__dirname}/routers/${routerPath}`));

        app.use(router.path || "/", router);
    })
});

// set locals
app.use((req, res, next) => {
    // set global locals so pug can use thel
    res.locals.require = require;
    res.locals.__dirname = __dirname;
    next()
});

// settings
app.set("json spaces", 4);

// config loading
loadConfig();

// express listener
app.listen((app.gdb_config["express"]) 
? app.gdb_config["express"].port // use port if example config was correctly edited
: Util.throwError(new SyntaxError("Express configuration not found.")), () => {
    console.log("express server ready");

    // successful test
    if (process.argv[2] === "--gdb-test") return process.exit(0);
});
/* WARNING: Don't edit below unless you really know what you're doing! */
async function loadConfig() {
    let config = Util.resolveFiles(`${__dirname}/config/`, 
    [   
        // Express Configuration
        "express.js",
        (process.argv[2] === "--gdb-test") ? "express.example.js" : undefined // force use example if travis-ci testing
    ]);
    
    for (let i = 0; i < config.length; i++) {
        let key = (config[i].endsWith(".example.js")) 
        ? config[i].split(".example.js")[0] 
        : config[i].split(".js")[0];
        if (!app.gdb_config[key]) {
            app.gdb_config[key] = require(Util.configDir(config[i]));
        } else {
            return;
        }
    }
}