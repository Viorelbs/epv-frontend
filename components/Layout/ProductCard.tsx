import { URL } from "@/pages/_app";
import { setCart } from "@/redux/cartOpen";
import { addToCart } from "@/redux/cartReducer";
import { addFav, removeFav } from "@/redux/favouritesReducer";
import { RootState } from "@/redux/store";
import { ProdusCardType, Review } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Rating from "../Common/Rating";
import useWidth from "@/hooks/useWidth";
import Stock from "./Stock";

interface Props {
  productName: string;
  price: number;
  oldPrice: number;
  warranty: number | null;
  slug: string;
  stock: number;
  productImages: {
    data: {
      attributes: {
        url: string;
      };
    }[];
  };
  rating: {
    data: Review[];
  };
  id: number;
}

export default function ProductCard({
  productName,
  price,
  oldPrice,
  productImages,
  rating,
  warranty,
  id,
  stock,
  slug,
}: Props) {
  const url = productImages.data[0].attributes.url;
  const discount = ((price - oldPrice) / oldPrice) * 100;
  const formattedDiscount = Math.abs(discount).toFixed(0) + "%";
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState(false);
  const sumRatings = rating.data.reduce(
    (acc: number, review: Review) => acc + review.attributes.Rating,
    0
  );
  const { windowWidth } = useWidth();
  const ratingLength = rating.data.length;
  const averageRating = sumRatings / ratingLength;
  const favProducts = useSelector((state: RootState) => state.favourite);

  const handleFavourite = () => {
    if (favourite) {
      toast.error(
        <span className="md:text-base text-sm">
          Produsu{" "}
          <strong className="max-w-[50px] text-ellipsis overflow-hidden">
            {productName}
          </strong>{" "}
          a fost eliminat din lista de favorite
        </span>,
        {
          duration: 1500,
          position: "bottom-center",
          ariaProps: {
            role: "status",
            "aria-live": "assertive",
          },
        }
      ),
        dispatch(
          removeFav({
            id: id,
          })
        );
    } else {
      toast.success(
        <span className="md:text-base text-sm">
          Produsu{" "}
          <strong className="max-w-[50px] text-ellipsis overflow-hidden">
            {productName}
          </strong>{" "}
          a fost adaugat in lista de favorite
        </span>,
        {
          duration: 1500,
          position: "bottom-center",
          ariaProps: {
            role: "status",
            "aria-live": "assertive",
          },
        }
      ),
        dispatch(
          addFav({
            productName: productName,
            stock: stock,
            price: price,
            oldPrice: oldPrice,
            productImages: productImages,
            rating: rating,
            id: id,
            slug: slug,
          })
        );
    }
  };

  useEffect(() => {
    const prod = favProducts.products.filter(
      (item: ProdusCardType) => item.id === id
    );
    prod.length !== 0 ? setFavourite(true) : setFavourite(false);
  }, [favProducts]);
  const handleCart = (
    id: number,
    productName: string,
    image: string,
    price: number,
    oldPrice: number
  ) => {
    if (stock === 0) {
      alert("Produsul nu se afla in stock");
      return;
    }
    dispatch(
      addToCart({
        id: id,
        title: productName,
        image: image,
        price: price,
        oldPrice: oldPrice,
        slug: slug,
        qty: 1,
      })
    );
    dispatch(
      setCart({
        open: true,
      })
    );
  };
  return (
    <div className="product-card group box-shadow rounded-xl flex flex-col p-3 relative">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            maxWidth: "700px",
          },
        }}
      />

      {oldPrice && (
        <span className="absolute left-0 top-0 bg-[#0DC97A] text-white px-3 md:px-5 py-2 rounded-tl-lg rounded-br-lg text-sm md:text-base">
          {formattedDiscount}
        </span>
      )}

      <Link href={`/produse/${slug}`}>
        <div className="relative cursor-pointer pt-[80%]  ">
          <Image
            className="absolute top-0 transition-transform duration-300 ease-out  transform-gpu group-hover:scale-[1.03] left-0 w-full h-full object-contain -z-10"
            src={url}
            alt="product image"
            width={200}
            height={200}
          />
        </div>
      </Link>

      <div className="border-t border-gray-400 pt-3 mt-6 grow flex flex-col ">
        <div className="flex gap-2 items-center flex-wrap">
          <Stock stock={stock} variant="text" />
          {warranty && warranty > 3 ? (
            <span className=" left-0 bottom-10 bg-orange-700 text-white px-3 md:px-2 py-1 rounded-lg text-sm md:text-sm">
              {warranty} Garantie
            </span>
          ) : null}
        </div>
        {ratingLength > 0 ? (
          <div className="flex items-center gap-1  flex-wrap">
            <Rating rating={averageRating} />{" "}
            <span className="text-[12px] font-light">({ratingLength})</span>
          </div>
        ) : null}

        <Link href={`/produse/${slug}`}>
          <h3 className="text-sm md:text-base font-light my-2 hover:text-orange-500">
            {productName}
          </h3>
        </Link>
        <div className="flex items-center mt-auto ">
          <div className="flex flex-col">
            {oldPrice && (
              <span className="reduced-price">
                {oldPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                Lei + TVA
              </span>
            )}
            <span className="price">
              {price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              Lei
              <span className="text-xs"> + TVA</span>
            </span>
          </div>
          <div className="flex gap-2 items-center ml-auto  ">
            {favourite ? (
              <AiFillHeart
                className="w-10 h-10 p-2 rounded-[100%]  text-red-500 cursor-pointer"
                onClick={handleFavourite}
              />
            ) : (
              <AiOutlineHeart
                className="w-10 h-10 p-2 rounded-[100%]  hover:text-red-500 cursor-pointer"
                onClick={handleFavourite}
              />
            )}
          </div>
          {windowWidth > 440 ? (
            <FiShoppingBag
              className="w-10 h-10 bg-[#F7CD1F] p-2 rounded-lg cursor-pointer hover:text-white hover:bg-orange-500"
              onClick={() =>
                handleCart(
                  id,
                  productName,
                  productImages.data[0].attributes.url,
                  price,
                  oldPrice
                )
              }
            />
          ) : null}
        </div>
        {windowWidth < 440 ? (
          <button
            className="bg-[#F7CD1F] p-1 py-2 flex  items-center gap-1 rounded-xl mt-4 justify-center text-[3.5vw]"
            onClick={() =>
              handleCart(
                id,
                productName,
                productImages.data[0].attributes.url,
                price,
                oldPrice
              )
            }
          >
            <FiShoppingBag className="w-5 h-5 rounded-lg" />
            Adaugă in coș
          </button>
        ) : null}
      </div>
    </div>
  );
}
