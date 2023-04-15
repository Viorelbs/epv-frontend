import Banner from "@/components/Layout/Banner";
import ProductCard from "@/components/Layout/ProductCard";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function FavouriteProducts() {
  const favProducts = useSelector((state: RootState) => state.favourite);
  console.log(favProducts);
  return (
    <>
      <Banner text="Produse Favorite" />
      <div className="my-20 container mx-auto">
        {favProducts.products.length === 0 ? (
          <div className=" min-h-[40vh] ">
            <p>Inca nu ai niciun produs adaugat la favorite</p>
          </div>
        ) : (
          <div className=" gap-8 grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4">
            {favProducts.products.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                oldPrice={product.oldPrice}
                price={product.price}
                productImages={product.productImages}
                productName={product.productName}
                rating={product.rating}
                slug={product.slug}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
