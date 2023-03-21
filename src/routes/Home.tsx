import { NFTEvent } from "../data/stacksNodeApi";
import useStacksAddressNFTEvents from "../hooks/useStacksAddressNFTEvents";

// TODO use url params
const walletAddress = "SP36DHK0QACYS0FNVZ0Q5HMA10CD29XZNE029QX1F";

export function Home() {
  const { data } = useStacksAddressNFTEvents({ walletAddress });
  console.log(data);
  return (
    <div>
      <h2>lookup here</h2>
      {data?.nft_events?.map((nftEvent: NFTEvent) => (
        <ul>
          <li>{nftEvent?.asset_identifier}</li>
        </ul>
      ))}
    </div>
  );
}
export default Home;
