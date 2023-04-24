import Banner from "@/components/Layout/Banner";
import {
  QUERY_CONTACT,
  QUERY_SERVICES,
  QUERY_SERVICES_MENU,
} from "@/queries/queries";
import { ContactInfoType, ServiceType } from "@/typings";
import Image from "next/image";
import { client, URL } from "../_app";
import parse from "html-react-parser";
import ContactForm from "@/components/Layout/ContactForm";
import ContactInfo from "@/components/Layout/ContactInfo";
import Head from "next/head";

interface Props {
  service: ServiceType;
  contactInfo: ContactInfoType;
}
export default function Servicii({ service, contactInfo }: Props) {
  return (
    <>
      <Head>
        <title>{service.attributes.title}</title>
        <meta
          name="description"
          content={
            service.attributes.seo[0]?.metaDescription || "Panorui solare"
          }
        />
        <meta
          name="og:description"
          content={
            service.attributes.seo[0]?.metaDescription || "Panorui solare"
          }
        />
        {service.attributes.seo[0]?.metaImage && (
          <meta
            name="og:image"
            content={service.attributes.seo[0]?.metaImage.data.attributes.url}
          />
        )}
        <meta
          name="og:title"
          content={
            service.attributes.seo[0]?.metaDescription || "Panorui solare"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Banner text={service.attributes.title} />
      <div className="bg-[#F5F3ED] py-20">
        <div className="container mx-auto grid lg:grid-cols-6 gap-[5vw] px-4">
          <div className="col-span-3 xl:col-span-4">
            <div className="relative pt-[40%]">
              <Image
                className="absolute top-0 left-0 w-full h-full rounded-xl object-cover object-top"
                src={service.attributes.ImageOne.data.attributes.url}
                alt="imagine servicii panouri solare"
                width={800}
                height={800}
              />
            </div>
            <div className="mt-14 font-light parsed-text">
              {parse(service.attributes.descriptionOne)}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-14">
              <Image
                className="grow rounded-xl"
                src={service.attributes.ImageTwo.data.attributes.url}
                alt="imagine servicii panouri solare"
                width={400}
                height={400}
              />
              <Image
                className="grow  rounded-xl"
                src={service.attributes.ImageThree.data.attributes.url}
                alt="imagine servicii panouri solare"
                width={400}
                height={400}
              />
            </div>
            <div className="mt-14 parsed-text font-light">
              {parse(service.attributes.descriptionTwo)}
            </div>
          </div>
          <div className="col-span-3 xl:col-span-2 ">
            <div className=" sticky top-28 bg-white box-shadow rounded-xl p-8">
              <ContactForm />
              <ContactInfo contactInfo={contactInfo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: QUERY_SERVICES_MENU,
  });
  const paths = data.serviciis.data.map((service: any) => ({
    params: { slug: service.attributes.slug },
  }));
  return { paths, fallback: true };
}

export const getStaticProps = async ({ params }: any) => {
  const { slug } = params;
  const [serviceData, contactInfo] = await Promise.all([
    client.query({
      query: QUERY_SERVICES,
      variables: { slug: slug },
    }),
    client.query({
      query: QUERY_CONTACT,
    }),
  ]);

  return {
    props: {
      service: serviceData.data.serviciis.data[0],
      contactInfo: contactInfo.data.contactInfo.data,
    },
  };
};
