import Banner from "@/components/Layout/Banner";
import BlogCard from "@/components/Layout/BlogCard";
import BlogToolbar from "@/components/Layout/BlogToolbar";

import { client } from "../_app";
import {
  QUERY_ARTICLE_CARD,
  QUERY_ARTICLE_CATEGORY,
  QUERY_BLOG_PAGE_SEO,
  QUERY_LAST_ARTICLES,
} from "@/queries/queries";
import {
  ArticleCardInterface,
  ArticleCategoryInterface,
  ArticlePaginationInterface,
  MetaImage,
  SEO,
} from "@/typings";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Pagination } from "@mui/material";
import Head from "next/head";

interface Props {
  articles: ArticleCardInterface[];
  lastArticles: ArticleCardInterface[];
  categories: ArticleCategoryInterface;
  pagination: ArticlePaginationInterface;
  seo: SEO;
  ogImage: MetaImage;
  ogDescription: string;
  ogTitle: string;
}

export default function Blog({
  articles,
  categories,
  lastArticles,
  pagination,
  seo,
  ogImage,
  ogTitle,
  ogDescription,
}: Props) {
  const router = useRouter();
  const paginationNumber = Math.ceil(pagination.total / 8);

  useEffect(() => {
    if (paginationNumber < 1) {
      const queryParams = new URLSearchParams(
        router.query as Record<string, string>
      );
      queryParams.set("page", "1");
      router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
        scroll: false,
      });
    }
  }, [paginationNumber, router]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const queryParams = new URLSearchParams(
      router.query as Record<string, string>
    );

    queryParams.set("page", `${value}`);
    router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
      scroll: false,
    });
  };

  return (
    <>
      <Head>
        <title>{seo.data.attributes.seo.metaTitle || "Panouri solare"}</title>
        <meta
          name="description"
          content={
            seo.data?.attributes.seo?.metaDescription || "Panouri solare"
          }
        />
        <meta
          name="keywords"
          content={seo.data?.attributes.seo?.keywords || "Panouri Solare"}
        />
      </Head>
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
            {paginationNumber > 1 && (
              <Pagination
                size="large"
                color="standard"
                onChange={handleChange}
                count={Number(paginationNumber)}
                variant="outlined"
                shape={"rounded"}
              ></Pagination>
            )}
          </div>
          <BlogToolbar
            categoriesData={categories.categorieArticoles.data}
            lastArticles={lastArticles}
          />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ query }: any) {
  const [articlesData, categories, lastArticles, blogSeo] = await Promise.all([
    client.query({
      query: QUERY_ARTICLE_CARD,
      variables: {
        pageIdx: Number(query?.page) || 1,
        size: 8,
      },
    }),
    client.query({
      query: QUERY_ARTICLE_CATEGORY,
    }),
    client.query({
      query: QUERY_LAST_ARTICLES,
    }),
    client.query({
      query: QUERY_BLOG_PAGE_SEO,
    }),
  ]);

  return {
    props: {
      articles: articlesData.data.articoles.data,
      categories: categories.data,
      lastArticles: lastArticles.data.articoles.data,
      pagination: articlesData.data.articoles.meta.pagination,
      seo: blogSeo.data.blogPageSeo,
      ogTitle: blogSeo.data.blogPageSeo.data.attributes.seo?.metaTitle,
      ogDescription:
        blogSeo.data.blogPageSeo.data.attributes.seo?.metaDescription,
      ogImage: blogSeo.data.blogPageSeo.data.attributes.seo?.metaImage,
    },
  };
}
