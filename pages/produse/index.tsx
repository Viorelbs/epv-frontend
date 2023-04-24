import Banner from "@/components/Layout/Banner";
import ProductsGrid from "@/components/Layout/ProductsGrid";
import {
  PRODUCTS_CARDS_QUERY,
  QUERY_BRANDS,
  QUERY_CATEGORIES,
  QUERY_POWERS,
} from "@/queries/queries";
import {
  BrandsType,
  CategoryType,
  PowersType,
  ProdusCardType,
} from "@/typings";
import { client } from "../_app";

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
}
export default function Produse({
  productCard,
  categories,
  brands,
  powers,
}: Props) {
  return (
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
  );
}

export const getStaticProps = async (context: any) => {
  const { query } = context;

  const [productsData, categoriesData, brandsData, powerData] =
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
    ]);

  return {
    props: {
      productCard: productsData.data.produses,
      categories: categoriesData.data.categories,
      brands: brandsData.data.brands,
      powers: powerData.data.puteres,
    },
  };
};
