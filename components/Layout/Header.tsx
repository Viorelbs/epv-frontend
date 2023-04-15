import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import { RiHeartsLine } from "react-icons/ri";
import useWidth from "@/hooks/useWidth";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QUERY_SERVICES_MENU } from "@/queries/queries";
import { useQuery } from "@apollo/client";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react/components/Menu";
import { LinkType } from "@/typings";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Header() {
  const { windowWidth } = useWidth();
  const [scroll, setScroll] = useState(false);
  const router = useRouter();
  const { loading, error, data } = useQuery(QUERY_SERVICES_MENU);
  const favProducts = useSelector((state: RootState) => state.favourite);

  useEffect(() => {
    if (router.asPath?.includes("produse/")) {
      return () => setScroll(true);
    }

    const handleScroll = () => {
      setScroll(window.pageYOffset > 100);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [router]);

  const desktopMenu = (
    <div
      className={`flex justify-between container mx-auto ${
        scroll ? " text-black" : ""
      }`}
    >
      <nav className="flex items-center gap-6">
        <Image
          onClick={() => router.push("/")}
          className={`${scroll ? "invert" : ""} cursor-pointer`}
          src={logo}
          alt="Epv logo"
        />
        <Link href="/">Acasă</Link>
        <Link href="/despre-noi">Despre Noi</Link>
        <Link href="/produse">Produse</Link>
        <Menu>
          <MenuHandler>
            <span className="hover:text-[#f7cd1f] cursor-pointer">
              Servicii
            </span>
          </MenuHandler>
          {data && (
            <MenuList>
              {data.serviciis.data.map((link: LinkType) => (
                <MenuItem
                  key={link.attributes.title}
                  onClick={() =>
                    router.push(`/servicii/${link.attributes.slug}`)
                  }
                >
                  {link.attributes.title}
                </MenuItem>
              ))}
            </MenuList>
          )}
        </Menu>
        <Link href="/contact"> Contact</Link>
      </nav>
      <div className="flex items-center gap-6">
        <button className="btn-primary">Montaje Industriale</button>
        <Link href="/produse-favorite">
          <RiHeartsLine
            className={`w-7 h-7 hover:text-[#F7CD1F] cursor-pointer ${
              favProducts.products.length > 0 ? "" : "text-gray-400"
            }`}
          />
        </Link>
        <span className="flex gap-2 items-center hover:text-[#F7CD1F] cursor-pointer">
          <Cart scroll={scroll} />
        </span>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 w-full z-50 py-3 text-white  ${
        scroll ? "bg-white border-b border-gray-400" : "bg-transparent"
      }`}
    >
      {windowWidth > 1200 ? desktopMenu : <MobileMenu scroll={scroll} />}
    </header>
  );
}
