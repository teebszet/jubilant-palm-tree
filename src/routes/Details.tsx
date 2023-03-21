import { Link, useSearchParams } from "react-router-dom";
import { TokenData } from "../data/gammaApi";
import useGammaCollectionToken from "../hooks/useGammaCollectionsToken";

function Details() {
  const [searchParams] = useSearchParams();
  const collectionName = searchParams.get("collectionName");
  const tokenId = searchParams.get("tokenId");
  const { data, error } = useGammaCollectionToken({ collectionName, tokenId });
  console.log(data, error);
  console.log(collectionName, tokenId);

  return (
    <div>
      <header>
        <Link to={".."}>{"<"}</Link>
        <h1>NFT Details</h1>
        {data && (
          <div>
            <img
              src={parseImageUrl(data?.data)}
              alt={data?.data?.token_metadata?.name}
            />
            <h2>Item Details</h2>
            <hr />
            <div>
              <span>Identifier</span>
              <span>{data?.data?.fully_qualified_token_id}</span>
            </div>
            {data?.data?.nft_token_attributes?.map((attribute) => (
              <Attribute
                label={attribute?.trait_type}
                value={attribute?.value}
              />
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

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
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default Details;
