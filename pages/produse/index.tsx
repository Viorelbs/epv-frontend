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
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Loader from "@/components/Common/Loader";

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
  const router = useRouter();
  const { query } = router;

  const { loading, error, data } = useQuery(PRODUCTS_CARDS_QUERY, {
    client: client,
    variables: {
      catId:
        query?.cat?.length === 0
          ? undefined
          : Array.isArray(query?.cat)
          ? query?.cat.map(Number)
          : query?.cat?.split(",").map(Number) || undefined,
      pageIdx: Number(query?.page) || 1,
      size: 12,
      sort: query?.sort || "createdAt:desc",
      brandId: query?.cat?.includes("2")
        ? undefined
        : query?.brand?.length === 0
        ? undefined
        : Array.isArray(query?.brand)
        ? query?.brand.map(Number)
        : query?.brand?.split(",").map(Number) || undefined,
      putereId: query?.cat?.includes("2")
        ? undefined
        : query?.power?.length === 0
        ? undefined
        : Array.isArray(query?.power)
        ? query?.power.map(Number)
        : query?.power?.split(",").map(Number) || undefined,
    },
  });

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
          products={data && data.produses}
          filters={true}
          categories={categories}
          brands={brands}
          powers={powers}
          pageSize={12}
        />
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const [categoriesData, brandsData, powerData, seo] = await Promise.all([
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
    revalidate: 5, // In seconds
    props: {
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
