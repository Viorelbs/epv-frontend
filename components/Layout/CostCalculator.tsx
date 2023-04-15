import { Slider } from "@mui/material";
import { useState } from "react";

export default function CostCalculator() {
  const [inputRange, setInputRange] = useState<number>(500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRange(Number(e.target.value));
  };

  const economyPerYear = inputRange * 12;

  let ctaText = "";
  if (inputRange > 1000) {
    ctaText = "Probabil ai nevoie sa ne suni";
  }
  if (inputRange > 2000) {
    ctaText = "Cauta-ne tu ca sa nu te cautam noi";
  }
  if (inputRange > 3000) {
    ctaText = "Da ce ai facut fratele meu, ai mancat kilowati d aia?";
  }
  if (inputRange > 4000) {
    ctaText = "Maluuu baaa Milogule, cum sa dai banii astia la curent";
  }

  return (
    <div className="py-14 md:py-24 lg:py-32 px-4 bg-[#F5F3ED] flex flex-col items-center">
      <div className="max-w-5xl">
        <div className="text-center mb-10">
          <h2>Ce cost lunar ai cu energia electrica?</h2>
          <p>
            Afla in cat timp iti amortizezi investitia in functie de veniturile
            lunare
          </p>
        </div>
        <div className="max-w-5xl w-full">
          <label
            htmlFor="steps-range"
            className="block text-xl mb-4 font-medium text-gray-900  dark:text-white"
          >
            {inputRange} Lei / Luna
          </label>
          <input
            id="steps-range"
            type="range"
            min="0"
            max="5000"
            onChange={handleChange}
            value={inputRange}
            step="100"
            className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500
            rounded-lg appearance-none cursor-pointer "
          />
        </div>
        <div className="flex gap-4 md:gap-10 mt-10 w-full flex-wrap md:flex-nowrap">
          <div className="bg-white p-4 rounded-xl w-full">
            <h3>Economisire intr-un an</h3>
            <span className="text-[#02C60A] text-[22px] md:text-[30px] font-semibold">
              {economyPerYear} Lei
            </span>
          </div>
          <div className="bg-white p-4 rounded-xl w-full">
            <h3>Cost estimativ</h3>
            <span className="text-[#02C60A] text-[22px] md:text-[30px] font-semibold">
              35000 Lei
            </span>
          </div>
          <div className="bg-white p-4 rounded-xl w-full">
            <h3>Amortizare in</h3>
            <span className="text-[#02C60A] text-[22px] md:text-[30px] font-semibold">
              6 ani
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4 items-center">
        <button className="btn-primary  ">Cere Oferta</button>
        <span className="text-xl">{ctaText}</span>
      </div>
    </div>
  );
}
