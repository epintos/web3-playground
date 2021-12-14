const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyNFTGame');
  const gameContract = await gameContractFactory.deploy(
    ["Barbarian", "Sorcerer", "Paladin"],       // Names
    ["https://i1.wp.com/gamerhabitat.com/wp-content/uploads/2021/08/barbariand2r.jpg?fit=1200%2C675&ssl=1", // Images
    "https://www.dexerto.com/wp-content/uploads/2021/08/12/diablo-2-sorceress-guide.jpeg", 
    "https://www.pcgamesn.com/wp-content/uploads/2021/09/diablo-2-resurrected-paladin-builds-best.jpg"],
    [100, 220, 150],                    // HP values
    [200, 80, 150]                       // Attack damage values
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
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
