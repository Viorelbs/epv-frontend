import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { SwipeableDrawer } from "@mui/material";
import logo from "../../public/logo.png";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "../Common/Icon";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useQuery } from "@apollo/client";
import { QUERY_SERVICES_MENU } from "@/queries/queries";
import { LinkType } from "@/typings";
import Cart from "./Cart";
import { RiHeartsLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import IndustrialForm from "./IndustrialForm";

interface Props {
  window?: () => Window;
  scroll: boolean;
}

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
      <SwipeableDrawer
        container={container}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className="min-w-[100vw] sm:min-w-[80vw] h-full px-10 flex flex-col justify-between">
          <div>
            <div className="py-4 flex justify-between items-center border-b mb-4">
              <Image
                src={logo}
                alt="Epv logo"
                className="w-[50px] h-[50px] object-contain invert"
              />
              <AiOutlineClose
                onClick={toggleDrawer(false)}
                className="w-7 h-7 cursor-pointer hover:text-red-500"
              />
            </div>
            <div className="flex flex-col gap-2 text-[20px]  ">
              <Link
                className="border-b py-3"
                href="/"
                onClick={() => setOpen(false)}
              >
                Acasă
              </Link>
              <Link
                className="border-b py-3"
                href="/despre-noi"
                onClick={() => setOpen(false)}
              >
                Despre Noi
              </Link>
              {/* <Link
                className="border-b py-3"
                href="/produse"
                onClick={() => setOpen(false)}
              >
                Produse
              </Link> */}
              <Accordion open={openAc} icon={<Icon open={openAc} />}>
                <AccordionHeader
                  onClick={handleOpen}
                  className="font-normal text-[20px] text-[#000000de] py-3 font-poppins"
                >
                  Servicii
                </AccordionHeader>
                {data && (
                  <AccordionBody className="flex flex-col gap-4 text-md">
                    {data.serviciis.data.map((link: LinkType) => (
                      <Link
                        className="text-base "
                        onClick={() => setOpen(false)}
                        href={`/servicii/${link.attributes.slug}`}
                        key={link.attributes.slug}
                      >
                        {link.attributes.title}
                      </Link>
                    ))}
                  </AccordionBody>
                )}
              </Accordion>
              <Link
                className="border-b py-3"
                href="/contact"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="mb-[5vh]">
            <IndustrialForm MenuOpen={(arg) => setOpen(arg)} />
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
