require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_RINKEBY_API
);

const web3 = new Web3(provider);

const deploy  = async () => {
  // A mnemonic can generate many accounts, but we use only the first account to deploy the contract.
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account:', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })

    // Using Wei unit
    .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

  console.log('Contract deployed to:', result.options.address);
};

deploy();
