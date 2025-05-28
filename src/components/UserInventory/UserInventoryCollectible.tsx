import type {
  CurrencyData,
  ShowCreateListingModalArgs,
  ShowSellModalArgs,
} from "../../utils/types";
import type {
  CollectibleOrder,
  OrderbookKind,
} from "@0xsequence/marketplace-sdk";
import { useBalanceOfCollectible } from "@0xsequence/marketplace-sdk/react";
import type { Address } from "viem";
import { CollectibleBase } from "../common/CollectibleBase";
import { ButtonStandard } from "../common/ButtonStandard";

export const UserInventoryCollectible = ({
  collectible,
  chainId,
  collectionAddress,
  showListModal,
  showSellModal,
  address,
  isConnected,
  orderbookKind,
  offerPriceCurrencyData,
}: {
  collectible: CollectibleOrder;
  chainId: string;
  collectionAddress: Address;
  showListModal: (args: ShowCreateListingModalArgs) => void;
  showSellModal: (args: ShowSellModalArgs) => void;
  address?: Address;
  isConnected: boolean;
  orderbookKind: OrderbookKind;
  offerPriceCurrencyData: CurrencyData | null;
}) => {
  const { name, image, tokenId } = collectible.metadata;

  const { data: userBalanceResp } = useBalanceOfCollectible({
    chainId: Number(chainId),
    collectionAddress,
    collectableId: tokenId,
    userAddress: address,
    query: {
      enabled: !!isConnected && !!address,
    },
  });

  const tokenBalance = parseInt(userBalanceResp?.balance || "0");

  const onClickList = () => {
    showListModal({
      collectionAddress,
      chainId: Number(chainId),
      collectibleId: tokenId,
      orderbookKind,
    });
  };

  const onAcceptOffer = () => {
    showSellModal({
      collectionAddress,
      chainId: Number(chainId),
      tokenId,
      order: collectible!.offer!,
    });
  };

  const hasOffer = Boolean(collectible?.offer);
  const sellDisabled = !isConnected || !hasOffer || !tokenBalance;
  const showActionButtons = address && isConnected;

  return (
    <CollectibleBase
      name={name}
      tokenId={tokenId}
      imageUrl={image}
      tokenBalance={tokenBalance}
    >
      {showActionButtons && (
        <div className="flex flex-col gap-2">
          {tokenBalance && (
            <ButtonStandard onClick={onClickList}>List for Sale</ButtonStandard>
          )}
          {!sellDisabled && (
            <ButtonStandard onClick={onAcceptOffer}>
              Sell Now for {collectible.offer?.priceAmountFormatted}{" "}
              {offerPriceCurrencyData?.symbol || "unknown"}
            </ButtonStandard>
          )}
        </div>
      )}
    </CollectibleBase>
  );
};
