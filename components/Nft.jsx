import { useEffect, useState } from "react";
import { useEditionDrop, ThirdwebNftMedia, useNFT } from "@thirdweb-dev/react";
// import myEditionDropAddress from "../const/myDetails.js";
// why doesn't this work???
// console.log(myEditionDropAddress);
const Nft = () => {
  const editionDrop = useEditionDrop(
    "0xe003e4487f62cf8fa6a84c517293780b85aedb86"
  );
  const { data: nft } = useNFT(editionDrop, 0);

  return (
    <div>
      <h1 className="font-gorditas text-lg text-center m-1">
        OG Access Key: Forever Free!
      </h1>
      {nft && (
        <ThirdwebNftMedia metadata={nft?.metadata} className="rounded-xl" />
      )}
    </div>
  );
};

export default Nft;
