const chalk = require("chalk")

class Logger {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    static log(message, options = {}) {
        let opts = new LoggerOptions(options);

        console.log(`${chalk.blue(`[${opts.prefix} INFO]`)}: ${chalk[opts.messageColor](message)}`);
        return this;
    }

    static error(message, options = {}) {
        let opts = new LoggerOptions(options);

        console.log(`${chalk.red(`[${opts.prefix} ERROR]`)}: ${chalk[opts.messageColor](message)}`);
        return this;
    }

    static warn(message, options = {}) {
        let opts = new LoggerOptions(options);

        console.log(`${chalk.yellow(`[${opts.prefix} WARN]`)}: ${chalk[opts.messageColor](message)}`);
        return this;
    }

    static empty(length = 1) {
        let string = "";
        for (let i = 0; i < length; i++)
            string += " "; // add a space, this is pretty useless tho lol
        
        console.log(string);
        return this
    }
}

// Options
class LoggerOptions {
    constructor(options) {
        this.prefix = options.prefix || "GDBrowser-RW";
        this.messageColor = options.messageColor || "white"
    }
}

Logger.LoggerOptions = LoggerOptions;

module.exports = Logger;