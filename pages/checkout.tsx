import CheckoutForm from "@/components/Layout/CheckoutForm";
import CheckoutList from "@/components/Layout/CheckoutList";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Checkout() {
  const checkoutData = useSelector((state: RootState) => state.cart.products);
  return (
    <div className="py-10 bg-[#F5F3ED] min-h-screen flex items-center justify-center">
      <section className="w-full">
        <h1 className="sr-only">Checkout</h1>
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden items-center">
          <CheckoutList products={checkoutData} />
          <div className="bg-white py-12 md:py-24 h-full flex items-center">
            <div className="mx-auto max-w-lg px-4 lg:px-8 w-full">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
