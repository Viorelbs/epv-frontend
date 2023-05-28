import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/client";
import { QUERY_SERVICES_MENU } from "@/queries/queries";
import Cart from "./Cart";
import { RiHeartsLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import logo from "../../public/logo.png";
import dynamic from "next/dynamic";
import Loader from "../Common/Loader";

interface Props {
  window?: () => Window;
  scroll: boolean;
}

const DynamicMenuDrawer = dynamic(() => import("./MenuDrawer"), {
  loading: () => <Loader size={6} />,
  ssr: false,
});

export default function MobileMenu(props: Props) {
  const { window, scroll } = props;
  const [open, setOpen] = useState(false);
  const [openAc, setOpenAc] = useState(false);
  const { loading, error, data } = useQuery(QUERY_SERVICES_MENU);
  const favProducts = useSelector((state: RootState) => state.favourite);

  // Drawer
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const router = useRouter();

  // Accordion
  const handleOpen = () => {
    setOpenAc(openAc === false ? true : false);
  };
  return (
    <div className="container mx-auto px-4 ">
      <div className="flex justify-between">
        <Image
          onClick={() => router.push("/")}
          src={logo}
          alt="Epv logo"
          className={`w-[50px] h-[50px] cursor-pointer object-contain ${
            scroll ? "invert" : ""
          }`}
        />

        <div
          className={`flex gap-4 items-center ${scroll ? "text-black" : ""}`}
        >
          {" "}
          <Link href="/produse-favorite">
            <RiHeartsLine
              className={`w-7 h-7 hover:text-[#F7CD1F] cursor-pointer ${
                favProducts.products.length > 0 ? "" : "text-gray-400"
              }`}
            />
          </Link>
          <Cart scroll={scroll} />
          <AiOutlineMenu
            className="w-7 h-7 cursor-pointer hover:text-[#F7CD1F] z-50"
            onClick={toggleDrawer(true)}
          />
        </div>
      </div>
      <DynamicMenuDrawer
        container={container}
        toggleDrawer={toggleDrawer}
        handleOpen={handleOpen}
        setOpen={setOpen}
        openAc={openAc}
        data={data}
        open={open}
      />
    </div>
  );
}
