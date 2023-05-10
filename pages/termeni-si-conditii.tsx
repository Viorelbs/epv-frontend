import Banner from "@/components/Layout/Banner";
import { QUERY_TERMENI } from "@/queries/queries";
import HTMLReactParser from "html-react-parser";
import { client } from "./_app";

export default function Termeni({ data }: any) {
  return (
    <div>
      <Banner text="Termeni si condiții" />
      <div className="container mx-auto my-20 px-4">
        {HTMLReactParser(data)}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const terms = await client.query({
    query: QUERY_TERMENI,
  });
  return {
    props: {
      data: terms.data.termeniSiConditii.data.attributes.Termeni,
    },
    revalidate: 1000,
  };
}
