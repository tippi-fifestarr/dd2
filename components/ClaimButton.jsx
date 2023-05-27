import { useState } from "react";
import { useEditionDrop, useMetamask, useAddress } from "@thirdweb-dev/react";

const ClaimButton = () => {
  const connectWithMetamask = useMetamask();

  const editionDrop = useEditionDrop(
    "0xe003e4487f62cf8fa6a84c517293780b85aedb86"
  );
  const address = useAddress();

  const [claiming, setClaiming] = useState(false);
  // Claim our NFT with the claim method - (token id, quantity)
  const onClick = async () => {
    setClaiming(true);
    try {
      await editionDrop?.claim(0, 1);
      alert("Successfully Claimed!");
      setClaiming(false);
    } catch (error) {
      console.log("Failed to claim. Error: ", error);
      setClaiming(false);
    }
  };

  return (
    <div>
      {address ? (
        <button
          disabled={claiming}
          style={{
            padding: "12px 20px",
            textAlign: "center",
            backgroundColor: "#05A266",
            color: "white",
          }}
          className="btn rounded-lg m-1"
          onClick={onClick}
        >
          {claiming ? "Claiming..." : "Claim Early Access NFT"}
        </button>
      ) : (
        <button onClick={connectWithMetamask}>Connect MetaMask Wallet</button>
      )}
    </div>
  );
};

export default ClaimButton;
