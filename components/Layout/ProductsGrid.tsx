import {
  BrandsType,
  CategoryType,
  PowersType,
  ProdusCardType,
} from "@/typings";
import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import useWidth from "@/hooks/useWidth";
import { AiOutlineClose } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import { client } from "@/pages/_app";
import Pagination from "./Pagination";
import Loader from "../Common/Loader";

interface Props {
  products: {
    meta: any;
    data: ProdusCardType[];
  };
  categories: {
    data: CategoryType[];
  };
  filters?: boolean;
  brands: {
    data: BrandsType[];
  };
  powers: {
    data: PowersType[];
  };
  pageSize: number;
}

export default function ProductsGrid({
  filters,
  categories,
  brands,
  powers,
  products,
  pageSize,
}: Props) {
  const paginationNumber = Math.ceil(
    products?.meta.pagination.total / pageSize
  );
  const router = useRouter();
  const { windowWidth } = useWidth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (paginationNumber < 1) {
      const queryParams = new URLSearchParams(
        router.query as Record<string, string>
      );
      queryParams.set("page", "1");
      router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
        scroll: false,
      });
    }
  }, [paginationNumber]);

  const handleChange = (value: number) => {
    const queryParams = new URLSearchParams(
      router.query as Record<string, string>
    );

    queryParams.set("page", `${value}`);
    router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
      scroll: false,
    });
  };

  return (
    <div className="min-h-[70vh] py-14 md:py-24 lg:py-32 container mx-auto px-4">
      <div>
        <h2>Produse</h2>
        <p>Alege dintr-o gama variata de produse</p>
      </div>

      {filters && windowWidth < 991 ? (
        <div className="mt-4">
          <button
            className="btn px-6 border border-gray-400 rounded-md py-1 flex items-center gap-2"
            onClick={handleOpen}
          >
            <BsFilterLeft />
            Filtrează
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="bg-white  space-y-4 max-h-screen overflow-auto h-full">
              <div className="flex justify-between p-4 border-b border-gray-400">
                <span>Filtrează</span>
                <AiOutlineClose
                  className="float-right inline-block w-5 h-5"
                  onClick={handleClose}
                />
              </div>
              <div className="px-4 pb-4 ">
                <Filters
                  categories={categories}
                  brands={brands}
                  powers={powers}
                />
              </div>
            </div>
          </Modal>
        </div>
      ) : null}

      <div className="flex mt-10 gap-4 ">
        {filters && windowWidth > 991 ? (
          <div className="flex-1 box-shadow rounded-[20px] p-5 h-fit">
            <Filters categories={categories} brands={brands} powers={powers} />
          </div>
        ) : null}

        <div className="flex-[5] space-y-8">
          <div
            className={` grid gap-4 ${
              filters
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            }`}
          >
            {products ? (
              products.data.map((product: ProdusCardType) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  stock={product.attributes.stock}
                  productName={product.attributes.Nume}
                  price={product.attributes.Pret}
                  oldPrice={product.attributes.PretVechi}
                  productImages={product.attributes.PozeProdus}
                  rating={product.attributes.review_produses}
                  slug={product.attributes.slug}
                />
              ))
            ) : (
              <Loader size={8} />
            )}
          </div>
          <Pagination
            handleChange={handleChange}
            count={Number(paginationNumber)}
          />
        </div>
      </div>
    </div>
  );
}
