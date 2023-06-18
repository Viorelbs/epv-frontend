import Layout from "@/components/Layout/Layout";
import StrapiApolloProvider from "@/graphql/apollo";
import { WidthProvider } from "@/hooks/useWidth";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import logo from "../public/logo.png";
import { useRouter } from "next/router";

export const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const client: any = new ApolloClient({
  uri: `${URL}/graphql`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

const persistor = persistStore(store);
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="robots" content="index follow " />
        {/* Facebook Meta Tags */}
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`}
        />{" "}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={pageProps?.ogTitle || "Panorui solare"}
        />
        <meta
          property="og:description"
          content={pageProps?.ogDescription || "Panorui solare"}
        />
        <meta property="og:site_name" content="EPV Infinity" />
        <meta property="og:locale" content="ro-RO" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content={pageProps?.ogImage?.data?.attributes.url || logo}
        />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      {/* Components */}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ApolloProvider client={client}>
            <StrapiApolloProvider>
              <WidthProvider>
                <Layout>
                  <Component {...pageProps} />
                  <Analytics />
                </Layout>
              </WidthProvider>
            </StrapiApolloProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
