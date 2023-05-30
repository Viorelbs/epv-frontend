import Image from "next/image";
import React from "react";
import { timeformat } from "./ReviewItem";
import { useRouter } from "next/router";
interface Props {
  image: string;
  title: string;
  category: string;
  date: string;
  slug: string;
}
export default function BlogSmallCard({
  image,
  title,
  category,
  date,
  slug,
}: Props) {
  const formatedDate = new Date(date);
  const router = useRouter();

  return (
    <div className="gap-2 group" onClick={() => router.push(`/blog/${slug}`)}>
      <div className="relative pt-[60%] w-full  rounded-xl overflow-hidden flex-1">
        <Image
          src={image}
          width={300}
          height={200}
          alt="blog image"
          className="absolute w-full h-full left-0 top-0 cursor-pointer group-hover:scale-110 duration-500 transition-all"
        />
      </div>
      <div className="flex-1 font-medium space-y-1 mt-1 cursor-pointer">
        <h4 className="group-hover:text-orange-600 ">{title}</h4>
        <div className="flex justify-between flex-col gap-1">
          <span className="text-gray-800 block text-sm font-medium border-t border-gray-500 pt-[5px]">
            {category}
          </span>
          <span className="text-gray-600 block text-sm font-normal">
            {formatedDate.toLocaleDateString("ro-RO", timeformat)}
          </span>
        </div>
      </div>
    </div>
  );
}
