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

export const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const client: any = new ApolloClient({
  uri: `${URL}/graphql`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Facebook Meta Tags */}
      <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={"Panorui solare"} />
      <meta property="og:description" content={"Panorui solare"} />
      <meta property="og:locale" content="ro-RO" />

      {/* <meta
            property="og:image"
            content={product.attributes.seo[0]?.metaImage.data.attributes.url}
          />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" /> */}

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
