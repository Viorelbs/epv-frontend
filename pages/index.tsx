import CostCalculator from "@/components/Layout/CostCalculator";
import Hero from "@/components/Layout/Hero";
import ProductsGrid from "@/components/Layout/ProductsGrid";
import Questions from "@/components/Layout/Questions";
import SimpleSection from "@/components/Layout/SimpleSection";
import Testimonial from "@/components/Layout/Testimonials";
import {
  PRODUCTS_CARDS_QUERY,
  QUERY_BRANDS,
  QUERY_CALC,
  QUERY_CATEGORIES,
  QUERY_HERO,
  QUERY_HOME_SEO,
  QUERY_PARTENERS,
  QUERY_POWERS,
  QUERY_QA,
  QUERY_REVIEWS,
  QUERY_SIMPLE_SECTION_HP,
} from "@/queries/queries";
import {
  BrandsType,
  CategoryType,
  CostDataType,
  HeroType,
  PartenersTypes,
  PowersType,
  ProdusCardType,
  qaSectionType,
  QuestionsType,
  Review,
  SEO,
  SimpleSectionType,
} from "@/typings";
import Head from "next/head";
import Link from "next/link";
import { client } from "./_app";
import { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import useWidth from "@/hooks/useWidth";

interface Props {
  hero: {
    data: HeroType;
  };
  hpSection: {
    data: SimpleSectionType;
  };
  parteners: { data: PartenersTypes };
  reviews: { data: Review[] };
  qaSection: {
    data: qaSectionType;
  };
  questions: {
    data: QuestionsType[];
  };

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
  calcData: CostDataType;
}

export default function Home({
  hero,
  hpSection,
  parteners,
  reviews,
  questions,
  productCard,
  categories,
  brands,
  powers,
  seo,
  calcData,
}: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const { windowWidth } = useWidth();

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>EPV Infinity</title>
        {/* HTML Meta Tags */}
        <meta
          name="description"
          content={
            seo.data?.attributes.seo?.metaDescription || "Panorui solare"
          }
        />
        <meta
          name="keywords"
          content={seo.data?.attributes.seo?.keywords || "Panouri Solare"}
        />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main>
        <Hero
          bgVideo={hero.data.attributes.backgroundVideo.data.attributes.url}
          title={hero.data.attributes.titlu}
          description={hero.data.attributes.descriere}
          image={hero.data.attributes.MobileImage?.data.attributes.url}
        />

        <CostCalculator data={calcData} />

        <ProductsGrid
          products={productCard}
          filters={false}
          categories={categories}
          brands={brands}
          powers={powers}
        />
        <SimpleSection
          title={hpSection.data.attributes.titlu}
          description={hpSection.data.attributes.Descriere}
          bigImage={hpSection.data.attributes.ImagineMare}
          smallImage={hpSection.data.attributes.ImagineMica}
          partenersList={parteners.data.attributes.parteneri.data}
        />
        {/* <div className="py-24 lg:py-32">
          <div className="container mx-auto">
            <h2 className="text-center mb-8">
              Clienții ne recomandă cu încredere
            </h2>
            <div className="relative">
              <div
                ref={rowRef}
                className="flex items-center scrollbar-hide space-x-3 overflow-x-scroll md:space-x-5 md:p-2 px-4"
              >
                {reviews.data.map((review) => (
                  <Testimonial
                    key={review.id}
                    name={review.attributes.NumeClient}
                    avatarPhoto={review.attributes.avatar}
                    rating={review.attributes.Rating}
                    date={review.attributes.DataRecenzie}
                    content={review.attributes.DescriereRecenzie}
                  />
                ))}
              </div>

              {windowWidth > 767 ? (
                <div className="flex justify-center gap-4 mt-6">
                  <AiOutlineLeft
                    onClick={() => handleClick("left")}
                    className=" h-8 w-8 cursor-pointer  transition  group-hover:opacity-100 text-black bg-gray-200 p-2 rounded-lg hover:bg-[#f7cd1f] 
                  "
                  />
                  <AiOutlineRight
                    onClick={() => handleClick("right")}
                    className="h-8 w-8 cursor-pointer  transition  group-hover:opacity-100 text-black bg-gray-200 p-2 rounded-lg hover:bg-[#f7cd1f] "
                  />
                </div>
              ) : null}
            </div>
            <Link
              href="#"
              className="mt-10 block text-center font-medium underline text-[20px]"
            >
              Vezi toate recenziile
            </Link>
          </div>
        </div> */}
        <div className="mt-20 ">
          <Questions questions={questions.data} />
        </div>
      </main>
    </>
  );
}
export const getStaticProps = async (context: any) => {
  const { query } = context;

  const [
    hero,
    productsData,
    categoriesData,
    brandsData,
    powerData,
    parteners,
    hpSection,
    reviews,
    questions,
    seo,
    calcData,
  ] = await Promise.all([
    client.query({
      query: QUERY_HERO,
    }),
    client.query({
      query: PRODUCTS_CARDS_QUERY,
      variables: {
        catId:
          query?.cat?.length === 0
            ? undefined
            : query?.cat?.split(",").map(Number) || undefined,
        pageIdx: Number(query?.page) || 1,
        size: 8,
        sort: query?.sort || "createdAt:desc",
        brandId:
          query?.cat?.includes(2) || query?.brand?.length === 0
            ? undefined
            : query?.brand?.split(",").map(Number) || undefined,
        putereId:
          query?.cat?.includes(2) || query?.powers?.length === 0
            ? undefined
            : query?.powers?.split(",").map(Number) || undefined,
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
      query: QUERY_PARTENERS,
    }),
    client.query({
      query: QUERY_SIMPLE_SECTION_HP,
    }),
    client.query({
      query: QUERY_REVIEWS,
    }),
    client.query({
      query: QUERY_QA,
    }),
    client.query({
      query: QUERY_HOME_SEO,
    }),
    client.query({
      query: QUERY_CALC,
    }),
  ]);

  return {
    props: {
      hero: hero.data.hero,
      hpSection: hpSection.data.simpleSectionHome,
      parteners: parteners.data.parteneri,
      reviews: reviews.data.reviews,
      questions: questions.data.intrebaris,
      productCard: productsData.data.produses,
      categories: categoriesData.data.categories,
      brands: brandsData.data.brands,
      powers: powerData.data.puteres,
      seo: seo.data.homepageSeo,
      ogTitle: seo.data.homepageSeo.data.attributes.seo?.metaTitle,
      ogDescription: seo.data.homepageSeo.data.attributes.seo?.metaDescription,
      ogImage: seo.data.homepageSeo.data.attributes.seo?.metaImage,
      calcData: calcData.data.costCalculator.data,
    },
  };
};
