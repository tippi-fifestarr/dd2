import editionDrop from "./getContract.mjs";

const nftConfig = async () => {
  const claimConditions = [
    {
      startTime: new Date(),
      maxClaimableSupply: 22,
      price: 0.02,
      maxClaimablePerWallet: 1,
    },
  ];
  try {
    await editionDrop.claimConditions.set("1", claimConditions); // 0 refers to token ID - the ID of Access Key, and 1 is for the Deck Maker Badge
    console.log("🎉 Successfully added the claim condition!");
  } catch (error) {
    console.log("Failed to set claim condition. Error: ", error);
  }
};

nftConfig();
