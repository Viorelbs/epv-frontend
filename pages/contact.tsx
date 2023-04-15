import Banner from "@/components/Layout/Banner";
import ContactForm from "@/components/Layout/ContactForm";
import ContactInfo from "@/components/Layout/ContactInfo";
import { QUERY_CONTACT } from "@/queries/queries";
import { ContactInfoType } from "@/typings";
import { client } from "./_app";

interface Props {
  contactInfo: ContactInfoType;
}
export default function Contact({ contactInfo }: Props) {
  console.log(contactInfo);
  return (
    <div>
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
              vehicula risus. Suspendisse id mauris sodales, blandit tortor eu,
              sodales justo.
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
    </div>
  );
}

export const getServerSideProps = async () => {
  const contactInfo = await client.query({
    query: QUERY_CONTACT,
  });

  return {
    props: {
      contactInfo: contactInfo.data.contactInfo.data,
    },
  };
};
