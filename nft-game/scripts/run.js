const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('DiabloNFTGame');
  const gameContract = await gameContractFactory.deploy(
    ["Barbarian", "Sorcerer", "Paladin"],       // Names
    ["https://i1.wp.com/gamerhabitat.com/wp-content/uploads/2021/08/barbariand2r.jpg?fit=1200%2C675&ssl=1", // Images
    "https://www.dexerto.com/wp-content/uploads/2021/08/12/diablo-2-sorceress-guide.jpeg", 
    "https://www.pcgamesn.com/wp-content/uploads/2021/09/diablo-2-resurrected-paladin-builds-best.jpg"],
    [100, 220, 150],                    // HP values
    [200, 80, 150],                      // Attack damage values
    "Diablo", // Boss name
    "https://i.pinimg.com/originals/d9/39/60/d93960240fc228610a5d242dd112795f.jpg", // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);

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
