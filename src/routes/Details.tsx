import { NavLink, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { TokenData } from "../data/gammaApi";
import useGammaCollectionToken from "../hooks/useGammaCollectionsToken";
import "./Details.scss";

function Details() {
  const [searchParams] = useSearchParams();
  const collectionName = searchParams.get("collectionName");
  const tokenId = searchParams.get("tokenId");
  const { data, error } = useGammaCollectionToken({ collectionName, tokenId });

  console.log(error); // TODO use this error

  return (
    <div className="details">
      <header className="details__header">
        <NavLink to={".."}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </NavLink>
        <h1>NFT Details</h1>
      </header>
      {data && (
        <div className="details__body">
          <img
            src={parseImageUrl(data?.data)}
            alt={data?.data?.token_metadata?.name}
          />
          <section className="item-details">
            <h2>Item Details</h2>
            <hr />
            <div>
              <h3>Identifier</h3>
              <span>{data?.data?.fully_qualified_token_id}</span>
            </div>
            <h2>Attributes</h2>
            {data?.data?.nft_token_attributes?.map((attribute, i) => (
              <Attribute
                key={i}
                label={attribute?.trait_type}
                value={attribute?.value}
              />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}

// TODO would unit test this
const parseImageUrl = (tokenData: TokenData): string => {
  if (!tokenData?.token_metadata?.image_url) {
    return "";
  }

  if (tokenData?.token_metadata?.image_protocol === "ipfs") {
    return (
      "https://ipfs.filebase.io/ipfs/" +
      tokenData?.token_metadata?.image_url?.replace("ipfs://", "")
    );
  }
  return tokenData?.token_metadata?.image_url ?? "";
};

const Attribute = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h3>{label}</h3>
    <span>{value}</span>
  </div>
);

export default Details;
