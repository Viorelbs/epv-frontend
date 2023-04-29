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
          property="og:description"
          content={
            contactSeo.data?.attributes.seo?.metaDescription || "Panorui solare"
          }
        />
        {contactSeo.data?.attributes.seo?.metaImage && (
          <meta
            property="og:image"
            content={
              contactSeo.data?.attributes.seo?.metaImage.data?.attributes.url
            }
          />
        )}
        <meta
          property="og:title"
          content={
            contactSeo.data?.attributes.seo?.metaDescription || "Panorui solare"
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta
          name="keywords"
          content={
            contactSeo.data?.attributes.seo?.keywords || "Panouri Solare"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
                Mauris eu nisi eget nisi imperdiet vestibulum. Nunc sodales
                vehicula risus. Suspendisse id mauris sodales, blandit tortor
                eu, sodales justo.
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
    props: {
      contactInfo: contactInfo.data.contactInfo.data,
      contactSeo: contactSeo.data.contactSeo,
    },
  };
};
