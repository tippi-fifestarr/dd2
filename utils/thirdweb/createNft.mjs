import editionDrop from "./getContract.mjs";

const createNFT = async () => {
  // console.log("editionDrop: ", editionDrop);
  try {
    await editionDrop.createBatch([
      {
        name: "Deck Maker",
        description:
          "This NFT will give you early access to deck making features!",
        // Get the NFT from a file uploaded to IPFS
        image:
          "ipfs://bafybeibwau75kvf2zfl5qxmzez6inwzdggjikj5kdtslpa3s32qr5ht24y",
      },
    ]);
    console.log("✅ Successfully created a new NFT!");
  } catch (error) {
    console.error("Failed to create the new NFT. Error: ", error);
  }
};

createNFT();
