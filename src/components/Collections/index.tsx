import { MarketCollection } from "@0xsequence/marketplace-sdk";
import { Collection } from "./Collection";
import { useMarketplaceConfig } from "@0xsequence/marketplace-sdk/react";

export const Collections = ({
  onSelectCollection,
}: {
  onSelectCollection: (value: MarketCollection) => void;
}) => {
  const { data } = useMarketplaceConfig();

  const collections: MarketCollection[] = data?.market.collections || [];

  return (
    <div>
      {collections?.map((collection) => (
        <Collection
          key={collection.itemsAddress}
          collection={collection}
          onSelectCollection={onSelectCollection}
        />
      ))}
    </div>
  );
};
