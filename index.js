#!/usr/bin/env node

const yargs = require("yargs");
const envCommand = require('./commands/env');

const COMMANDS = [
    envCommand
];

const options = yargs
    .usage("Usage: --ops <ops>")
    .option("cmd", {
        alias: "command",
        describe: `Command to do: ${COMMANDS.join(',')}`,
        type: "string",
        demandOption: true
    })
    .argv;


const cmd = options.cmd;
const foundCommands = COMMANDS.filter(command => command.title === cmd);


if (foundCommands && foundCommands.length === 1) {
    foundCommands[0].run(options);
} else {
    console.error('Operation type not exists!');
}

