import { URL } from "@/pages/_app";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imageOne: string;
  imageTwo: string;
}

export default function AboutSectionFour({
  title,
  description,
  imageOne,
  imageTwo,
}: Props) {
  return (
    <div className="container mx-auto flex gap-[5vw] px-4">
      <Image
        src={imageOne}
        width={400}
        height={400}
        alt="panouri solare"
        className="object-contain rounded-xl flex-[6] hidden md:block"
      />
      <div className="flex-[5]">
        <h2>{title}</h2>
        <div className="mt-4">{HTMLReactParser(description)}</div>
        <Image
          className="mt-10 w-full rounded-xl "
          src={imageTwo}
          width={400}
          height={400}
          alt="panouri solare"
        />
      </div>
    </div>
  );
}
