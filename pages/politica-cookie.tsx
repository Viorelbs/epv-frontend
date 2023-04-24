import Banner from "@/components/Layout/Banner";
import { QUERY_POLITICA } from "@/queries/queries";
import HTMLReactParser from "html-react-parser";
import { client } from "./_app";

export default function PoliticaCookie({ data }: any) {
  return (
    <div>
      <Banner text="Politica Cookie" />
      <div className="container mx-auto my-20 px-4">
        {HTMLReactParser(data)}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const terms = await client.query({
    query: QUERY_POLITICA,
  });
  return {
    props: {
      data: terms.data.politicaCookie.data.attributes.Politica,
    },
  };
}
