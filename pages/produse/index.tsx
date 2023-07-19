import Banner from "@/components/Layout/Banner";
import ProductsGrid from "@/components/Layout/ProductsGrid";
import {
  PRODUCTS_CARDS_QUERY,
  QUERY_BRANDS,
  QUERY_CATEGORIES,
  QUERY_POWERS,
  QUERY_PRODUCT_SEO,
} from "@/queries/queries";
import {
  BrandsType,
  CategoryType,
  ImageType,
  MetaImage,
  PowersType,
  ProdusCardType,
  SEO,
} from "@/typings";
import { client } from "../_app";
import Head from "next/head";

interface Props {
  productCard: { data: ProdusCardType[]; meta: {} };
  categories: {
    data: CategoryType[];
  };
  brands: {
    data: BrandsType[];
  };
  powers: {
    data: PowersType[];
  };
  seo: SEO;
  ogDescription: string;
  ogImage: MetaImage;
  ogTitle: string;
}

export default function Produse({
  productCard,
  categories,
  ogDescription,
  ogImage,
  brands,
  powers,
  seo,
  ogTitle,
}: Props) {
  return (
    <>
      <Head>
        <title>Produse</title>
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
      <main>
        <Banner text="Produse" />

        <ProductsGrid
          products={productCard}
          filters={false}
          categories={categories}
          brands={brands}
          powers={powers}
        />
      </main>
    </>
  );
}

export const getStaticProps = async ({ query }: any) => {
  const [productsData, categoriesData, brandsData, powerData, seo] =
    await Promise.all([
      client.query({
        query: PRODUCTS_CARDS_QUERY,
        variables: {
          catId:
            query?.cat?.length === 0
              ? undefined
              : query?.cat?.split(",").map(Number) || undefined,
          pageIdx: Number(query?.page) || 1,
          size: 10,
          sort: query?.sort || "createdAt:desc",
          brandId: query?.cat?.includes(2)
            ? undefined
            : query?.brand?.length === 0
            ? undefined
            : query?.brand?.split(",").map(Number) || undefined,
          putereId: query?.cat?.includes(2)
            ? undefined
            : query?.power?.length === 0
            ? undefined
            : query?.power?.split(",").map(Number) || undefined,
        },
      }),
      client.query({
        query: QUERY_CATEGORIES,
      }),
      client.query({
        query: QUERY_BRANDS,
      }),
      client.query({
        query: QUERY_POWERS,
      }),
      client.query({
        query: QUERY_PRODUCT_SEO,
      }),
    ]);

  return {
    props: {
      productCard: productsData.data.produses,
      categories: categoriesData.data.categories,
      brands: brandsData.data.brands,
      powers: powerData.data.puteres,
      seo: seo.data.productPageSeo,
      ogTitle: seo.data.productPageSeo.data.attributes.seo?.metaTitle || null,
      ogDescription:
        seo.data.productPageSeo.data.attributes.seo?.metaDescription || null,
      ogImage: seo.data.productPageSeo?.data.attributes.seo?.metaImage || null,
    },
  };
};
