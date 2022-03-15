// compile code will go here

// ! no require keyword is used as the Inbox.sol is not javascript code
const path = require("path"); // inbuilt module of nodejs
const fs = require("fs"); // file system
const solc = require("solc");

// constructing path to the Inbox.sol , and reading the contents of the file
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol"); // cross-platform based
const source = fs.readFileSync(inboxPath, "utf-8"); // encoding in which the file should be read

const input = {
    language: "Solidity",
    sources: {
        "Inbox.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

// compiling the content that we got from Inbox.sol
// @param : 1 : no of .sol files to be compiled
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Inbox.sol"].Inbox; // will always return an object
// returning only the object related Inbox.sol
