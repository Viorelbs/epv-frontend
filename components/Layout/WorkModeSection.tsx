import HTMLReactParser from "html-react-parser";
import React from "react";
import BasicCard from "./BasicCard";

interface Props {
  title: string;
  titleIconOne: string;
  titleIconTwo: string;
  titleIconThree: string;
  titleIconFour: string;
  textIconOne: string;
  textIconTwo: string;
  textIconThree: string;
  textIconFour: string;
  iconOneUrl: string;
  iconTwoUrl: string;
  iconThreeUrl: string;
  iconFourUrl: string;
}

export default function WorkModeSection({
  title,
  titleIconOne,
  titleIconTwo,
  titleIconThree,
  titleIconFour,
  textIconOne,
  textIconTwo,
  textIconThree,
  textIconFour,
  iconOneUrl,
  iconTwoUrl,
  iconThreeUrl,
  iconFourUrl,
}: Props) {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center mb-10">{HTMLReactParser(title)}</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2  gap-10">
        <BasicCard
          title={titleIconOne}
          text={textIconOne}
          iconUrl={iconOneUrl}
        />
        <BasicCard
          title={titleIconTwo}
          text={textIconTwo}
          iconUrl={iconTwoUrl}
        />
        <BasicCard
          title={titleIconThree}
          text={textIconThree}
          iconUrl={iconThreeUrl}
        />
        <BasicCard
          title={titleIconFour}
          text={textIconFour}
          iconUrl={iconFourUrl}
        />
      </div>
    </div>
  );
}
