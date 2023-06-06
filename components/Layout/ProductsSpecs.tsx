import { Review } from "@/typings";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ReviewForm from "./ReviewForm";
import ReviewsItem from "./ReviewItem";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import HTMLReactParser from "html-react-parser";

type Tab = "descriere" | "informatii" | "recenzii" | "";

interface Props {
  desc: string;
  spec: string;
  id: number;
  reviews: Review[];
}

export default function ProductsSpecs({ desc, spec, id, reviews }: Props) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };
  return (
    <>
      <Accordion open={open === 1} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Descriere
        </AccordionHeader>
        <AccordionBody>{HTMLReactParser(desc)}</AccordionBody>
      </Accordion>
      <Accordion open={open === 2} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Specificații
        </AccordionHeader>
        <AccordionBody>{HTMLReactParser(spec)}</AccordionBody>
      </Accordion>
      <Accordion open={open === 3} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Recenzii
        </AccordionHeader>
        <AccordionBody>
          <div className="text-[18px] text-gray-600 dark:text-gray-300 ">
            {<ReviewForm prodId={id} />}

            {reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <ReviewsItem
                  key={idx}
                  name={review.attributes.NumeUtilizator}
                  email={review.attributes.EmailUtilizator}
                  rating={review.attributes.Rating}
                  review={review.attributes.Recenzie}
                  date={review.attributes.createdAt}
                />
              ))
            ) : (
              <p className="mt-8 text-gray-400 font-light">
                Inca nu a fost adaugată nicio recenzie acestui produs
              </p>
            )}
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );
}
