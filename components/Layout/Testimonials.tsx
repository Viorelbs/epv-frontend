import { ReviewImageType } from "@/typings";
import googleLogo from "../../public/google-logo.png";
import Image from "next/image";
import Rating from "../Common/Rating";
import HTMLReactParser from "html-react-parser";

interface Props {
  name: string;
  avatarPhoto: ReviewImageType;
  rating: number;
  date: string;
  content: string;
}
export default function Testimonial({
  name,
  avatarPhoto,
  rating,
  date,
  content,
}: Props) {
  return (
    <div className="bg-[#F8F8F8] rounded-lg p-4 flex flex-col gap-2 testimonial relative min-h-[290px] md:min-h-[220px] min-w-[80vw] md:min-w-[400px]  transition duration-200 ease-out  md:hover:scale-105">
      <div className="flex gap-4 items-center">
        <Image
          src={avatarPhoto.data.attributes.url}
          width={40}
          height={40}
          alt="image two"
        />
        <div>
          <h4 className="text-sm">{name}</h4>
          <span className="text-sm text-gray-600">{date}</span>
        </div>
        <Image
          className="w-[20px] ml-auto h-[20px] object-contain"
          src={googleLogo}
          alt="google logo"
        />
      </div>
      <Rating rating={rating / 2} />
      <div className="mt-2 text-gray-600">{HTMLReactParser(content)}</div>
    </div>
  );
}
