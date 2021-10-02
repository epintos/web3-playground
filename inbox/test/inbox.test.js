const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

// We use ganache local test network
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_STRING = 'Hi There!';

beforeEach(async () => {
  // Get a list of all the unlocked accounts
  // We use eth module of the web3 library
  accounts = await web3.eth.getAccounts();

  // Use one of the accounts to deploy the contract

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // We assert that the contracts has been deployed and has an address assigned
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it('can change the message', async () => {
    const newMessage = 'Bye';

    // Sends a transaction. Returns transaction ID
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });

    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});
