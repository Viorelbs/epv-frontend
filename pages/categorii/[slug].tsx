import React from "react";
import { client } from "../_app";
import {
  QUERY_CATEGORY_ARTICLE,
  QUERY_CATEGORY_ARTICLE_SLUG,
} from "@/queries/queries";
import Banner from "@/components/Layout/Banner";
import { CategoryDataInterface } from "@/typings";
import BlogSmallCard from "@/components/Layout/BlogSmallCard";

interface Props {
  category: CategoryDataInterface;
}

export default function CategoryPage({ category }: Props) {
  return (
    <div>
      <Banner text={category.attributes.TitluCategorie} />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 sm:gap-4 container mx-auto py-10 px-4 lg:px-0">
        {category.attributes.articoles.data.map((article, idx) => (
          <BlogSmallCard
            key={idx}
            title={article.attributes.titlu}
            slug={article.attributes.slug}
            image={article.attributes.PozaPrincipalaArticol.data.attributes.url}
            date={article.attributes.createdAt}
            category={category.attributes.TitluCategorie}
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: QUERY_CATEGORY_ARTICLE_SLUG,
  });

  const paths = data.categorieArticoles.data.map((category: any) => ({
    params: { slug: category.attributes.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }: any) {
  const { slug } = params;

  const [categoryData] = await Promise.all([
    client.query({
      query: QUERY_CATEGORY_ARTICLE,
      variables: { slug: slug },
    }),
  ]);

  return {
    revalidate: 10,
    props: {
      category: categoryData.data.categorieArticoles.data[0],
    },
  };
}
