import { useAccount } from "wagmi";

import { Group, Card } from "@0xsequence-demos/boilerplate-design-system";
import { Collections } from "../components/Collections";
import { MarketplaceCollection } from "@0xsequence/marketplace-sdk";
import { useState } from "react";
import { Collectibles } from "../components/Collectibles";
import { Address } from "viem";
import { UserInventory } from "../components/UserInventory";

export function Connected() {
  const { address, chain, chainId } = useAccount();
  const [collectionSelected, setCollectionSelected] =
    useState<MarketplaceCollection | null>(null);
  function onSelectCollection(value: MarketplaceCollection) {
    setCollectionSelected(value);
  }
  function onRestartSelectedCollectionValue() {
    setCollectionSelected(null);
  }

  if (!address || !chain || !chainId) {
    return (
      <div className="flex flex-col gap-8">
        <Group title="User info">
          <Card
            style={{ gap: "1rem", display: "flex", flexDirection: "column" }}
          >
            Missing information (
            {[
              !address ? "address" : null,
              !chain ? "chain" : null,
              !chainId ? "chainId" : null,
            ]
              .filter((n) => !!n)
              .join(", ")}
            ) required to display user info
          </Card>
        </Group>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        {!collectionSelected ? (
          <Collections onSelectCollection={onSelectCollection} />
        ) : (
          <div className="flex flex-col gap-4">
            <button
              className="mx-auto py-3 px-3 border border-transparent bg-[linear-gradient(to_left,_#7537f9,_#5826ff)] rounded-[0.5rem] min-w-[50px] font-bold text-14 cursor-pointer"
              onClick={onRestartSelectedCollectionValue}
            >
              Show Collections
            </button>
            <UserInventory
              chainId={collectionSelected.chainId}
              collectionId={collectionSelected.address as Address}
            />
            <Collectibles
              chainId={collectionSelected.chainId}
              collectionId={collectionSelected.address as Address}
            />
          </div>
        )}
      </div>
    </div>
  );
}
