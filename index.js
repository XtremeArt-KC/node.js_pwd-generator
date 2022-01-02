#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const clipboardy = require("clipboardy");
const log = console.log;
const createPassword = require("./utils/createPassword");
const savePassword = require("./utils/savePassword");

program.version("2.0.0").description("node_password_generator");
program
  .option("-l, --length <number>", "length of the password", "8")
  .option("-s, --save", "save password to passwords.txt")
  .option("-N, --no_number", "password without numbers")
  .option("-S, --no_symbols", "password without symbols")
  .parse();

const { length, save, numbers, symbols } = program.opts();

// getting the generated password
const generatePassword = createPassword(length, numbers, symbols);

// saving password to a text file
if (save) {
  savePassword(generatePassword);
}

// copy to clipboard
clipboardy.writeSync(generatePassword);

// printing to console the password generated
log(chalk.blueBright("Generated Password: ") + chalk.bold(generatePassword));
log(chalk.yellowBright("Password Successfully Copied to Clipboard"));
