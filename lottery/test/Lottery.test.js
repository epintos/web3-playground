const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// We use ganache local test network
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000'});
});

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call();

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it('allows multiple account to enter', async () => {
    const accountsQty = 3;
    for (let index = 0; index < accountsQty; index++) {
      await lottery.methods.enter().send({
        from: accounts[index],
        value: web3.utils.toWei('0.02', 'ether')
      });
    }

    const players = await lottery.methods.getPlayers().call();

    for (let index = 0; index < accountsQty; index++) {
      assert.equal(accounts[index], players[index]);
    }

    assert.equal(accountsQty, players.length);
  });

  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[index],
        value: 0 // Wei
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it('only manager can call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it('sends money to the winner and resets the player array', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;
    
    // We need to take into account the gas cost
    assert(difference > web3.utils.toWei('1.8', 'ether'));
  });

  it('resets the players after picking a winner', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const players = await lottery.methods.getPlayers().call();

    assert.equal(0, players.length);
  });

  it('resets the balance after picking a winner', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    const contractBalance = await web3.eth.getBalance(lottery.options.address);

    assert.equal(0, contractBalance);
  });
});
