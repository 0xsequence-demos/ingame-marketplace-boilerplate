import type {
  CurrencyData,
  ShowBuyModalArgs,
  ShowMakeOfferModalArgs,
} from "../../utils/types";
import type {
  CollectibleOrder,
  MarketplaceKind,
  OrderbookKind,
} from "@0xsequence/marketplace-sdk";
import type { Address } from "viem";
import { ButtonStandard } from "../common/ButtonStandard";
import { CollectibleBase } from "../common/CollectibleBase";
import { useBalanceOfCollectible } from "@0xsequence/marketplace-sdk/react";

export const Collectible = ({
  collectible,
  chainId,
  collectionAddress,
  showBuyModal,
  showOfferModal,
  address,
  isConnected,
  orderbookKind,
  priceCurrencyData,
}: {
  collectible: CollectibleOrder;
  chainId: string;
  collectionAddress: Address;
  showBuyModal: (args: ShowBuyModalArgs) => void;
  showOfferModal: (args: ShowMakeOfferModalArgs) => void;
  address?: Address;
  isConnected: boolean;
  orderbookKind: OrderbookKind;
  priceCurrencyData: CurrencyData | null;
}) => {
  const { name, image, tokenId } = collectible.metadata;

  const onClickBuy = () =>
    showBuyModal({
      chainId: Number(chainId),
      collectionAddress,
      collectibleId: tokenId,
      orderId: collectible!.order!.orderId,
      marketplace: orderbookKind as unknown as MarketplaceKind,
    });

  const onClickOffer = () => {
    showOfferModal({
      collectionAddress,
      chainId: Number(chainId),
      collectibleId: tokenId,
      orderbookKind,
    });
  };

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
          {collectible.order && (
            <ButtonStandard onClick={onClickBuy}>
              Buy Now for {collectible.order.priceAmountFormatted}{" "}
              {priceCurrencyData?.symbol || "unknown"}
            </ButtonStandard>
          )}
          <ButtonStandard onClick={onClickOffer}>Offer To Buy</ButtonStandard>
        </div>
      )}
    </CollectibleBase>
  );
};
