import { OrderbookKind, OrderSide } from "@0xsequence/marketplace-sdk";
import {
  useCreateListingModal,
  useListCollectibles,
  useMarketCurrencies,
  useMarketplaceConfig,
  useSellModal,
} from "@0xsequence/marketplace-sdk/react";
import type { Address } from "viem";
import { useAccount } from "wagmi";
import { UserInventoryCollectible } from "./UserInventoryCollectible";

export const UserInventory = ({
  collectionId,
  chainId,
}: {
  collectionId: Address;
  chainId: number;
}) => {
  const { address, isConnected } = useAccount();
  const { data: collectibles } = useListCollectibles({
    chainId: Number(chainId),
    collectionAddress: collectionId,
    filter: {
      // # Optional filters
      includeEmpty: true,
      inAccounts: [address!],
      // searchText: text,
      // properties,
    },
    side: OrderSide.listing,
    query: {
      enabled: !!address,
    },
  });

  const { data } = useMarketplaceConfig();

  const onError = (error: Error) => {
    console.error(error.message);
  };

  const { show: showListModal } = useCreateListingModal({ onError });
  const { show: showSellModal } = useSellModal({ onError });

  const collectiblesFlat =
    collectibles?.pages.flatMap((p) => p.collectibles) ?? [];
  const collectionData =
    data?.market?.collections.find(
      (collection) => collection.itemsAddress === collectionId,
    ) || null;

  const { data: currenciesData } = useMarketCurrencies({
    chainId: collectionData!.chainId,
    collectionAddress: collectionData!.itemsAddress as `0x${string}`,
    includeNativeCurrency: true,
    query: {
      enabled: !!collectionData?.chainId && !!collectionData?.itemsAddress,
    },
  });
  const orderbookKind: OrderbookKind =
    (collectionData?.destinationMarketplace || "") as unknown as OrderbookKind;

  return (
    <div>
      <h1 className="text-[32px] font-semibold">Your Items</h1>
      <div className="flex flex-wrap gap-6">
        {collectiblesFlat?.map((collectible) => (
          <UserInventoryCollectible
            key={collectible.metadata.tokenId}
            collectible={collectible}
            chainId={String(chainId)}
            collectionAddress={collectionId}
            showListModal={showListModal}
            showSellModal={showSellModal}
            address={address}
            isConnected={isConnected}
            orderbookKind={orderbookKind}
            offerPriceCurrencyData={
              currenciesData?.find(
                (currency) =>
                  currency.contractAddress ===
                  collectible.offer?.priceCurrencyAddress,
              ) || null
            }
          />
        ))}
      </div>
    </div>
  );
};
