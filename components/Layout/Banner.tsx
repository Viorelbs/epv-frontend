import Image from "next/image";
import BannerSrc from "../../public/Banner.png";

interface Props {
  text: string;
}
export default function Banner({ text }: Props) {
  return (
    <div className="relative">
      <Image
        className="max-h-[300px] min-h-[200px]"
        src={BannerSrc}
        alt="Panouri Solare Banner"
      />

      <h1 className="absolute bottom-10 left-0 right-0 container mx-auto text-white font-semibold px-4 md:px-0">
        {text}
      </h1>
    </div>
  );
}
