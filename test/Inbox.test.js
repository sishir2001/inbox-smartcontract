// contract test code will go here

const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3"); // returns a constructor function hence started with uppercase

// @param : provider -> letting web3 know to which network it should connect
const web3 = new Web3(ganache.provider()); // returns an instance of the Web3
const { abi, evm } = require("../compile");

let fetchedAccounts;
let inbox;
beforeEach(async () => {
    // thread should wait till the promise returns the results
    // get list of accounts
    // we are getting these accounts from ganache-cli
    fetchedAccounts = await web3.eth.getAccounts();
    // use one of the accounts to deploy the contracts
    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: ["Hi there"],
        })
        .send({
            from: fetchedAccounts[0],
            gas: "1000000",
        });
});

describe("Inbox",() => {
    // first check whether the contract is deployed in the local network
    it("gets deployed", () => {
        assert.ok(inbox.options.address); // ok() passes the test if the argument is not undefined and null
    });
    // check whether an argument is passed to the contructor function
    // calling a function -> just reading the data
    it("has a default message", async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, "Hi there");
    });

    it("Updates the message", async () => {
        await inbox.methods.setMessage('Bye').send({
            from: fetchedAccounts[0]
        }); // we are making changes in the blockchain , so it becomes a transaction
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye');
    });
});
