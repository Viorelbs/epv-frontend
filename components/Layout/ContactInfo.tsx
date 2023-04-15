import { ContactInfoType } from "@/typings";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

interface Props {
  contactInfo: ContactInfoType;
}
export default function ContactInfo({ contactInfo }: Props) {
  return (
    <div className="space-y-2 my-6 w-fit ">
      <h4 className="text-xl font-medium">Informatii Contact</h4>
      <a
        href={`mailto:${contactInfo.attributes.Email}`}
        className="gap-4 flex items-center hover:text-orange-500 text-lg"
      >
        <AiOutlineMail className="shrink-0" />
        {contactInfo.attributes.Email}
      </a>
      <a
        href={`tel:${contactInfo.attributes.PhoneNrOne}`}
        className="gap-4 flex items-center hover:text-orange-500 text-lg"
      >
        <FiPhoneCall className="shrink-0" />
        {contactInfo.attributes.PhoneNrOne}
      </a>
      {contactInfo.attributes.PhoneNrTwo && (
        <a
          href={`tel:${contactInfo.attributes.PhoneNrTwo}`}
          className="gap-4 flex items-center hover:text-orange-500 text-lg"
        >
          <FiPhoneCall className="shrink-0" />
          {contactInfo.attributes.PhoneNrTwo}
        </a>
      )}
      <a
        target="_blank"
        href={contactInfo.attributes.Location}
        className="gap-4 flex items-center hover:text-orange-500 text-lg"
      >
        <HiOutlineLocationMarker className="shrink-0" />
        Strada Victoriei, Strejnicu 107592
      </a>
    </div>
  );
}
