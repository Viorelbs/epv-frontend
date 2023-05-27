import Image from "next/image";
import React from "react";
import src from "../../public/Banner.png";

export default function BlogSmallCard() {
  return (
    <div className="gap-2">
      <div className="relative pt-[60%] w-full  rounded-xl overflow-hidden flex-1">
        <Image
          src={src}
          width={300}
          height={200}
          alt="blog image"
          className="absolute w-full h-full left-0 top-0"
        />
      </div>
      <div className="flex-1 font-medium space-y-1 mt-1">
        <h4>Rising prices: the time for solar is now!</h4>
        <div className="flex justify-between flex-wrap">
          <span className="text-gray-600 block text-sm font-medium">
            Panouri Solare
          </span>
          <span className="text-gray-600 block text-sm">21 nov 2022</span>
        </div>
      </div>
    </div>
  );
}
