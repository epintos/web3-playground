# Create NFTs project

This project uses Hardhat to simulate a local ethereum blockchain. Hardhat comes with the following commands:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat help
```

You can run the contract by executing:

```shell
npx hardhat run scripts/run.js
```

You can run a new local blockchain (no blocks) that stays alive by executing:

```shell
npx hardhat node
```

then you can deploy the contract by running the following from the root of the project:

```shell
npx hardhat run scripts/deploy.js --network localhost
```

To verify the smart contract run the following:

```shell
  npx hardhat verify CONTRACT_ADDRESS --network rinkeby
```

## Web

The web is built in React using [Replit](https://replit.com/) to build and deploy fast without any local environment. You can find the source code [here](./web)
