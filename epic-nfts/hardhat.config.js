require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-etherscan");

require('dotenv').config();

module.exports = {
	solidity: '0.8.0',
	networks: {
			rinkeby: {
				url: process.env.ALCHEMY_API_URL,
				accounts: [process.env.RINKEBY_ACCOUNT_KEY], // Private key from Metamask. We need it to deploy the contract
			},
			// mainnet: {
			// 	chainId: 1,
			// 	url: process.env.PROD_ALCHEMY_API_URL,
			// 	accounts: [process.env.PRIVATE_KEY],
			// },
		},
    etherscan: {
      // Your API key for Etherscan
      // Obtain one at https://etherscan.io/
      apiKey: process.env.ETHERSCAN_API_KEY,
    }
  };
