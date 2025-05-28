import { ReactNode } from "react";
import { GridItemBase } from "./GridItemBase";

export const CollectibleBase = ({
  name,
  imageUrl,
  tokenId,
  children,
  tokenBalance,
}: {
  name: string;
  imageUrl?: string;
  tokenId: string;
  children: ReactNode;
  tokenBalance: number;
}) => {
  return (
    <GridItemBase imageUrl={imageUrl}>
      <div className="flex flex-col gap-4 pt-4">
        <div className="flex flex-col gap-1 px-4">
          <span className="text-20 font-bold leading-tight">{name || ""}</span>
        </div>

        <dl className="flex justify-between gap-4 border-t border-grey-800 px-6 py-3">
          <div className="flex flex-col">
            <dt className="text-11 font-medium text-grey-200 leading-[1em]">
              Token Id
            </dt>
            <dd className="text-white font-bold text-14">{tokenId || ""}</dd>
          </div>
          <div className="flex flex-col text-end items-end">
            <dt className="text-11 font-medium text-grey-200 leading-[1em]">
              Owned
            </dt>
            <dd className="text-white font-bold text-14">{tokenBalance}</dd>
          </div>
        </dl>
      </div>
      {children}
    </GridItemBase>
  );
};
