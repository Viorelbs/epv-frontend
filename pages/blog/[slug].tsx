import {
  QUERY_ARTICLE,
  QUERY_ARTICLE_SLUG,
  QUERY_SIMILAR_ARTICLE_CARD,
} from "@/queries/queries";
import { client } from "../_app";
import { ArticleCardInterface, ArticleInterface } from "@/typings";
import parse from "html-react-parser";
import Image from "next/image";
import BannerArticle from "@/components/Layout/BannerArticle";
import BlogSmallCard from "@/components/Layout/BlogSmallCard";

interface Props {
  article: ArticleInterface;
  similarArticle: ArticleCardInterface[];
}

export default function BlogPage({ article, similarArticle }: Props) {
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
          {article.Imagini.data.map((image, idx) => (
            <Image
              key={idx}
              src={image.attributes.url}
              width={400}
              height={400}
              alt={article.titlu}
              className="rounded-xl"
            />
          ))}
        </div>
        <div>{parse(article.textDoiArticol)}</div>
        <div className="mt-10">
          <h3 className="text-3xl font-medium">Articole Similare</h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 sm:gap-4 mt-4">
            {similarArticle.map((article, idx) => (
              <BlogSmallCard
                key={article.id}
                category={
                  article.attributes.categorie_articole.data.attributes
                    .TitluCategorie
                }
                title={article.attributes.titlu}
                date={article.attributes.createdAt}
                image={
                  article.attributes.PozaPrincipalaArticol.data.attributes.url
                }
                slug={article.attributes.slug}
              />
            ))}
          </div>
        </div>
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

  const [articleData, similarArticle] = await Promise.all([
    client.query({
      query: QUERY_ARTICLE,
      variables: { slug: slug },
    }),
    client.query({
      query: QUERY_SIMILAR_ARTICLE_CARD,
      variables: { slug: slug },
    }),
  ]);

  return {
    revalidate: 10,
    props: {
      article: articleData.data.articoles.data[0].attributes,
      similarArticle: similarArticle.data.articoles.data,
    },
  };
}
