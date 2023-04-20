import { URL } from "@/pages/_app";
import { ImageType } from "@/typings";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  panelsNumber: number;
  projectsNumber: number;
  imageOne: ImageType;
  imageTwo: ImageType;
}
export default function AboutSectionOne({
  title,
  description,
  panelsNumber,
  projectsNumber,
  imageOne,
  imageTwo,
}: Props) {
  return (
    <div className="container mx-auto grid lg:grid-cols-2 gap-[5vw] px-4 ">
      <div className="my-auto">
        <h2>{title}</h2>
        <div className="mt-4">{HTMLReactParser(description)}</div>
        <div className="flex gap-12 mt-8">
          <div>
            <p className="text-md font-light mb-2">Panouri Montate</p>
            <span className="font-semibold text-4xl">{panelsNumber} +</span>
          </div>
          <div>
            <p className="text-md font-light mb-2">Proiecte</p>
            <span className="font-semibold text-4xl">{projectsNumber} +</span>
          </div>
        </div>
      </div>
      <div className="flex mb-8">
        <Image
          className="w-full object-cover rounded-xl flex-[2]"
          src={imageOne.data.attributes.url}
          width={150}
          height={150}
          alt="image two"
        />
        <Image
          className="w-full  mt-auto relative right-[10%] top-[10%] object-cover rounded-xl flex-1"
          src={imageTwo.data.attributes.url}
          alt="Panouri Solare Vile"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
