import { Image } from "@0xsequence-demos/boilerplate-design-system";
import {
  getPresentableChainName,
  MarketCollection,
} from "@0xsequence/marketplace-sdk";
import { useCollection } from "@0xsequence/marketplace-sdk/react";
import { truncateText } from "../../utils/helpers";

export const Collection = ({
  collection,
  onSelectCollection,
}: {
  collection: MarketCollection;
  onSelectCollection: (value: MarketCollection) => void;
}) => {
  const { data } = useCollection({
    chainId: collection.chainId,
    collectionAddress: collection.itemsAddress,
  });

  const logoURI = data?.logoURI;
  const image = data?.extensions.ogImage || collection.bannerUrl || logoURI;
  const description = data?.extensions.description;
  const name = data?.name;
  const contractType = data?.type;

  function handleOnSelectCollection() {
    onSelectCollection(collection);
  }

  return (
    <div
      onClick={handleOnSelectCollection}
      className="flex flex-col w-[350px] px-3 py-3 border border-transparent bg-[#14062a] text-left rounded-[1rem] overflow-clip cursor-pointer"
    >
      {image ? (
        <Image
          className=" w-full max-w-[28rem] mx-auto aspect-square rounded-lg object-cover"
          src={image}
        />
      ) : (
        <div className="w-full max-w-[28rem] mx-auto aspect-square bg-grey-800 rounded-lg"></div>
      )}

      <div className="flex flex-col gap-4 pt-4">
        <div className="flex flex-col gap-1 px-4">
          <p className="text-20 font-bold leading-tight">
            {truncateText(name || "", 25)}
          </p>
          <p className="font-bold">{truncateText(description || "", 35)}</p>
          <p className="text-xs font-bold">
            Address: {collection.itemsAddress}
          </p>
        </div>

        <dl className="flex justify-between gap-4 border-t border-grey-800 px-6 py-3">
          <div className="flex flex-col">
            <dt className="text-11 font-medium text-grey-200 leading-[1em]">
              Chain
            </dt>
            <dd className="text-white font-bold text-14">
              {getPresentableChainName(collection.chainId)}
            </dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-11 font-medium text-grey-200 leading-[1em]">
              Chain ID
            </dt>
            <dd className="text-white font-bold text-14">
              {collection.chainId}
            </dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-11 font-medium text-grey-200 leading-[1em]">
              Contract type
            </dt>
            <dd className="text-white font-bold text-14">{contractType}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
