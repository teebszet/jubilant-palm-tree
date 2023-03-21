import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { NFTEvent } from "../data/stacksNodeApi";
import useStacksAddressNFTEvents from "../hooks/useStacksAddressNFTEvents";
import "./Home.scss";

export function Home() {
  const [walletAddress, setWalletAddress] = useState(
    "SP36DHK0QACYS0FNVZ0Q5HMA10CD29XZNE029QX1F" // TODO remove placeholder. should be ""
  );
  const { data } = useStacksAddressNFTEvents({ walletAddress });

  const handleChangeWalletAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWalletAddress(e?.target?.value);
  };
  return (
    <div className="lookup">
      <header className="lookup__header">
        <h1>NFTs Lookup</h1>
      </header>
      <section className="lookup__body">
        <div className="search">
          <label>
            Stacks Address:
            <input value={walletAddress} onChange={handleChangeWalletAddress} />
          </label>
          <button>Look up</button>
        </div>
        <Results results={data?.nft_events} />
      </section>
    </div>
  );
}

// TODO put these in a class somewhere
const parseCollectionName = (nftEvent: NFTEvent): string =>
  nftEvent?.asset_identifier?.split("::")?.shift() ?? "";

const parseTokenId = (nftEvent: NFTEvent): string => {
  console.log(nftEvent?.value);
  return "87"; // TODO
};

const Results = ({ results }: { results?: NFTEvent[] }) => {
  if (!results) {
    return null;
  }
  return (
    <div className="results">
      Results:
      <ul>
        {results
          ?.filter((nftEvent: NFTEvent) => Boolean(nftEvent.asset_identifier))
          .map((nftEvent: NFTEvent, i) => {
            const searchParams = new URLSearchParams({
              collectionName: parseCollectionName(nftEvent),
              tokenId: parseTokenId(nftEvent),
            });
            const toUrl = `details?${searchParams.toString()}`;
            return (
              <li key={i}>
                <span>{nftEvent?.asset_identifier}</span>
                <Link to={toUrl}>
                  <FontAwesomeIcon icon={faChevronRight} size="lg" />
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Home;
