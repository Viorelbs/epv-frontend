import React from "react";
import Image from "next/image";
import { Chip } from "@material-tailwind/react";

interface Props {
  title: string;
  imageURL: string;
  category: string;
}

export default function BannerArticle({ title, imageURL, category }: Props) {
  console.log(imageURL);
  return (
    <div className="relative grid place-content-center min-h-[600px] ">
      <Image
        className="w-full absolute top-0 left-0 -z-10 h-full object-cover  brightness-50	"
        src={imageURL}
        alt="Panouri Solare Banner"
        width={800}
        height={400}
      />

      <div className="container mx-auto">
        <Chip value={category} color="amber" className="normal-case text-md" />
        <h1 className=" text-white font-semibold px-4 md:px-0 ">{title}</h1>
      </div>
    </div>
  );
}
