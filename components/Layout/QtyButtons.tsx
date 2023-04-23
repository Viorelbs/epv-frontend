import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Props {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
}
export default function QtyButtons({ qty, setQty }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredQty = Number(e.target.value);
    if (enteredQty <= 0 || isNaN(enteredQty)) {
      setQty(1);
    } else if (enteredQty > 99) {
      setQty(99);
    } else {
      setQty(enteredQty);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key >= 0 && e.key <= 9) {
      const value = parseInt(e.target.value + e.key);
      if (value > 99) {
        e.preventDefault();
      }
    }
  };

  const adjustCount = (amount: number) => {
    if (amount > 0 && qty < 99) {
      setQty((currentQty) => currentQty + amount);
    } else if (amount < 0 && qty > 1) {
      setQty((currentQty) => currentQty + amount);
    }
  };

  return (
    <div className="flex  text-xl ">
      <AiOutlineMinus
        className={`qty-btn ${
          qty === 1 && "text-gray-400 hover:bg-gray-100 hover:text-gray-400"
        }`}
        onClick={() => adjustCount(-1)}
      />
      <input
        type="number"
        value={qty}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className="max-w-[40px] md:max-w-[50px] text-center bg-transparent"
        max={99}
        min={1}
      />
      <AiOutlinePlus
        className={`qty-btn ${
          qty === 99 && "text-gray-400 hover:bg-gray-100 hover:text-gray-400"
        }`}
        onClick={() => adjustCount(1)}
      />
    </div>
  );
}
