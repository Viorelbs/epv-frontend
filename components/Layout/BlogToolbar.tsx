import React from "react";
import BlogCard from "./BlogCard";
import BlogSmallCard from "./BlogSmallCard";

export default function BlogToolbar() {
  return (
    <div className="bg-white rounded-xl md:col-start-6 md:col-end-9 xl:col-start-7 xl:col-end-9 p-6 space-y-8 sticky top-28 h-fit">
      <div className="space-y-3">
        <h3>Categorii</h3>
        <ul className="space-y-2 ">
          <li className="flex items-center gap-2 cursor-pointer hover:text-orange-600 group">
            <span className="w-3 h-[2px] bg-black group-hover:bg-orange-600"></span>
            Panouri Solare
            <span className="text-xs">(4)</span>
          </li>

          <li className="flex items-center gap-2 cursor-pointer hover:text-orange-600 group">
            <span className="w-3 h-[2px] bg-black group-hover:bg-orange-600"></span>
            Instalatii Electrice
            <span className="text-xs">(4)</span>
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-orange-600 group">
            <span className="w-3 h-[2px] bg-black group-hover:bg-orange-600"></span>
            Instalatii Electrice
            <span className="text-xs">(4)</span>
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-orange-600 group">
            <span className="w-3 h-[2px] bg-black group-hover:bg-orange-600"></span>
            Instalatii Electrice
            <span className="text-xs">(4)</span>
          </li>
        </ul>
      </div>
      <div>
        <h3>Articole Recente</h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-1">
          <BlogSmallCard />
          <BlogSmallCard />
          <BlogSmallCard />
          <BlogSmallCard />
        </div>
      </div>
    </div>
  );
}
