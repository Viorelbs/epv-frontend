import { URL } from "@/pages/_app";
import { ImageType } from "@/typings";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiPhoneCall } from "react-icons/fi";

interface Props {
  title: string;
  description: string;
  bigImage: ImageType;
  smallImage: ImageType;
  partenersList: ImageType[];
}

export default function SimpleSection({
  title,
  description,
  bigImage,
  smallImage,
  partenersList,
}: Props) {
  const router = useRouter();
  return (
    <div className="py-24 lg:py-32 bg-[#F5F3ED]">
      <div className="container items-center  mx-auto grid lg:grid-cols-2 gap-20 px-4 md:px-0">
        <div>
          <h2>{title}</h2>
          <div className="mt-4">{HTMLReactParser(description)}</div>
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <button
              className="btn-primary"
              onClick={() => router.push("/contact")}
            >
              Contacteaza-ne
            </button>
            <Link
              href="tel:+40 752 013 942"
              className="flex gap-2 items-center font-medium justify-center"
            >
              <FiPhoneCall className="p-2 w-10 h-10 bg-white rounded-[100%] " />
              +40 752 013 942
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 mb-8 row-start-1 ">
          <Image
            className="w-full col-span-1 mt-auto relative left-[10%] top-[10%] object-cover rounded-xl"
            src={smallImage.data.attributes.url}
            width={150}
            height={150}
            alt="image one"
          />
          <Image
            className="w-full col-span-2 object-cover rounded-xl"
            src={bigImage.data.attributes.url}
            width={150}
            height={150}
            alt="image two"
          />
        </div>
      </div>
      <div className="container mx-auto mt-14 px-4 md:px-0 space-y-4">
        <h3>Colaboram cu cele mai mari nume din industrie</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center  flex-wrap gap-8">
          {partenersList.map((partener) => (
            <Image
              className="object-contain saturate-0 hover:saturate-100 p-4 "
              key={partener.id}
              width={150}
              height={150}
              src={partener.attributes.url}
              alt="Partener logo"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
