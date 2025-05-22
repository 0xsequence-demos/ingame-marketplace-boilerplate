import { OrderbookKind, OrderSide } from "@0xsequence/marketplace-sdk";
import {
  useBuyModal,
  useCurrencies,
  useListCollectibles,
  useMakeOfferModal,
  useMarketplaceConfig,
} from "@0xsequence/marketplace-sdk/react";
import { Collectible } from "./Collectible";
import type { Address } from "viem";
import { useAccount } from "wagmi";

export const Collectibles = ({
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
      // searchText: text,
      // properties,
    },
    side: OrderSide.listing,
  });

  const { data } = useMarketplaceConfig();

  const onError = (error: Error) => {
    console.error(error.message);
  };

  const { show: showBuyModal } = useBuyModal({
    onSuccess(hash) {
      console.log("Buy transaction sent with hash: ", hash);
    },
    onError,
  });

  const { show: showOfferModal } = useMakeOfferModal({
    onError,
  });

  const collectiblesFlat =
    collectibles?.pages.flatMap((p) => p.collectibles) ?? [];
  const collectionData =
    data?.collections?.find(
      (collection) => collection.address === collectionId,
    ) || null;

  const { data: currenciesData } = useCurrencies({
    chainId: collectionData!.chainId,
    collectionAddress: collectionData!.address,
    includeNativeCurrency: true,
    query: {
      enabled: !!collectionData?.chainId && !!collectionData?.address,
    },
  });
  const orderbookKind: OrderbookKind =
    (collectionData?.destinationMarketplace || "") as unknown as OrderbookKind;

  return (
    <div>
      <h1 className="text-[32px] font-semibold">Marketplace Items</h1>
      <div className="flex flex-wrap gap-6">
        {/* Agregar tab para inventario del usuario. */}
        {collectiblesFlat?.map((collectible) => (
          <Collectible
            key={collectible.metadata.tokenId}
            collectible={collectible}
            chainId={String(chainId)}
            collectionAddress={collectionId}
            showBuyModal={showBuyModal}
            showOfferModal={showOfferModal}
            address={address}
            isConnected={isConnected}
            orderbookKind={orderbookKind}
            priceCurrencyData={
              currenciesData?.find(
                (currency) =>
                  currency.contractAddress ===
                  collectible.order?.priceCurrencyAddress,
              ) || null
            }
          />
        ))}
      </div>
    </div>
  );
};
