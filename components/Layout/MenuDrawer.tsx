import React, { SetStateAction } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { Drawer } from "@mui/material";
import Link from "next/link";
import Icon from "../Common/Icon";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { LinkType } from "@/typings";
import logo from "../../public/logo.png";
import IndustrialForm from "./IndustrialForm";

interface Props {
  container: any;
  toggleDrawer: (newOpen: boolean) => () => void;
  handleOpen: () => void;
  setOpen: (value: SetStateAction<boolean>) => void;
  open: boolean;
  openAc: boolean;
  data: any;
}

export default function MenuDrawer({
  container,
  toggleDrawer,
  handleOpen,
  setOpen,
  open,
  openAc,
  data,
}: Props) {
  return (
    <Drawer
      container={container}
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
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
            <Link
              className="border-b py-3"
              href="/produse"
              onClick={() => setOpen(false)}
            >
              Produse
            </Link>

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
              href="/blog"
              className="border-b py-3"
              onClick={() => setOpen(false)}
            >
              {" "}
              Blog
            </Link>

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
    </Drawer>
  );
}
