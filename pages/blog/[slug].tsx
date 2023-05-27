import { QUERY_ARTICLE, QUERY_ARTICLE_SLUG } from "@/queries/queries";
import { client } from "../_app";
import { ArticleInterface } from "@/typings";
import parse from "html-react-parser";
import Image from "next/image";
import BannerArticle from "@/components/Layout/BannerArticle";

interface Props {
  article: ArticleInterface;
}

export default function BlogPage({ article }: Props) {
  console.log(article);
  return (
    <div>
      <BannerArticle
        title={article.titlu}
        imageURL={article.PozaPrincipalaArticol.data.attributes.url}
        category={article.categorie_articole.data.attributes.TitluCategorie}
      />
      <div className="py-10 p-4 md:py-20 container mx-auto">
        <div>{parse(article.textUnuArticol)}</div>
        <div className="flex overflow-x-auto gap-4">
          {article.Imagini.data.map((image) => (
            <Image
              src={image.attributes.url}
              width={400}
              height={400}
              alt={article.titlu}
              className="rounded-xl"
            />
          ))}
        </div>
        <div>{parse(article.textDoiArticol)}</div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: QUERY_ARTICLE_SLUG,
  });

  const paths = data.articoles.data.map((article: any) => ({
    params: { slug: article.attributes.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }: any) {
  const { slug } = params;

  const [articleData] = await Promise.all([
    client.query({
      query: QUERY_ARTICLE,
      variables: { slug: slug },
    }),
  ]);

  return {
    revalidate: 10,
    props: {
      article: articleData.data.articoles.data[0].attributes,
    },
  };
}
