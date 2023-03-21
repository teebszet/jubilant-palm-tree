import { useState } from "react";
import { Link } from "react-router-dom";
import { NFTEvent } from "../data/stacksNodeApi";
import useStacksAddressNFTEvents from "../hooks/useStacksAddressNFTEvents";

export function Home() {
  const [walletAddress, setWalletAddress] = useState(
    "SP36DHK0QACYS0FNVZ0Q5HMA10CD29XZNE029QX1F" // TODO remove placeholder. should be ""
  );
  const { data } = useStacksAddressNFTEvents({ walletAddress });
  console.log(data);

  const handleChangeWalletAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWalletAddress(e?.target?.value);
  };
  return (
    <div>
      <header>
        <h1>NFTs Lookup</h1>
      </header>
      <div>
        <label>
          Stacks Address:
          <input value={walletAddress} onChange={handleChangeWalletAddress} />
        </label>
        <button>Look up</button>
      </div>
      <Results results={data?.nft_events} />
    </div>
  );
}

const Results = ({ results }: { results?: NFTEvent[] }) => {
  if (!results) {
    return null;
  }
  return (
    <div>
      Results:
      {results
        ?.filter((nftEvent: NFTEvent) => Boolean(nftEvent.asset_identifier))
        .map((nftEvent: NFTEvent) => (
          <ul>
            <li>
              <span>{nftEvent?.asset_identifier}</span>
              <Link
                to={`details/${encodeURIComponent(nftEvent?.asset_identifier)}`}
              />
            </li>
          </ul>
        ))}
    </div>
  );
};
export default Home;
