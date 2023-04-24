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
  PowersType,
  ProdusCardType,
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
  seo: any;
}
export default function Produse({
  productCard,
  categories,
  brands,
  powers,
  seo,
}: Props) {
  console.log(seo);
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta
          name="description"
          content={
            seo.data.attributes.seo[0]?.metaDescription || "Panorui solare"
          }
        />
        <meta
          name="og:description"
          content={
            seo.data.attributes.seo[0]?.metaDescription || "Panorui solare"
          }
        />
        {seo.data.attributes.seo[0]?.metaImage && (
          <meta
            name="og:image"
            content={seo.data.attributes.seo[0]?.metaImage.data.attributes.url}
          />
        )}
        <meta
          name="og:title"
          content={
            seo.data.attributes.seo[0]?.metaDescription || "Panorui solare"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Banner text="Produse" />

        <ProductsGrid
          products={productCard}
          filters={true}
          categories={categories}
          brands={brands}
          powers={powers}
        />
      </main>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { query } = context;

  const [productsData, categoriesData, brandsData, powerData, seo] =
    await Promise.all([
      client.query({
        query: PRODUCTS_CARDS_QUERY,
        variables: {
          catId:
            query.cat?.length === 0
              ? undefined
              : query.cat?.split(",").map(Number) || undefined,
          pageIdx: Number(query.page) || 1,
          size: 8,
          sort: query.sort || "createdAt:desc",
          brandId: query?.cat?.includes(2)
            ? undefined
            : query.brand?.length === 0
            ? undefined
            : query.brand?.split(",").map(Number) || undefined,
          putereId: query?.cat?.includes(2)
            ? undefined
            : query.powers?.length === 0
            ? undefined
            : query.powers?.split(",").map(Number) || undefined,
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
    },
  };
};
