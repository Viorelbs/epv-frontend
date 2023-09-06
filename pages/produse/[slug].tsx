import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useMemo, useState } from "react";
import { ImageSimple, MetaImage, Product, ProdusCardType } from "@/typings";
import { HiOutlineLightBulb } from "react-icons/hi";
import { client, URL } from "../_app";
import ProductsSpecs from "@/components/Layout/ProductsSpecs";
import Rating from "@/components/Common/Rating";
import {
  GET_ALL_SLUGS,
  GET_PRODUCT_BY_NAME,
  SIMILAR_PRODUCTS_CARDS_QUERY,
} from "@/queries/queries";
import QtyButtons from "@/components/Layout/QtyButtons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartReducer";
import { setCart } from "@/redux/cartOpen";
import ProductCard from "@/components/Layout/ProductCard";
import toast, { Toaster } from "react-hot-toast";
import { addFav, removeFav } from "@/redux/favouritesReducer";
import { RootState } from "@/redux/store";
import HTMLReactParser from "html-react-parser";
import Head from "next/head";
import { FiShoppingBag } from "react-icons/fi";
import useWidth from "@/hooks/useWidth";
import Stock from "@/components/Layout/Stock";
import Loader from "@/components/Common/Loader";

interface Props {
  product: Product;
  productsCards: ProdusCardType[];
  ogImage: MetaImage;
  ogDescription: string;
  ogTitle: string;
}

