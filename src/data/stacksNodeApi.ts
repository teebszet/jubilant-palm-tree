// should generate this client from public API (OpenAPI?) spec

// TODO use env vars
const STACKS_API_HOSTNAME = "https://stacks-node-api.mainnet.stacks.co";

// these types should be defined by API spec
export type NFTEvent = {
  sender: string;
  recipient: string;
  asset_identifier: string;
  value: {
    hex: string;
    repr: string;
  };
  tx_id: string;
  block_height: number;
  event_index: number;
  asset_event_type: string;
};

type AddressNFTEventsResponse = {
  nft_events: NFTEvent[];
  total: number;
  limit: number;
  offset: number;
};

// TODO support limit, offset pagination
export async function fetchAddressNFTEvents(
  walletAddress: string
): Promise<AddressNFTEventsResponse> {
  const response = await fetch(
    // TODO use URL constructor
    `${STACKS_API_HOSTNAME}/extended/v1/address/${walletAddress}/nft_events`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
export default fetchAddressNFTEvents;
