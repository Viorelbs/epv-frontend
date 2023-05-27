import HTMLReactParser from "html-react-parser";
import Rating from "../Common/Rating";

interface Props {
  name: string;
  email: string;
  rating: number;
  review: string;
  date: string;
}

export const timeformat: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour12: false,
};
export default function ReviewItem({
  name,
  email,
  rating,
  review,
  date,
}: Props) {
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", timeformat);
  }

  const formatedDate = formatDate(date);

  return (
    <div className="border-b py-3">
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <span className="text-[15px] text-gray-400">{formatedDate}</span>
      </div>
      <div className="my-2 text-[16px]">{HTMLReactParser(review)}</div>
      <Rating rating={rating} />
    </div>
  );
}
