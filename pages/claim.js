import ClaimButton from "../components/ClaimButton";
import Nft from "../components/Nft";

// render the NFT component
export default function Claim() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Nft />
      <ClaimButton />
    </div>
  );
}
