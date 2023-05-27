import React from "react";
import src from "../../public/Banner.png";
import Image from "next/image";
import { Chip } from "@material-tailwind/react";
import { timeformat } from "./ReviewItem";

interface Props {
  title: string;
  description: string;
  image: string;
  category: string;
  articleDate: string;
}
export default function BlogCard({
  title,
  description,
  image,
  category,
  articleDate,
}: Props) {
  console.log(category);
  const date = new Date(articleDate);
  return (
    <div className="flex flex-col 2xl:flex-row rounded-xl overflow-hidden bg-white">
      <div className="pt-[60%] md:pt-[40%] 2xl:pt-[30%] relative w-full min-w-[250px] 2xl:flex-[3] ">
        <Image
          src={image}
          alt="blog post"
          width={400}
          height={400}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-6 space-y-3 lg:space-y-5 2xl:flex-[5]">
        <Chip value={category} color="amber" className="normal-case" />
        <h2 className="text-xl lg:text-2xl">{title}</h2>
        <p className="text-sm">{description}</p>

        <span className="max-w-[30%] h-[1px] bg-black block"></span>
        <span className="text-gray-600 block text-sm">
          {date.toLocaleDateString("ro-RO", timeformat)}
        </span>
      </div>
    </div>
  );
}
