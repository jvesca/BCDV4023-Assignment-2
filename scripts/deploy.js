// scripts/deploy.js

// scripts/deploy.js
import pkg from "hardhat";

const { ethers } = pkg;

async function main() {
  
    // const PriceFeedFactory = await ethers.getContractFactory("PriceFeed");
    // Deploying the contract
    const AvaxLinkFeedsFactory = await ethers.getContractFactory("AvaxLinkFeeds");
    const avaxLinkFeeds = await AvaxLinkFeedsFactory.deploy();
    await avaxLinkFeeds.deployed();

    console.log("AvaxLinkFeeds contract deployed to:", avaxLinkFeeds.address);
    console.log("Contract deployed by " + JSON.stringify(avaxLinkFeeds.signer) + " signer");
    // process.exit(0);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

// Original Deploy.js from HelloWorld
// async function main() {
//     const HelloWorldFactory = await ethers.getContractFactory("HelloWorld")
//     const helloMessage = await HelloWorldFactory.deploy("Hello from QuickNode")
//     await helloMessage.deployed()
  
//     console.log("Contract deployed to:", helloMessage.address)
//     console.log("Contract deployed by " + JSON.stringify(helloMessage.signer) + " signer")
//     process.exit(0)
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error)
//       process.exit(1)
//     })