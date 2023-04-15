import Banner from "@/components/Layout/Banner";
import { QUERY_RETUR } from "@/queries/queries";
import HTMLReactParser from "html-react-parser";
import { client } from "./_app";

export default function PoliticaRetur({ data }: any) {
  return (
    <div>
      <Banner text="Politica De Retur" />
      <div className="container mx-auto my-20 px-4">
        {HTMLReactParser(data)}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const terms = await client.query({
    query: QUERY_RETUR,
  });
  return {
    props: {
      data: terms.data.politicaRetur.data.attributes.Politica,
    },
  };
}
