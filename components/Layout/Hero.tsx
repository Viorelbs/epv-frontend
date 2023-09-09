import { VideoType } from "@/typings";
import { useRouter } from "next/router";
import Image from "next/image";
import { EconomyIcon, Guarantee, PanelIcon } from "../Common/Icons";
import useWidth from "@/hooks/useWidth";

interface Props {
  bgVideo: VideoType;
  title: string;
  description: string;
  image: string;
}

export default function Hero({ bgVideo, title, description, image }: Props) {
  const { windowWidth } = useWidth();
  const router = useRouter();
  return (
    <div className="min-h-screen relative min-w-screen md:px-0 flex items-center">
      {windowWidth > 678 ? (
        <video
          playsInline
          className="h-full w-full absolute top-0 left-0 brightness-[40%] -z-[1] object-cover"
          muted
          autoPlay
          loop
        >
          <source src={bgVideo as any} type="video/mp4" />
          <track kind="captions" label="English" srcLang="en" default />
        </video>
      ) : (
        <Image
          src={image}
          alt="panouri solare"
          width={400}
          height={400}
          className="absolute top-0 left-0 brightness-[40%] w-full h-full object-cover -z-[1]"
        />
      )}

      <div className=" container mx-auto space-y-[5vh] sm:space-y-[10vh] py-24 px-4">
        <div className="text-white sm:max-w-xl lg:max-w-[700px] ">
          <h1 className=" font-bold">{title}</h1>
          <p className="font-light  leading-8 ">{description}</p>
          <div className="flex gap-5 mt-10 flex-col sm:flex-row">
            {/* <button
              className="btn-primary"
              onClick={() => router.push("/produse")}
            >
              Gama Produse
            </button> */}
            <button
              className="btn-primary"
              onClick={() => router.push("/produse")}
            >
              Produse
            </button>
            {/* <button
              className="btn-secondary"
              onClick={() => router.push("/servicii/instalare-panouri")}
            >
              Instalare Panouri
            </button> */}
          </div>
        </div>
        <div className="text-white flex gap-[5vw] flex-col sm:flex-row">
          <div className="simple-card">
            <PanelIcon className="icon-xl" />
            <span className=" font-light block mt-6 text-sm">
              Energie <br /> Regenerabila
            </span>
          </div>
          <div className="simple-card">
            <EconomyIcon className="icon-xl " />
            <span className=" font-light block mt-6 text-sm">
              Economisiti pe <br /> termen lung
            </span>
          </div>
          <div className="simple-card border-r-0  ">
            <Guarantee className="icon-xl " />
            <span className="font-light block mt-6 text-sm">
              5 ani
              <br /> garantie
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
