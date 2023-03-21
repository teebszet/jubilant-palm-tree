import { useQuery } from "react-query";
import { fetchCollectionsToken } from "../data/gammaApi";

export function useGammaCollectionToken({
  collectionName,
  tokenId,
}: {
  collectionName: string | null;
  tokenId: string | null;
}) {
  return useQuery(["gammaCollectionToken", collectionName, tokenId], () => {
    if (collectionName === null || tokenId === null) {
      throw new Error("useGammaCollectionToken params are required");
    }
    return fetchCollectionsToken(collectionName, tokenId);
  });
}

export default useGammaCollectionToken;
