import { URL } from "@/pages/_app";
import { ImageType, QuestionsType } from "@/typings";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface QuestionAttributes {
  intrebare: string;
  raspuns: string;
}

interface Question {
  attributes: QuestionAttributes;
}

interface Props {
  questions: Question[];
}

export default function Questions({ questions }: Props) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  return (
    <div className="mb-24 lg:mb-32">
      <div className="container mx-auto px-4">
        <h2>Intrebari frecvente</h2>
        <p className="font-light">Află ce si cum</p>
        <div className="w-full mt-8 overflow-auto max-h-[700px]">
          {questions.map((question, index) => (
            <Accordion
              open={open === index}
              animate={customAnimation}
              key={index}
            >
              <AccordionHeader
                onClick={() => handleOpen(index)}
                style={{ textAlign: "start" }}
              >
                {question.attributes.intrebare}
              </AccordionHeader>
              <AccordionBody>
                <div className=" pl-3 text-[18px] text-gray-600 dark:text-gray-300">
                  {HTMLReactParser(question.attributes.raspuns)}
                </div>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
