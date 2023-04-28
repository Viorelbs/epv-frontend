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
  );
}
