import React from "react";
import BlogSmallCard from "./BlogSmallCard";
import { useRouter } from "next/router";
import { ArticleCardInterface } from "@/typings";
interface Props {
  categoriesData: {
    attributes: {
      TitluCategorie: string;
      slug: string;
      articoles: {
        data: any[];
      };
    };
  }[];
  lastArticles: ArticleCardInterface[];
}

export default function BlogToolbar({ categoriesData, lastArticles }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl md:col-start-6 md:col-end-9 xl:col-start-7 xl:col-end-9 p-6 space-y-8 sticky top-28 h-fit">
      <div className="space-y-3">
        <h3>Categorii</h3>
        <ul className="space-y-4">
          {categoriesData.map((title, idx) => {
            return (
              <li
                key={idx}
                onClick={() =>
                  router.push(`categorii/${title.attributes.slug}`)
                }
                className={`gap-2 cursor-pointer hover:text-orange-600 group ${
                  title.attributes.articoles.data.length < 1 ? "hidden" : ""
                }`}
              >
                <span className="w-3 h-[2px] bg-black group-hover:bg-orange-600 inline-block mr-2 mb-[3px]"></span>
                {title.attributes.TitluCategorie}
                <span className="text-xs ml-2">
                  ({title.attributes.articoles.data.length})
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Articole Recente</h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-1">
          {lastArticles.map((article) => (
            <BlogSmallCard
              key={article.id}
              image={
                article.attributes.PozaPrincipalaArticol.data.attributes.url
              }
              title={article.attributes.titlu}
              category={
                article.attributes.categorie_articole.data.attributes
                  .TitluCategorie
              }
              date={article.attributes.createdAt}
              slug={article.attributes.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
