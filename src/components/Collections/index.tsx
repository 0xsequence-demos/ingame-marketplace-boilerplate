import type { MarketplaceCollection } from "@0xsequence/marketplace-sdk";
import { Collection } from "./Collection";
import { useMarketplaceConfig } from "@0xsequence/marketplace-sdk/react";

export const Collections = ({
  onSelectCollection,
}: {
  onSelectCollection: (value: MarketplaceCollection) => void;
}) => {
  const { data } = useMarketplaceConfig();

  const collections: MarketplaceCollection[] = data?.collections || [];
  return (
    <div>
      {collections?.map((collection) => (
        <Collection
          key={collection.address}
          collection={collection}
          onSelectCollection={onSelectCollection}
        />
      ))}
    </div>
  );
};
