// should generate this client from public API (OpenAPI?) spec

// TODO use env vars
const GAMMA_API_HOSTNAME = "https://gamma.io";

// these types should be defined by API spec. not sure which are nullable
type CollectionsTokenResponse = {
  result: boolean;
  data: TokenData;
};

export type TokenData = {
  asset_id: string;
  fully_qualified_token_id: string;
  collection_contract_id: string;
  token_id: string;
  token_metadata: TokenMetadata;
  nft_token_attributes: NFTTokenAttribute[];
  rarity_rank: null;
  collection_count: number;
  rarity_score: null;
};

type TokenMetadata = {
  fully_qualified_token_id: string;
  image_url: string;
  image_type: string;
  image_protocol: string;
  asset_url: string;
  asset_type: string;
  asset_protocol: string;
  asset_id: string;
  name: string;
  contract_id: string;
  description: string;
};

type NFTTokenAttribute = {
  value: string;
  trait_type: string;
};

export async function fetchCollectionsToken(
  collectionName: string,
  tokenId: string
): Promise<CollectionsTokenResponse> {
  const response = await fetch(
    `${GAMMA_API_HOSTNAME}/api/v1/collections/${collectionName}/${tokenId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
export default fetchCollectionsToken;
