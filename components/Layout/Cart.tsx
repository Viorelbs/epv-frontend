import { RootState } from "@/redux/store";
import { Drawer } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiBasket } from "react-icons/bi";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Tooltip,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/cartOpen";
import { loadStripe } from "@stripe/stripe-js/pure";
import Loader from "../Common/Loader";
import { makeRequest } from "@/lib/makeRequest";
import { AiOutlineExclamationCircle } from "react-icons/ai";
interface Props {
  window?: () => Window;
  scroll: boolean;
}

interface ProductType {
  id: string;
  image: string;
  price: number;
  qty: number;
  title: string;
  oldPrice?: number;
  slug: string;
}

export default function Cart(props: Props) {
  const products = useSelector((state: RootState) => state.cart.products);
  const { window, scroll } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const cartState = useSelector((state: RootState) => state.cartOpen.open);
  const dispatch = useDispatch();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const courierTax = Number(process.env.NEXT_PUBLIC_TAX_VALUE!);
  const miniumPrice = Number(process.env.NEXT_PUBLIC_MINIUM_PRICE!);
  useEffect(() => {
    if (cartState === true) {
      setOpen(true);
    }

    dispatch(
      setCart({
        open: false,
      })
    );
  }, [cartState]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // Total cart sum
  const totalSumProd = useMemo(() => {
    return products.reduce(
      (acc: number, product: { price: number; qty: number }) =>
        acc + product.price * product.qty,
      0
    );
  }, [products]);

  const totalSum =
    totalSumProd < miniumPrice ? totalSumProd + courierTax : totalSumProd;

  // Old price sum
  const totalSumOldPrice = useMemo(() => {
    return products.reduce(
      (acc: number, product: { oldPrice: number; qty: number }) =>
        acc + product.oldPrice * product.qty,
      0
    );
  }, [products]);

  // Cart Length
  const cartLength = useMemo(() => {
    return products.reduce(
      (acc: number, product: { qty: number }) => acc + product.qty,
      0
    );
  }, [products]);
  // Closing modal when no products
  useEffect(() => {
    if (products.length === 0) {
      setOpen(false);
    }
  }, [products]);

  // Handle Payment
  const handlePayment = async () => {
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );

    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await makeRequest.post("api/orders", { products });
      await stripe?.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {products.length === 0 ? (
        <Popover
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          placement="bottom"
        >
          <PopoverHandler>
            <Button
              variant="outlined"
              className={`flex items-center gap-1 text-lg border-none px-2 hover:text-[#F7CD1F] focus:shadow-none ${
                scroll ? "text-black" : "text-white"
              }`}
            >
              <BiBasket className="w-7 h-7" />{" "}
              <span className="mt-1">{cartLength}</span>
            </Button>
          </PopoverHandler>
          <PopoverContent className="z-50 box-shadow">
            <span>Incă nu ai niciun produs in coș</span>
          </PopoverContent>
        </Popover>
      ) : (
        <span
          onClick={toggleDrawer(true)}
          className="flex items-center hover:text-[#F7CD1F] text-lg cursor-pointer gap-2 "
        >
          <BiBasket className="w-7 h-7" />
          <span className="mt-1">{cartLength}</span>
        </span>
      )}

      <Drawer
        container={container}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className=" sm:min-w-[25vw] sm:max-w-xxl w-full  h-full p-4 md:p-8 flex flex-col gap-10 relative">
          <div className="flex justify-between border-b border-gray-500 pb-2">
            <span>
              <span className="text-xl font-medium mr-1">Coș</span> {cartLength}
            </span>
            <AiOutlineClose
              onClick={toggleDrawer(false)}
              className="w-5 h-5 cursor-pointer hover:text-red-500"
            />
          </div>
          <div className="overflow-auto max-h-[49vh] grid grid-flow-row gap-4 py-2">
            {products.map((product: ProductType) => (
              <CartItem
                key={product.id}
                id={product.id}
                image={product.image}
                slug={product.slug}
                title={product.title}
                quantity={product.qty}
                price={product.price}
                oldPrice={product.oldPrice}
              />
            ))}
          </div>
        </div>
        <div className="p-8 border-t border-gray-500 space-y-3">
          {totalSumOldPrice !== 0 ? (
            <div className="flex justify-between  ">
              <span className="font-light text-sm md:text-base">
                Economisiți
              </span>
              <span className="font-medium text-sm md:text-base text-green-500">
                {(totalSumOldPrice - totalSumProd).toFixed(2)} Lei + TVA
              </span>
            </div>
          ) : null}
          <div className="flex justify-between  ">
            <span className="font-light text-sm md:text-base flex items-center gap-2 cursor-pointer relative group">
              <span className="absolute bottom-[2rem] bg-white md:whitespace-nowrap border  p-2 rounded-xl opacity-0 group-hover:opacity-100 duration-200">
                Transport gratuit peste suma de{" "}
                {process.env.NEXT_PUBLIC_MINIUM_PRICE} lei
              </span>
              Taxa transport
              <AiOutlineExclamationCircle />
            </span>
            <span className="font-medium text-sm md:text-base ">
              {totalSumProd < miniumPrice
                ? `${courierTax.toFixed(2)} Lei`
                : "Gratuit"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-base md:text-lg">Total</span>
            <span className="font-medium text-base md:text-lg">
              {totalSum.toFixed(2)} Lei + TVA
            </span>
          </div>
        </div>
        {loading ? (
          <button className="btn-primary text-center hover:!text-black text-sm md:text-base mb-10 mx-8 opacity-70">
            <Loader size={5} />
          </button>
        ) : (
          <button
            onClick={handlePayment}
            className="btn-primary text-center hover:!text-black text-sm md:text-base mb-10 mx-8"
          >
            Finalizeză Comanda
          </button>
        )}
      </Drawer>
    </>
  );
}
