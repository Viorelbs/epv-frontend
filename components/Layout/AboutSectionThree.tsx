import HTMLReactParser from "html-react-parser";

interface Props {
  title: string;
  descriptionOne: string;
  descriptionTwo: string;
}

export default function AboutSectionThree({
  title,
  descriptionOne,
  descriptionTwo,
}: Props) {
  return (
    <div className="bg-[#F7CD1F]  !mt-0">
      <div className="container mx-auto pb-[70px] px-4">
        <h2>{title}</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <p>{HTMLReactParser(descriptionOne)}</p>
          <p>{HTMLReactParser(descriptionTwo)}</p>
        </div>
      </div>
    </div>
  );
}
