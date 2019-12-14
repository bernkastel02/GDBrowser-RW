const fs = require("fs");
const request = require("request");
const path = require("path");
const Logger = require(`${__dirname}/../util/Util`).Logger;

let failsafe = false;
let ba = false;
let failsafefile = path.resolve(`${__dirname}/credits.js`);

// file exist check
if (!fs.existsSync(failsafefile)) {
    failsafe = true;
    return failsafeFunction("The credits file doesn't exist, so i'll do ya a favor, and replace it with a new one.");
}

// bytecheck
fs.readFile(failsafefile, "utf-8", (err, data) => {
    request("https://raw.githubusercontent.com/memimoe/GDBrowser-RW/master/lib/misc/credits.js", (error, response, body) => {

        // if not same
        if (!data == body) {
            failsafe = true
            failsafeFunction("You seemed to have modified the credits file. I'll override your changes, because I don't like those.");
            return;
        }
    });
})

// file watch
fs.watch(failsafefile, (eventType) => {
    if (eventType == "rename" && failsafe == false) {
        failsafe = true;

        // activate failsave
        failsafeFunction("I think you accidentally deleted the credits, so I'll fix that for you! Be careful next time!");
    } else if (failsafe == false && ba == false) {
        ba = true;
        failsafe = true;
        failsafeFunction("I think you accidentally modified the credits, so I'll fix that for you! Don't be sneaky.");
    }
})

function failsafeFunction(message) {
    request("https://raw.githubusercontent.com/memimoe/GDBrowser-RW/master/lib/misc/credits.js", (error, response, body) => {
        body = eval(body.replace("module.exports = ", "let yeet = ") + "\nvar eeee = () => {return yeet;}; eeee()")

        Logger.failsafe(message);
        fs.writeFileSync(failsafefile, "module.exports = " + JSON.stringify(body, null, 4), "utf-8");
        failsafe = false;

        setTimeout(() => {
            Logger.failsafe("Now, that I've fixed your file for you; I'll be closing down for you! ~Failsafe-chan")
            process.exit(0);
        }, 1500)
    })
}