import { URL } from "@/pages/_app";
import { CheckoutProduct, Product } from "@/typings";
import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";

interface Props {
  products: CheckoutProduct[];
}
export default function CheckoutList({ products }: Props) {
  const totalSum = products.reduce(
    (acc: number, product: { price: number; qty: number }) =>
      acc + product.price * product.qty,
    0
  );

  const transportFee = 50;
  return (
    <div className="bg-gray-50 py-8 md:py-10">
      <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="logo" className="invert" />
          <h2 className="mt-2">EPV Infinity</h2>
        </div>

        <p className="mt-1 text-sm text-gray-600">Produse</p>
        <div>
          <div className="flow-root">
            <ul className="-my-4 divide-y divide-gray-100 max-h-[300px] overflow-auto">
              {products.map((product: CheckoutProduct) => (
                <li className="flex items-center gap-4 py-4" key={product.id}>
                  <img
                    src={`${URL}${product.image}`}
                    alt="product image"
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-sm text-gray-900">{product.title}</h3>
                    <div className="mt-0.5 space-y-px text-[14px] text-gray-600">
                      <div>
                        <span>Qty:</span>
                        <span className="ml-1">{product.qty}</span>
                        <span className="ml-3">|</span>
                        <span className="ml-3">
                          {product.price * product.qty} Lei
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t  border-gray-300 pt-3 space-y-3">
          <div className="flex justify-between">
            <p className="text-1xl font-medium tracking-tight text-gray-900">
              Total Produse + TVA
            </p>
            <p>{totalSum} Lei</p>
          </div>
          <div className="flex justify-between">
            <p className="text-1xl font-medium tracking-tight text-gray-900">
              Transport
            </p>
            <p>{transportFee} Lei</p>
          </div>
          <div className="flex justify-between border-t border-gray-400 pt-3">
            <p className="text-1xl font-medium tracking-tight text-gray-900">
              Total
            </p>
            <p>{totalSum + transportFee} Lei</p>
          </div>
        </div>
      </div>
    </div>
  );
}
