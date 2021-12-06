// The local blockchain will get destroyed every time we run this.

const main = async () => {
  // The Hardhat Runtime Environment, or HRE for short, is an object containing all the functionality that Hardhat 
  // exposes when running a task, test or script. In reality, Hardhat is the HRE. 
  // hre gets imported every time we run a command that starts with npx hardhat using the hardhat.config.js file.
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

  const waveContract = await waveContractFactory.deploy();

  // Wait for the contract to be deployed/mined.
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
