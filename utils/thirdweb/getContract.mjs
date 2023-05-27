import { createRequire } from "module"; // Bring in createRequire function
const require = createRequire(import.meta.url); // construct the require function

require("dotenv").config(); // Now we can use require

// console.log(process.env.PRIVATE_KEY); // <-- Add this line for testing
// import myEditionDropAddress from "../../const/myDetails.js";
// https://blog.thirdweb.com/guides/early-access-nft-with-typescript/
//
// WARNING: Careful with the private keys!
// Importing libraries
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// Learn more about securely accessing your private key: https://portal.thirdweb.com/web3-sdk/set-up-the-sdk/securing-your-private-key
const privateKey = process.env.PRIVATE_KEY;
// instantiate the SDK based on your private key, with the desired chain to connect to
const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "mumbai");

// Set variable for the edition drop contract address which can be found after creating an edition drop in the dashboard
// couldn't reference it from const/myDetails.js
// const editionDropAddress = myEditionDropAddress;
const editionDropAddress = "0xe003E4487f62cf8fa6a84C517293780b85aedb86";
// Initialize the edition drop module with the contract address
// const editionDrop = sdk.getEditionDrop(editionDropAddress);
const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");

export default editionDrop;
