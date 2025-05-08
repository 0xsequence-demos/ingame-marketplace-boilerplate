import type { MarketplaceCollection } from "@0xsequence/marketplace-sdk";
import { useCollection } from "@0xsequence/marketplace-sdk/react";

export const Collection = ({
  collection,
  onSelectCollection,
}: {
  collection: MarketplaceCollection;
  onSelectCollection: (value: MarketplaceCollection) => void;
}) => {
  const { data } = useCollection({
    chainId: collection.chainId,
    collectionAddress: collection.address,
  });

  const logoURI = data?.logoURI;
  // You can add a placeholder image to improve the UX
  const image = data?.extensions.ogImage || collection.bannerUrl || logoURI;
  const description = data?.extensions.description;
  const name = data?.name;
  const symbol = data?.symbol;
  const contractType = data?.type;

  function handleOnSelectCollection() {
    onSelectCollection(collection);
  }

  return (
    <div
      onClick={handleOnSelectCollection}
      className="flex flex-col gap-2 border rounded-lg cursor-pointer w-[400px]"
    >
      <h2>
        {name} {symbol && <span>({symbol})</span>}
      </h2>
      <p>{collection.address}</p>
      <p>Chain ID: {collection.chainId}</p>
      <img
        src={image}
        alt={collection.address}
        className="w-[200px] h-[200px] object-cover object-center"
      />
      <p>Contract type: {contractType}</p>
      <p>{description}</p>
    </div>
  );
};
