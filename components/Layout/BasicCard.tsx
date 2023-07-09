import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  text: string;
  iconUrl: string;
}
export default function BasicCard({ title, text, iconUrl }: Props) {
  return (
    <div className="flex flex-col justify-center items-center group">
      <Image
        src={iconUrl}
        alt="section Icon"
        width={80}
        height={80}
        className="mb-6 group-hover:scale-110 duration-200"
      />
      <h3 className="font-medium mb-2">{HTMLReactParser(title)}</h3>
      <p className="text-[16px] text-center">{HTMLReactParser(text)}</p>
    </div>
  );
}
