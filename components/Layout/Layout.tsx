import { useRouter } from "next/router";
import CookiePopup from "./Cookies";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();

  if (router.asPath.includes("checkout")) {
    return <main>{children}</main>;
  } else
    return (
      <>
        <Header />
        {children}
        <CookiePopup />
        <Footer />
      </>
    );
}
