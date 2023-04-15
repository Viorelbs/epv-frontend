import { URL } from "@/pages/_app";
import { removeItem, updateQty } from "@/redux/cartReducer";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import QtyButtons from "./QtyButtons";

interface Props {
  id: string;
  image: string;
  title: string;
  quantity: number;
  price: number;
  oldPrice?: number;
}

export default function CartItem({
  id,
  image,
  title,
  quantity,
  price,
  oldPrice,
}: Props) {
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(
      updateQty({
        id: id,
        qty: qty,
      })
    );
  }, [qty]);

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  return (
    <div className="flex  justify-between border-b box-shadow rounded-xl mx-1 px-1 py-3 md:min-h-[150px]">
      <div className="relative pt-[10%] flex-[2] md:flex-1 mr-3 ">
        <Image
          onClick={() => router.push(`/produse/${title}`)}
          src={`${URL}${image}`}
          alt={"Produs in cos"}
          width={300}
          height={300}
          className="absolute top-0 left-0 w-full h-full object-contain object-center cursor-pointer"
        />
      </div>
      <div className="flex flex-[4]  justify-center flex-col gap-3 mr-5">
        <div className="flex justify-between max-w-xl md:items-center gap-[5vw] flex-col md:flex-row items-start">
          <span
            className="cursor-pointer text-sm md:text-base"
            onClick={() => router.push(`/produse/${title}`)}
          >
            {title}
          </span>
          <div className="flex flex-col gap-1 shrink-0">
            <span className="font-semibold text-sm">
              {(price * qty).toFixed(2)} Lei{" "}
            </span>
            {oldPrice ? (
              <span className="font-light line-through text-sm shrink-0">
                {(oldPrice * qty).toFixed(2)} Lei{" "}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <QtyButtons qty={qty} setQty={setQty} />
          <span
            className="text-gray-600 font-light cursor-pointer hover:text-red-500"
            onClick={() =>
              dispatch(
                removeItem({
                  id: id,
                })
              )
            }
          >
            Sterge
          </span>
        </div>
      </div>
    </div>
  );
}
