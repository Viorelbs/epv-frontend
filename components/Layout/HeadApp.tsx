import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function HeadApp({ title, description }: any) {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />
      {/* Facebook Meta Tags */}
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`}
      />
      {/* <meta property="og:type" content={meta.type} /> */}
      <meta property="og:title" content={title || "Panorui solare"} />
      <meta
        property="og:description"
        content={description || "Panorui solare"}
      />
      <meta property="og:site_name" content="EPV Infinity" />

      <meta property="og:locale" content="ro-RO" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* <meta
          property="og:image"
          content={pageProps?.ogImage?.data?.attributes.url || logo}
        /> */}
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
    </Head>
  );
}
