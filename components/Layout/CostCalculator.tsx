import { CostDataType } from "@/typings";
import { Button, Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

export default function CostCalculator({ data }: { data: CostDataType }) {
  const [inputRange, setInputRange] = useState<number>(500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRange(Number(e.target.value));
  };

  // Economy per year
  const economyPerYear = inputRange * 12;

  let ctaText =
    "Afla in cat timp iti amortizezi investitia in functie de costul facturii lunare";
  if (inputRange > 1000) {
    ctaText =
      "Aceasta este o sumă semnificativă de bani care ar putea fi economisită prin instalarea de panouri solare";
  }
  // if (inputRange > 2000) {
  //   ctaText = "Cauta-ne tu ca sa nu te cautam noi";
  // }
  // if (inputRange > 3000) {
  //   ctaText = "Da ce ai facut fratele meu, ai mancat kilowati d aia?";
  // }
  // if (inputRange > 4000) {
  //   ctaText = "Maluuu baaa Milogule, cum sa dai banii astia la curent";
  // }

  // Cost Est.
  const kwtPrice = data.attributes.PretKwt;
  const dailyPowerCollection = data.attributes.TimpRandamentPanouZi;

  const kwtProd = inputRange / kwtPrice;

  // Calcul instalatie pe luna la 6 ore pe zi
  const monthlyPowerBasedOnDays = dailyPowerCollection * 30;

  // Calcul Instalatie
  const instCalcul = Math.ceil(kwtProd / monthlyPowerBasedOnDays);

  // Calcul productie instalatie pe luna
  const producedKwt = instCalcul * monthlyPowerBasedOnDays;

  // Kilowati ramasi
  // const priceRemainingKwtYear = (producedKwt - kwtProd) * 0.8 * 12;

  // Calcul instalatie electrica
  const panelsPrice = instCalcul * 6000;

  // Pret total + economisire ca prosumator
  // const totalEconomyPrice = economyPerYear + priceRemainingKwtYear;
  const totalEconomyPrice = economyPerYear;

  // Amortizare
  const amortizare = (panelsPrice / totalEconomyPrice).toFixed(2);
  // console.log(panelsPrice, totalEconomyPrice, priceRemainingKwtYear);

  // Text tooltip
  const TooltipText = (
    <p className="text-base text-white ">
      Menționăm că acest calcul este o estimare aproximativă care se axează doar
      pe panourile solare și se bazează pe următoarele date:
      <ul className="mt-1">
        <li className="text-gray-300">
          Cost Kilowat - <span className="text-white"> {kwtPrice} lei</span>
        </li>
        <li className="text-gray-300">
          Timp randament panou -
          <span className="text-white">{dailyPowerCollection} ore/zi</span>
        </li>
      </ul>
    </p>
  );
  return (
    <div className="py-14 md:py-24 lg:py-32 px-4 bg-[#F5F3ED] flex flex-col items-center">
      <div className="max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="mb-3">Ce cost lunar ai cu energia electrica?</h2>
          <p>{ctaText} </p>
        </div>
        <div className="max-w-5xl w-full">
          <div className="flex justify-between">
            <label
              htmlFor="steps-range"
              className="block text-xl mb-4 font-medium text-gray-900 "
            >
              {inputRange} Lei / Luna
            </label>
            <Tooltip
              content={TooltipText}
              className="min-w-[280px] max-w-[80vw] lg:max-w-[600px]"
            >
              <Button className="p-0 h-fit text-black bg-transparent !shadow-none outline-none  ">
                <AiFillExclamationCircle className="w-6 h-6" />
              </Button>
            </Tooltip>
          </div>
          <input
            id="steps-range"
            type="range"
            min="100"
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
            <h4 className="flex gap-1 items-center">Economisire intr-un an </h4>
            <span className="text-[#02C60A] text-[22px] md:text-[30px] font-semibold">
              {economyPerYear.toLocaleString("RO")} Lei
            </span>
          </div>
          <div className="bg-white p-4 rounded-xl w-full">
            <h4>Cost estimativ panouri</h4>
            {/* <h4>Kilowati consumati</h4> */}
            <span className="text-[#02C60A] text-[22px] md:text-[30px] font-semibold">
              {/* {kwtProd} <br /> */}
              {/* Rotunjit in sus tot timpul */}
              {(instCalcul < 3 ? 3 * 6000 : instCalcul * 6000).toLocaleString(
                "RO"
              )}{" "}
              Lei
            </span>
          </div>
          <div className="bg-white p-4 rounded-xl w-full">
            <h4>Amortizare in</h4>
            <span className="text-[#02C60A] text-[22px] md:text-[30px] font-semibold">
              {amortizare} ani
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4 items-center">
        <Link href="/contact">
          <button className="btn-primary">Cere Oferta</button>
        </Link>
      </div>
    </div>
  );
}
