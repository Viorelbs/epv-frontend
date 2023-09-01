import { IconButton } from "@material-tailwind/react";
import React, { useState } from "react";

interface Props {
  handleChange: (value: number) => void;
  count: number;
}

export default function Pagination({ handleChange, count }: Props) {
  const [active, setActive] = useState(1);

  const paginationItems = Array.from(
    { length: count },
    (_, index) => index + 1
  );
  const assignHandleChange = (idx: number) => {
    setActive(idx);
    handleChange(idx);
  };

  return (
    <div className="flex items-center gap-2">
      {paginationItems.map((item, idx) => (
        <IconButton
          key={idx}
          variant={`${active === idx + 1 ? "filled" : "outlined"}`}
          onClick={() => assignHandleChange(idx + 1)}
          color="amber"
        >
          {idx + 1}
        </IconButton>
      ))}
    </div>
  );
}
