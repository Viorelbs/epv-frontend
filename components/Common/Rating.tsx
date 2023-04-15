import { StarFill, StarHalf, Star as StarEmpty } from "react-bootstrap-icons";
import uniqid from "uniqid";

interface Props {
  rating: number | any;
}

function Rating({ rating }: Props) {
  const starList = [];
  const starFillCount = Math.floor(rating);
  const hasHalfStar = rating - parseInt(rating) >= 0.5;
  const emptyStarCount = 5 - starFillCount - (hasHalfStar ? 1 : 0);

  for (let i = 1; i <= starFillCount; i++) {
    starList.push(<StarFill key={"star-fill" + i}></StarFill>);
  }

  if (hasHalfStar) {
    starList.push(<StarHalf key={"star-half" + uniqid()} />);
  }

  for (let i = 1; i <= emptyStarCount; i++) {
    if (emptyStarCount) {
      starList.push(<StarEmpty key={"star-empty" + i}></StarEmpty>);
    }
  }

  return (
    <div className="flex items-center text-[orange]">
      {starList}{" "}
      <span className="ml-2 text-black font-light text-[14px]">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default Rating;
