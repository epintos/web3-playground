const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('DiabloNFTGame');
  const gameContract = await gameContractFactory.deploy(
    ["Barbarian", "Sorcerer", "Paladin"],       // Names
    ["QmSfiFakNiceAjUyE3X2ijKrXcQ6YNG9aFkiUVh9jRYUBY", // Images
    "QmQx1cTtRWuPWGdgcN7i6nmVhuSpzvwYC2tZto8ojhrSgu", 
    "QmdHgPwBnmwnCF3uF5Xh99BGg1HaL9ULme3EmP6VYc2KYK"],
    [100, 220, 150],                    // HP values
    [200, 80, 150],                      // Attack damage values
    "Diablo", // Boss name
    "QmaZzTbVUMPgKsM6tgTNFNaWQDev1NZzB4TfSHbDPLMtpp", // Boss image
    10000, // Boss hp
    50 // Boss attack damage
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
