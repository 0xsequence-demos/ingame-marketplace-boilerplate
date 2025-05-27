import { Image } from "@0xsequence-demos/boilerplate-design-system";
import { ReactNode } from "react";

export const GridItemBase = ({
  imageUrl,
  children,
}: {
  imageUrl?: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col w-[350px] px-3 py-3 border border-transparent bg-[#14062a] text-left rounded-[1rem] overflow-clip">
      {imageUrl ? (
        <Image
          className=" w-full max-w-[28rem] mx-auto aspect-square rounded-lg"
          src={imageUrl}
        />
      ) : (
        <div className="w-full max-w-[28rem] mx-auto aspect-square bg-grey-800 rounded-lg"></div>
      )}
      {children}
    </div>
  );
};
