import { useQuery } from "react-query";
import { fetchAddressNFTEvents } from "../data/stacksNodeApi";

export function useStacksAddressNFTEvents({
  walletAddress,
}: {
  walletAddress: string;
}) {
  return useQuery(["stacksAddressNFTEvents", walletAddress], () =>
    fetchAddressNFTEvents(walletAddress)
  );
}

export default useStacksAddressNFTEvents;
