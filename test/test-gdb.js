// modules
const request = require("request");
const child_process = require("child_process");
const path = require("path");

// spawn process
let child = child_process.spawn("node", [path.resolve(`${__dirname}/../index.js`), "--gdb-test"]);

child.on("exit", (code) => {
    process.exit(code);
})