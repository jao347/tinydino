const hre = require("hardhat");

async function main() {
  
  const TinyDinoNFT = await hre.ethers.getContractFactory("TinyDinoNFT");
  const tinyDinoNFT = await TinyDinoNFT.deploy();

  await tinyDinoNFT.deployed();

  console.log(
    "TinyDinoNFT deployed to:", tinyDinoNFT.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
