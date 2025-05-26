import { useAccount } from "wagmi";

import { Group, Card } from "@0xsequence-demos/boilerplate-design-system";
import { Collections } from "../components/Collections";
import { useState } from "react";
import { Collectibles } from "../components/Collectibles";
import { Address } from "viem";
import { UserInventory } from "../components/UserInventory";
import { MarketCollection } from "@0xsequence/marketplace-sdk";

export function Connected() {
  const { address, chain, chainId } = useAccount();
  const [collectionSelected, setCollectionSelected] =
    useState<MarketCollection | null>(null);
  function onSelectCollection(value: MarketCollection) {
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
              Back to Collections
            </button>
            <div className="text-20">
              Use{" "}
              <a
                href="https://faucet.circle.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600"
              >
                this faucet
              </a>{" "}
              to get USDC to use in this demo
            </div>
            <UserInventory
              chainId={collectionSelected.chainId}
              collectionId={collectionSelected.itemsAddress as Address}
            />
            <Collectibles
              chainId={collectionSelected.chainId}
              collectionId={collectionSelected.itemsAddress as Address}
            />
          </div>
        )}
      </div>
    </div>
  );
}
