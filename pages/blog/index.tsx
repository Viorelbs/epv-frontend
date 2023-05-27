import Banner from "@/components/Layout/Banner";
import BlogCard from "@/components/Layout/BlogCard";
import BlogToolbar from "@/components/Layout/BlogToolbar";
import { client } from "../_app";
import {
  QUERY_ARTICLE_CARD,
  QUERY_ARTICLE_CATEGORY,
  QUERY_LAST_ARTICLES,
} from "@/queries/queries";
import { ArticleCardInterface, ArticleCategoryInterface } from "@/typings";

interface Props {
  articles: ArticleCardInterface[];
  lastArticles: ArticleCardInterface[];
  categories: ArticleCategoryInterface;
}

export default function Blog({ articles, categories, lastArticles }: Props) {
  // MUST DO PAGINATION
  return (
    <main className="bg-secondary">
      <Banner text="Blog" />
      <div className="py-14 md:py-24 container mx-auto flex flex-col md:grid md:grid-cols-8 gap-8 ">
        <div className="md:col-start-1 md:col-end-6 xl:col-start-1 xl:col-end-7 space-y-10 px-4 sm:px-0">
          {articles.map((article) => (
            <BlogCard
              key={article.id}
              slug={article.attributes.slug}
              title={article.attributes.titlu}
              description={article.attributes.ScurtaDescriere}
              image={
                article.attributes.PozaPrincipalaArticol.data.attributes.url
              }
              category={
                article.attributes.categorie_articole.data.attributes
                  .TitluCategorie
              }
              articleDate={article.attributes.createdAt}
            />
          ))}
        </div>
        <BlogToolbar
          categoriesData={categories.categorieArticoles.data}
          lastArticles={lastArticles}
        />
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const [articlesData, categories, lastArticles] = await Promise.all([
    client.query({
      query: QUERY_ARTICLE_CARD,
    }),
    client.query({
      query: QUERY_ARTICLE_CATEGORY,
    }),
    client.query({
      query: QUERY_LAST_ARTICLES,
    }),
  ]);

  return {
    props: {
      articles: articlesData.data.articoles.data,
      categories: categories.data,
      lastArticles: lastArticles.data.articoles.data,
    },
  };
}
