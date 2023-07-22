import { makeRequest } from "@/lib/makeRequest";
import { Card } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { client } from "./_app";
import { QUERY_ORDERS } from "@/queries/queries";

export default function ThankYouPage({ orders }: any) {
  const router = useRouter();
  const { loading, error, data } = useQuery(QUERY_ORDERS, {
    client: client,
    fetchPolicy: "no-cache",
    variables: {
      slug: router.query.session_id,
    },
  });

  useEffect(() => {
    if (data && data?.orders.data[0].attributes.paid === false) {
      const fetchData = async () => {
        await makeRequest.post("/api/order-confirm", {
          orderId: data.orders.data[0].id,
          checkout_session: router.query.session_id,
          products: data.orders.data[0].attributes.products,
        });
      };

      fetchData();
    }
  }, [data]);

  return (
    <div className="min-h-screen min-w-full bg-green-600 grid place-content-center">
      <Card className="max-w-md p-4 items-center">
        <h1 className="text-xl mb-2">Multumim pentru achizitia facuta!</h1>
        <p className="text-base text-center">
          Comanda dumneavoastra a ajuns la noi si ne vom ocupa de ea in cel mai
          scurt timp, verificati-va mail-ul pentru a vedea factura
        </p>
        <button className="mt-4 btn-primary" onClick={() => router.push("/")}>
          Acasa
        </button>
      </Card>
    </div>
  );
}
