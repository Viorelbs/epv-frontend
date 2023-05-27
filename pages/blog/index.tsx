import Banner from "@/components/Layout/Banner";
import BlogCard from "@/components/Layout/BlogCard";
import BlogToolbar from "@/components/Layout/BlogToolbar";
import { client } from "../_app";
import { QUERY_ARTICLE_CARD } from "@/queries/queries";
import { ArticleCardInterface } from "@/typings";

interface Props {
  articles: ArticleCardInterface[];
}

export default function Blog({ articles }: Props) {
  return (
    <main className="bg-secondary">
      <Banner text="Blog" />
      <div className="py-14 md:py-24 container mx-auto flex flex-col md:grid md:grid-cols-8 gap-8 ">
        <div className="md:col-start-1 md:col-end-6 xl:col-start-1 xl:col-end-7 space-y-10 px-4 sm:px-0">
          {articles.map((article) => (
            <BlogCard
              key={article.id}
              title={article.attributes.titlu}
              description={article.attributes.ScurtaDescriere}
              image={
                article.attributes.PozaPrincipalaArticol.data.attributes.url
              }
              category={
                article.attributes.categorie_articoles.data[0].attributes
                  .TitluCategorie
              }
              articleDate={article.attributes.createdAt}
            />
          ))}
        </div>
        <BlogToolbar />
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const [articlesData] = await Promise.all([
    client.query({
      query: QUERY_ARTICLE_CARD,
    }),
  ]);

  return {
    props: {
      articles: articlesData.data.articoles.data,
    },
  };
}
