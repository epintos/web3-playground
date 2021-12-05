require('dotenv').config();

module.exports = {
  env: {
    MNEMONIC: process.env.MNEMONIC,
    INFURA_RINKEBY_API: process.env.INFURA_RINKEBY_API,
    CAMPAIGN_FACTORY_ADDRESS: process.env.CAMPAIGN_FACTORY_ADDRESS
  },
}
