import useWidth from "@/hooks/useWidth";
import { ImageSimple, ProdusCardType } from "@/typings";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
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
  const [visibleImages, setVisibleImages] = useState<number>(4);
  const [startIndex, setStartIndex] = useState<number>(0);
  const { windowWidth } = useWidth();

  const showNextImages = () => {
    const newStartIndex = startIndex + visibleImages;
    if (newStartIndex < product.attributes.PozeProdus.data.length) {
      setStartIndex(newStartIndex);
    }
  };

  const showPrevImages = () => {
    const newStartIndex = startIndex - visibleImages;
    if (newStartIndex >= 0) {
      setStartIndex(newStartIndex);
    }
  };

  useEffect(() => {
    windowWidth < 500 ? setVisibleImages(3) : setVisibleImages(4);
  }, [windowWidth]);

  const canShowPrevImages = startIndex > 0;
  const canShowNextImages =
    startIndex + visibleImages < product.attributes.PozeProdus.data.length;

  return (
    <div className="flex-1 bg-white rounded-md">
      <div className="relative overflow-hidden pt-[70%] border border-gray-300 mb-4">
        {product.attributes.PretVechi && (
          <span className="absolute top-0 left-0 bg-[#0DC97A] text-white px-5 py-2 rounded-tl-lg rounded-br-lg text-sm md:text-base z-40">
            {formattedDiscount}
          </span>
        )}

        {product.attributes.superPret ? (
          <span className="absolute left-0 top-12 bg-red-600 text-white px-2 md:px-3 py-[5px] rounded-tr-lg rounded-br-lg text-sm pointer-events-none z-10">
            Super Pret
          </span>
        ) : null}

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
      <div className="flex gap-4 scrollbar-hide overflow-auto">
        {product.attributes.PozeProdus.data
          .slice(startIndex, startIndex + visibleImages)
          .map((item: ImageSimple, idx: any) => (
            <Image
              key={idx}
              src={item.attributes.url}
              alt={product.attributes.Nume}
              onClick={() => setCurrentImage(item.attributes.url)}
              className="w-24 h-24 md:w-28 md:h-28 p-3 bg-gray-100 hover:bg-gray-200 transition-all duration-75 rounded-sm cursor-pointer"
              width={70}
              height={70}
            />
          ))}
      </div>
      <div className="flex justify-between mt-2">
        {canShowPrevImages && (
          <button
            onClick={showPrevImages}
            className="text-sm text-gray-500  hover:text-gray-700 cursor-pointer"
          >
            <HiArrowSmLeft className="w-8 h-8 border p-1 rounded-lg text-black" />
          </button>
        )}
        {canShowNextImages && (
          <button
            onClick={showNextImages}
            className="text-sm text-gray-500   hover:text-gray-700 cursor-pointer"
          >
            <HiArrowSmRight className="w-8 h-8 border p-1 rounded-lg text-black" />
          </button>
        )}
      </div>
    </div>
  );
}
