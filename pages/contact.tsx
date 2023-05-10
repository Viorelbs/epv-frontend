import Banner from "@/components/Layout/Banner";
import ContactForm from "@/components/Layout/ContactForm";
import ContactInfo from "@/components/Layout/ContactInfo";
import { QUERY_CONTACT, QUERY_CONTACT_SEO } from "@/queries/queries";
import { ComponentSharedSeoType, ContactInfoType, SEO } from "@/typings";
import { client } from "./_app";
import Head from "next/head";

interface Props {
  contactInfo: ContactInfoType;
  contactSeo: SEO;
}
export default function Contact({ contactInfo, contactSeo }: Props) {
  console.log(contactSeo);
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta
          name="description"
          content={
            contactSeo.data?.attributes.seo?.metaDescription || "Panorui solare"
          }
        />
        <meta
          name="keywords"
          content={
            contactSeo.data?.attributes.seo?.keywords || "Panouri Solare"
          }
        />
      </Head>
      <main>
        <Banner text="Contact" />
        <div className=" bg-[#F5F3ED]">
          <div className="container mx-auto flex py-20 flex-col md:flex-row gap-10 md:gap-[5vw] px-4">
            <div className="flex-1 space-y-2 my-auto">
              <h2 className="font-medium leading-tight">
                Ai vreo intrebare?
                <br /> Nu ezita!
              </h2>
              <p className="max-w-xl !mb-6 md:!mb-16 font-light">
                Pentru orice întrebare sau nelămurire, suntem aici să te ajutăm.
                Trimite-ne un mesaj și vom reveni cât mai curând posibil!
              </p>
              <ContactInfo contactInfo={contactInfo} />
            </div>
            <div className="flex-1">
              <div className=" bg-white box-shadow rounded-xl p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const [contactInfo, contactSeo] = await Promise.all([
    client.query({
      query: QUERY_CONTACT,
    }),
    client.query({
      query: QUERY_CONTACT_SEO,
    }),
  ]);

  return {
    revalidate: 120,
    props: {
      contactInfo: contactInfo.data.contactInfo.data,
      contactSeo: contactSeo.data.contactSeo,
      ogTitle: contactSeo.data?.attributes?.seo?.metaTitle || null,
      ogDescription: contactSeo.data?.attributes?.seo?.metaDescription || null,
      ogImage: contactSeo.data?.attributes?.seo?.metaImage || null,
    },
  };
};
