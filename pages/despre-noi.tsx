import AboutSectionFour from "@/components/Layout/AboutSectionFour";
import AboutSectionOne from "@/components/Layout/AboutSectionOne";
import AboutSectionThree from "@/components/Layout/AboutSectionThree";
import AboutSectionTwo from "@/components/Layout/AboutSectionTwo";
import Banner from "@/components/Layout/Banner";
import Questions from "@/components/Layout/Questions";
import {
  QUERY_ABOUT_S_FOUR,
  QUERY_ABOUT_S_ONE,
  QUERY_ABOUT_S_THREE,
  QUERY_ABOUT_S_TWO,
  QUERY_QA,
} from "@/queries/queries";
import {
  AboutSectionFourType,
  AboutSectionOneType,
  AboutSectionThreeType,
  AboutSectionTwoType,
  qaSectionType,
  QuestionsType,
} from "@/typings";
import { client } from "./_app";
import Head from "next/head";

interface Props {
  sectionOne: AboutSectionOneType;
  sectionTwo: AboutSectionTwoType;
  sectionThree: AboutSectionThreeType;
  sectionFour: AboutSectionFourType;
  qaSection: {
    data: qaSectionType;
  };
  questions: {
    data: QuestionsType[];
  };
}
export default function About({
  sectionOne,
  sectionTwo,
  sectionThree,
  sectionFour,
  questions,
}: Props) {
  return (
    <>
      <Head>
        <title>Despre Noi</title>
        <meta
          name="description"
          content={
            sectionOne.data?.attributes.seo?.metaDescription || "Panorui solare"
          }
        />
        <meta
          name="keywords"
          content={sectionOne.data.attributes.seo?.keywords || "Panouri Solare"}
        />
        <meta
          property="og:description"
          content={
            sectionOne.data?.attributes.seo?.metaDescription || "Panorui solare"
          }
        />
        {sectionOne.data?.attributes.seo?.metaImage && (
          <meta
            property="og:image"
            content={
              sectionOne.data.attributes.seo?.metaImage.data?.attributes.url
            }
          />
        )}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

        <meta
          property="og:title"
          content={
            sectionOne.data?.attributes.seo?.metaDescription || "Panorui solare"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="space-y-20 mb-20">
        <Banner text="Despre Noi" />
        <AboutSectionOne
          title={sectionOne.data.attributes.title}
          description={sectionOne.data.attributes.description}
          panelsNumber={sectionOne.data.attributes.panelsNumber}
          projectsNumber={sectionOne.data.attributes.projectsNumber}
          imageOne={sectionOne.data.attributes.ImageOne}
          imageTwo={sectionOne.data.attributes.ImageTwo}
        />
        <AboutSectionTwo
          title={sectionTwo.data.attributes.title}
          description={sectionTwo.data.attributes.descriptionOne}
          image={sectionTwo.data.attributes.image.data.attributes.url}
        />
        <AboutSectionThree
          title={sectionThree.data.attributes.titlu}
          descriptionOne={sectionThree.data.attributes.descriptionOne}
          descriptionTwo={sectionThree.data.attributes.descriptionTwo}
        />
        <AboutSectionFour
          title={sectionFour.data.attributes.title}
          description={sectionFour.data.attributes.description}
          imageOne={sectionFour.data.attributes.imageOne.data.attributes.url}
          imageTwo={sectionFour.data.attributes.imageTwo.data.attributes.url}
        />
        <Questions questions={questions.data} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const [sectionOne, sectionTwo, sectionThree, sectionFour, questions] =
    await Promise.all([
      client.query({
        query: QUERY_ABOUT_S_ONE,
      }),
      client.query({
        query: QUERY_ABOUT_S_TWO,
      }),
      client.query({
        query: QUERY_ABOUT_S_THREE,
      }),
      client.query({
        query: QUERY_ABOUT_S_FOUR,
      }),

      client.query({
        query: QUERY_QA,
      }),
    ]);

  return {
    props: {
      sectionOne: sectionOne.data.aboutSOne,
      sectionTwo: sectionTwo.data.aboutSTwo,
      sectionThree: sectionThree.data.aboutSThree,
      sectionFour: sectionFour.data.aboutSFour,
      questions: questions.data.intrebaris,
    },
  };
}
