import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { RxEnvelopeClosed } from "react-icons/rx";
import { FiPhoneCall } from "react-icons/fi";
import anpc from "../../public/anpc_sol/anpc.webp";
import sol from "../../public/anpc_sol/sol.webp";
import { useQuery } from "@apollo/client";
import { QUERY_SERVICES_MENU } from "@/queries/queries";

export default function Footer() {
  const { loading, error, data } = useQuery(QUERY_SERVICES_MENU);
  return (
    <footer className="py-12 bg-black text-white px-4">
      <div className="container mx-auto grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-8 gap-12  ">
        <div className="flex flex-col gap-4">
          <Image src={logo} alt="EPV Infinity Logo" />
          <Link
            href="#"
            className="flex gap-2 mt-8 hover:text-[#F7CD1F] text-sm md:text-md"
          >
            <RxEnvelopeClosed className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
            Epv@info.contact
          </Link>
          <Link
            href="#"
            className="flex gap-2 hover:text-[#F7CD1F] text-sm md:text-md"
          >
            <FiPhoneCall className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
            +40 752 013 942
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold">Meniu</span>
          <Link className="footer-link" href="/">
            Acasa
          </Link>
          <Link className="footer-link" href="/despre-noi">
            Despre Noi
          </Link>
          <Link className="footer-link" href="/produse">
            Produse
          </Link>

          <Link className="footer-link" href="/blog">
            Blog
          </Link>
          <Link className="footer-link" href="/contact">
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold">Utile</span>
          <Link className="footer-link" href="/politica-cookie">
            Politica Cookie
          </Link>
          <Link className="footer-link" href="/termeni-si-conditii">
            Termeni si conditii
          </Link>
          <Link className="footer-link" href="/politica-de-retur">
            Politica de retur
          </Link>
          <Link className="footer-link" href="https://anpc.ro/" target="_blank">
            Anpc
          </Link>
          <Link
            className="footer-link"
            target="_blank"
            href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"
          >
            Sol
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold">Servicii</span>
          {data &&
            data.serviciis.data.map((link: any) => (
              <Link
                key={link.attributes.title}
                className="footer-link"
                href={`/servicii/${link.attributes.slug}`}
              >
                {link.attributes.title}
              </Link>
            ))}
        </div>
        <div className="col-span-2 md:col-span-1 flex mx-auto md:flex-col flex-wrap justify-center md:justify-start">
          <Image
            src={anpc}
            alt="anpc logo"
            width={200}
            height={200}
            className="w-full max-w-[200px] md:max-w-full"
          />
          <Image
            src={sol}
            alt="sol logo"
            width={200}
            height={200}
            className="w-full max-w-[200px] md:max-w-full"
          />
        </div>
      </div>
    </footer>
  );
}
