import { useContract, useContractWrite } from "@thirdweb-dev/react";

export default function Component() {
  const { contract } = useContract("0x8c98434b7CA12571568065ab2fbE2248fA0bA504");
  const { mutateAsync: createToken, isLoading } = useContractWrite(contract, "createToken")

  const call = async () => {
    try {
      const data = await createToken({ args: [{{args}}] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
}