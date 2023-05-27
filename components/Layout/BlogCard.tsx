import React from "react";
import src from "../../public/Banner.png";
import Image from "next/image";
import { Chip } from "@material-tailwind/react";
import { timeformat } from "./ReviewItem";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description: string;
  image: string;
  category: string;
  articleDate: string;
  slug: string;
}
export default function BlogCard({
  title,
  description,
  image,
  category,
  articleDate,
  slug,
}: Props) {
  const router = useRouter();
  const date = new Date(articleDate);
  return (
    <div className="flex flex-col 2xl:flex-row rounded-xl overflow-hidden bg-white group">
      <div
        className="pt-[60%] 2xl:pt-[30%] relative w-full min-w-[250px] 2xl:flex-[3] cursor-pointer overflow-hidden"
        onClick={() => router.push(`/blog/${slug}`)}
      >
        <Image
          src={image}
          alt="blog post"
          width={400}
          height={400}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 duration-500 transition-all"
        />
      </div>
      <div className="p-4 xl:p-6 space-y-3 lg:space-y-5 2xl:flex-[5]">
        <Chip value={category} color="amber" className="normal-case" />
        <h2
          className="text-xl lg:text-2xl cursor-pointer hover:text-orange-600"
          onClick={() => router.push(`/blog/${slug}`)}
        >
          {title}
        </h2>
        <p className="text-sm">{description}</p>

        <span className="max-w-[30%] h-[1px] bg-black block"></span>
        <span className="text-gray-600 block text-sm">
          {date.toLocaleDateString("ro-RO", timeformat)}
        </span>
      </div>
    </div>
  );
}
