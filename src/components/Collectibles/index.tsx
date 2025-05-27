import { OrderbookKind, OrderSide } from "@0xsequence/marketplace-sdk";
import {
  useBuyModal,
  useListCollectibles,
  useMakeOfferModal,
  useMarketCurrencies,
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
  const { data: collectibles, refetch: refetchCollectibles } =
    useListCollectibles({
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

  const showBuyModalOnSuccess = ({ hash }: { hash?: `0x${string}` }) => {
    console.log("Buy transaction sent with hash: ", hash);
    if (hash)
      setTimeout(() => {
        refetchCollectibles();
      }, 3000);
  };

  const { show: showBuyModal } = useBuyModal({
    onSuccess: showBuyModalOnSuccess,
    onError,
  });

  const { show: showOfferModal } = useMakeOfferModal({
    onError,
  });

  const collectiblesFlat =
    collectibles?.pages.flatMap((p) => p.collectibles) ?? [];
  const collectionData =
    data?.market.collections?.find(
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