export default function ProductPage({
  product,
  productsCards,
  ogImage,
  ogTitle,
  ogDescription,
}: Props) {
  const [qty, setQty] = useState(1);
  const [favourite, setFavourite] = useState(false);
  const dispatch = useDispatch();
  const { windowWidth } = useWidth();
  const [currentImage, setCurrentImage] = useState<string>();
  const favProducts = useSelector((state: RootState) => state.favourite);
  const price = product?.attributes.Pret;
  const oldPrice = product?.attributes.PretVechi;
  const discount = ((price - oldPrice) / oldPrice) * 100;
  const formattedDiscount = Math.abs(discount).toFixed(0) + "%";
  // Add to cart
  const handleCart = () => {
    if (product.attributes.stock === 0) {
      alert("Produsul nu se afla in stock");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.attributes.Nume,
        image: product.attributes.PozeProdus.data[0].attributes.url,
        price: product.attributes.Pret,
        oldPrice: product.attributes.PretVechi,
        qty,
      })
    );
    dispatch(
      setCart({
        open: true,
      })
    );
  };

  const sumRatings = product?.attributes.review_produses.data.reduce(
    (acc, review) => acc + review.attributes.Rating,
    0
  );
  const ratingLength = product?.attributes.review_produses.data.length;
  const averageRating = useMemo(
    () => sumRatings / ratingLength,
    [sumRatings, ratingLength]
  );

  useEffect(() => {
    if (product) {
      setCurrentImage(product.attributes.PozeProdus.data[0].attributes.url);
    }
  }, [product]);

  useEffect(() => {
    const prod = favProducts.products.filter(
      (item: ProdusCardType) => item.id === product?.id
    );
    prod.length !== 0 ? setFavourite(true) : setFavourite(false);
  }, [favProducts]);

  // Add To Favourite
  const handleFavourite = () => {
    if (favourite) {
      toast.error(
        <span>
          Produsu{" "}
          <strong className="max-w-[50px] text-ellipsis overflow-hidden">
            {product.attributes.Nume}
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
            id: product.id,
          })
        );
    } else {
      toast.success(
        <span>
          Produsu{" "}
          <strong className="max-w-[50px] text-ellipsis overflow-hidden">
            {product.attributes.Nume}
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
            productName: product.attributes.Nume,
            price: product.attributes.Pret,
            oldPrice: product.attributes.PretVechi,
            productImages: product.attributes.PozeProdus,
            rating: product.attributes.review_produses,
            id: product.id,
          })
        );
    }
  };

  if (!product) {
    return <Loader size={10} />;
  }
  return (
    <>
      <Head>
        <title>{product.attributes.Nume}</title>
        <meta
          name="description"
          content={
            product.attributes.seo[0]?.metaDescription || "Panorui solare"
          }
        />
        <meta
          name="keywords"
          content={product.attributes.seo[0]?.keywords || "Panouri Solare"}
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}produse/${product.attributes.slug}`}
        />
      </Head>

      <main className="py-24 lg:py-32 ">
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              maxWidth: "700px",
            },
          }}
        />
        <div className="container mx-auto px-4">
          <div className="flex gap-10 mb-10 flex-col lg:flex-row">
            <div className="flex-1 bg-white rounded-md">
              <div className="relative pt-[70%]  border border-gray-300 mb-4">
                {product.attributes.PretVechi && (
                  <span className="absolute top-0 left-0 bg-[#0DC97A] text-white px-5 py-2 rounded-tl-lg rounded-br-lg text-sm md:text-base z-40">
                    {formattedDiscount}
                  </span>
                )}

                {currentImage && (
                  <Image
                    className="absolute top-0 left-0 right-0 bottom-0 m-auto object-contain w-full h-full p-4 md:p-10"
                    src={currentImage}
                    width={300}
                    alt="product image"
                    height={300}
                  />
                )}
              </div>
              <div className="flex gap-4 overflow-auto  scrollbar-hide ">
                {product.attributes.PozeProdus.data.map(
                  (item: ImageSimple, idx: any) => (
                    <Image
                      key={idx}
                      src={item.attributes.url}
                      alt={product.attributes.Nume}
                      onClick={() => setCurrentImage(item.attributes.url)}
                      className="w-24 h-24 p-3 bg-gray-100 hover:bg-gray-200 transition-all duration-75 rounded-sm cursor-pointer"
                      width={50}
                      height={50}
                    />
                  )
                )}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-[20px] lg:text-[30px]">
                {product.attributes.Nume}
              </h1>
              <div className="flex justify-between my-2 flex-wrap">
                <div className="space-x-4">
                  {product.attributes.PretVechi && (
                    <span className="reduced-price text-base lg:text-[20px]">
                      {product.attributes.PretVechi.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      Lei + TVA
                    </span>
                  )}
                  <span className="price text-[20px] lg:text-[30px] ">
                    {product.attributes.Pret.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    Lei + TVA
                  </span>
                </div>
                {ratingLength > 0 ? (
                  <Rating rating={averageRating} />
                ) : (
                  <span className="text-gray-400">Inca nu exista recenzii</span>
                )}
              </div>
              <div className="mt-6">
                <Stock stock={product.attributes.stock} variant="outlined" />
              </div>

              <div className="my-5 ">
                {HTMLReactParser(product.attributes.ScurtaDescriere)}
              </div>
              <div className="flex gap-4 items-center">
                <QtyButtons qty={qty} setQty={setQty} />
                {windowWidth > 600 ? (
                  <button className="btn-primary" onClick={handleCart}>
                    Adauga in cos
                  </button>
                ) : (
                  <FiShoppingBag
                    className="w-10 h-10 bg-[#F7CD1F] p-2 rounded-lg cursor-pointer hover:text-white hover:bg-orange-500"
                    onClick={handleCart}
                  />
                )}
                {favourite ? (
                  <AiFillHeart
                    className="w-10 h-10 p-2 rounded-[100%] bg-[#D9D9D9]/40 text-red-500 cursor-pointer"
                    onClick={handleFavourite}
                  />
                ) : (
                  <AiOutlineHeart
                    className="w-10 h-10 p-2 rounded-[100%] bg-[#D9D9D9]/40 hover:text-red-500 cursor-pointer"
                    onClick={handleFavourite}
                  />
                )}
              </div>
              <div className="mt-8 flex flex-col gap-4">
                {/* <span className="border border-black py-2 px-4 rounded-3xl flex items-center text-green-500 text-xl gap-3 w-fit">
                  <HiOutlineLightBulb className="w-8 h-8 " />
                  Indecis? Cere o oferta personzalizata
                </span> */}
                {product.attributes.ani_garantie ? (
                  <span>
                    Garantie:
                    <span className="ml-2 font-medium">
                      {product.attributes.ani_garantie} Ani
                    </span>
                  </span>
                ) : null}
                <span>
                  Cod Produs:
                  <span className="ml-2 font-medium">
                    {product.attributes.CodProdus}
                  </span>
                </span>
                <span>
                  Categorie Produs:
                  <span className="ml-2 font-medium">
                    {product.attributes.categorie_produs?.data?.attributes?.NumeCategorie.replace(
                      "_",
                      " "
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <ProductsSpecs
            desc={product.attributes.Descriere}
            spec={product.attributes.Specificatii}
            id={product.id}
            reviews={product.attributes.review_produses.data}
          />
          <div className="space-y-6 mt-24 ">
            <h2>Produse Asemanatoare</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productsCards.map((product: ProdusCardType) => (
                <ProductCard
                  productName={product.attributes.Nume}
                  price={product.attributes.Pret}
                  warranty={product.attributes.ani_garantie}
                  oldPrice={product.attributes.PretVechi}
                  slug={product.attributes.slug}
                  stock={product.attributes.stock}
                  productImages={product.attributes.PozeProdus}
                  rating={product.attributes.review_produses}
                  id={product.id}
                  key={product.id}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_SLUGS,
  });
  const paths = data.produses.data.map((product: ProdusCardType) => ({
    params: { slug: product.attributes.slug },
  }));
  return { paths, fallback: true };
}
export async function getStaticProps({ params }: any) {
  const { slug } = params;
  const [data, productsCards] = await Promise.all([
    client.query({
      query: GET_PRODUCT_BY_NAME,
      variables: { slug: slug },
    }),
    client.query({
      query: SIMILAR_PRODUCTS_CARDS_QUERY,
      variables: {
        catId: [1, 2, 3, 4, 5, 6],
        slug: slug,
      },
    }),
  ]);

  const randomSuggestions = [...productsCards.data.produses.data].sort(
    () => 0.5 - Math.random()
  );
  return {
    revalidate: 5, // In seconds
    props: {
      product: data.data.produses.data[0],
      productsCards: randomSuggestions.slice(0, 4),
      ogTitle:
        data.data.produses.data[0]?.attributes?.seo[0]?.metaTitle || null,
      ogDescription:
        data.data.produses.data[0]?.attributes?.seo[0]?.metaDescription || null,
      ogImage:
        data.data.produses.data[0]?.attributes?.seo[0]?.metaImage || null,
    },
  };
}
