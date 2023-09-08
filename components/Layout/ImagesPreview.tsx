import { ImageSimple, ProdusCardType } from "@/typings";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  product: any;
  setCurrentImage: Dispatch<SetStateAction<string | undefined>>;
  formattedDiscount: string;
  currentImage: string | undefined;
}
export default function ImagesPreview({
  product,
  setCurrentImage,
  formattedDiscount,
  currentImage,
}: Props) {
  return (
    <div className="flex-1 bg-white rounded-md">
      <div className="relative overflow-hidden pt-[70%]  border border-gray-300 mb-4">
        {product.attributes.PretVechi && (
          <span className="absolute top-0 left-0 bg-[#0DC97A] text-white px-5 py-2 rounded-tl-lg rounded-br-lg text-sm md:text-base z-40">
            {formattedDiscount}
          </span>
        )}

        {currentImage && (
          <Image
            className="absolute top-0 hover:scale-125 transition-all duration-300 left-0 right-0 bottom-0 m-auto object-contain w-full h-full p-4 md:p-10"
            src={currentImage}
            width={300}
            alt="product image"
            height={300}
          />
        )}
      </div>
      <div className="flex gap-4 overflow-auto ">
        {product.attributes.PozeProdus.data.map(
          (item: ImageSimple, idx: any) => (
            <Image
              key={idx}
              src={item.attributes.url}
              alt={product.attributes.Nume}
              onClick={() => setCurrentImage(item.attributes.url)}
              className="w-24 h-24 p-3 bg-gray-100 hover:bg-gray-200 transition-all duration-75 rounded-sm cursor-pointer"
              width={50}
              height={50}
            />
          )
        )}
      </div>
    </div>
  );
}
