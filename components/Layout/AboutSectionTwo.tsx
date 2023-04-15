import { URL } from "@/pages/_app";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image: string;
}

export default function AboutSectionTwo({ title, description, image }: Props) {
  return (
    <div className="bg-[#F7CD1F]">
      <div className="container mx-auto flex flex-col lg:flex-row lg:gap-14 mt-[200px] px-4 ">
        <div className="relative rounded-xl overflow-hidden pt-[60%] lg:pt-[35%] flex-[3]  bottom-[70px] ">
          <Image
            className="absolute top-0 left-0 w-full h-full"
            src={image}
            alt="panouri solare"
            width={700}
            height={700}
          />
        </div>

        <div className="flex-[2] m-auto pb-[70px] -mt-12 lg:mt-0">
          <h2>{title}</h2>
          <div>{HTMLReactParser(description)}</div>
          <button className="btn-primary mt-8 bg-black text-white">
            Vezi Servicii
          </button>
        </div>
      </div>
    </div>
  );
}
