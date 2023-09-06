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
  MetaImage,
  PartenersTypes,
  PowersType,
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
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

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
  ogImage: MetaImage;
  ogDescription: string;
  ogTitle: string;
}

export default function Home({
  hero,
  hpSection,
  parteners,
  reviews,
  questions,
  categories,
  brands,
  powers,
  seo,
  calcData,
  ogImage,
  ogTitle,
  ogDescription,
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

  console.log(data, error);

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
          products={data && data.produses}
          filters={true}
          categories={categories}
          brands={brands}
          powers={powers}
          pageSize={12}
        />
        <SimpleSection
          title={hpSection.data.attributes.titlu}
          description={hpSection.data.attributes.Descriere}
          bigImage={hpSection.data.attributes.ImagineMare}
          smallImage={hpSection.data.attributes.ImagineMica}
          partenersList={parteners.data.attributes.parteneri.data}
        />
        <div className="py-24 lg:py-32">
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
              target="_blank"
              href="https://www.google.com/search?cs=1&hl=ro-RO&output=search&q=EPV+Infinity&ludocid=3615229886403576383&gsas=1&client=ms-android-samsung-gs-rev1&lsig=AB86z5Wu49kF4Fy2Oe45aE3Nnhww&kgs=e5cdd1207425f6e7&shndl=-1&shem=ncc&source=sh/x/kp/local/4&bshm=ncc/1"
              className="mt-10 block text-center font-medium underline text-[20px]"
            >
              Vezi toate recenziile
            </Link>
          </div>
        </div>
        <div className="mt-20 ">
          <Questions questions={questions.data} />
        </div>
      </main>
    </>
  );
}
export const getStaticProps = async () => {
  const [
    hero,
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
    revalidate: 5, // In seconds
    props: {
      hero: hero.data.hero,
      hpSection: hpSection.data.simpleSectionHome,
      parteners: parteners.data.parteneri,
      reviews: reviews.data.reviews,
      questions: questions.data.intrebaris,
      categories: categoriesData.data.categorieProduses,
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
