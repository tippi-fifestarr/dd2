// import { useEffect, useState } from "react";
// import {
//   ThirdwebNftMedia,
//   useNFT,
//   useContract,
//   useContractWrite,
//   wallet,
// } from "@thirdweb-dev/react";

// const RankedNFT = () => {
//   const { contract } = useContract(
//     "0x8c98434b7CA12571568065ab2fbE2248fA0bA504"
//   );
//   const {
//     data: ownerBalance,
//     isLoading,
//     error,
//   } = useNFTBalance(contract, userWalletAddress);
//   // for ERC1155 contracts, you can also pass a tokenId

//   return (
//     <div>
//       {!isLoading && !error && (
//         <div>
//           <h1 className="font-gorditas text-lg text-center m-1">
//             Buy for $0.02 in MATIC to enable Ranked Matches!
//           </h1>
//           {nft && (
//             <ThirdwebNftMedia metadata={nft?.metadata} className="rounded-xl" />
//           )}
//         </div>
//       )}
//       {isLoading ? <div>Loading...</div> : <div>Error: {error.message}</div>}
//     </div>
//   );
// };

// export default RankedNFT;
