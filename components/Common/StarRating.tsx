import { StarFill, StarHalf, Star as StarEmpty } from "react-bootstrap-icons";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export function StarRating({ value, onChange }: StarRatingProps) {
  const handleClick = (newValue: number) => {
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <span className="font-medium">Rating:</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((index) => {
          const filled = value >= index;
          const halfFilled = value >= index - 0.5 && value < index;
          const Icon = filled ? StarFill : halfFilled ? StarHalf : StarEmpty;
          return (
            <Icon
              key={index}
              onClick={() => handleClick(index)}
              className={`cursor-pointer text-lg ${
                filled ? "text-orange-500" : null
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
