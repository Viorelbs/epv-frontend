import { URL } from "@/pages/_app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface Props {
  children: React.ReactNode;
}
const StrapiApolloProvider = ({ children }: Props) => {
  const client = new ApolloClient({
    uri: `${URL}/graphql`,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default StrapiApolloProvider;
