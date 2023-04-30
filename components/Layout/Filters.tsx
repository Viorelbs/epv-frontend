import { BrandsType, CategoryType, PowersType } from "@/typings";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  categories: {
    data: CategoryType[];
  };
  brands: {
    data: BrandsType[];
  };
  powers: {
    data: PowersType[];
  };
}

export default function Filters({ categories, brands, powers }: Props) {
  const [mainFilters, setMainFilters] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [powersList, setPowersList] = useState([]);
  const router = useRouter();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (checked) {
      const newFilters = [...mainFilters, event.target.value] as never[];
      setMainFilters(newFilters);
      const queryParams = new URLSearchParams(
        router.query as Record<string, string>
      );
      queryParams.set("cat", newFilters.join(","));
      router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
        scroll: false,
      });
    } else {
      const newFilters = mainFilters.filter(
        (filter) => filter !== event.target.value
      );
      setMainFilters(newFilters);
      const queryParams = new URLSearchParams(
        router.query as Record<string, string>
      );
      queryParams.set("cat", newFilters.join(","));
      router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
        scroll: false,
      });
    }
  };

  useEffect(() => {
    setBrandsList((router.query.brand as any)?.split(",") ?? []);
    setPowersList((router.query.powers as any)?.split(",") ?? []);
  }, [router.query.brand, router.query.powers]);

  // const handlePowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { checked } = event.target;

  //   if (checked) {
  //     const newPowers = [...powersList, event.target.value] as never[];
  //     setPowersList(newPowers);
  //     const queryParams = new URLSearchParams(
  //       router.query as Record<string, string>
  //     );
  //     queryParams.set("powers", newPowers.join(","));
  //     router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
  //       scroll: false,
  //     });
  //   } else {
  //     const newPowers = powersList.filter(
  //       (filter) => filter !== event.target.value
  //     );
  //     setPowersList(newPowers);
  //     const queryParams = new URLSearchParams(
  //       router.query as Record<string, string>
  //     );
  //     queryParams.set("powers", newPowers.join(","));
  //     router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
  //       scroll: false,
  //     });
  //   }
  // };

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked) {
      const newBrands = [...brandsList, event.target.value] as never[];
      setBrandsList(newBrands);
      const queryParams = new URLSearchParams(
        router.query as Record<string, string>
      );
      queryParams.set("brand", newBrands.join(","));
      router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
        scroll: false,
      });
    } else {
      const newBrands = brandsList.filter(
        (filter) => filter !== event.target.value
      );
      setBrandsList(newBrands);
      const queryParams = new URLSearchParams(
        router.query as Record<string, string>
      );
      queryParams.set("brand", newBrands.join(","));
      router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
        scroll: false,
      });
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const queryParams = new URLSearchParams(
      router.query as Record<string, string>
    );
    queryParams.set("sort", e.target.value);
    router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
      scroll: false,
    });
  };

  return (
    <>
      <span className="mt-4 text-sm font-medium text-gray-900">Afiseaza</span>
      <div className="flex flex-col gap-2 mt-2 ">
        {categories.data.map((cat: CategoryType) => (
          <div key={cat.id} className="checkbox text-[15px]">
            <input
              type="checkbox"
              value={cat.id}
              checked={router.query.cat?.includes(cat.id)}
              className="checkbox"
              onChange={handleFilterChange}
              id={cat.id}
            />
            <label htmlFor={cat.id}>
              {cat.attributes.NumeCategorie.replace(/_/g, " ")}
            </label>
          </div>
        ))}
        <label
          htmlFor="countries"
          className="mt-4 text-sm font-medium text-gray-900 "
        >
          Ordoneaza dupa:
        </label>
        <select
          id="sort"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-400 block w-full p-2.5 "
          onChange={handleSort}
          defaultValue="createdAt:desc"
        >
          <option value="createdAt:desc">Cele mai noi</option>
          <option value="createdAt:asc">Cele mai vechi</option>
          <option value="Pret:asc">Pret Crescator</option>
          <option value="Pret:desc">Pret Descrescator</option>
        </select>
        {router.query.cat && router.query.cat.includes("2") ? null : (
          <>
            <label
              htmlFor="sort"
              className="mt-4 text-sm font-medium text-gray-900 "
            >
              Brand:
            </label>
            {brands.data.map((brand: any) => {
              return (
                <div
                  key={brand.id}
                  className={`flex items-center mb-2  ${
                    brand.attributes.produses.data.length === 0 ? "hidden" : ""
                  }`}
                >
                  <input
                    id={brand.attributes.Brand}
                    type="checkbox"
                    onChange={handleBrandChange}
                    value={brand.id}
                    checked={router.query.brand?.includes(brand.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label
                    htmlFor={brand.attributes.Brand}
                    className="ml-2 text-sm "
                  >
                    {brand.attributes.Brand}
                    <span className="ml-2 text-gray-600 font-light">
                      ({brand.attributes.produses.data.length})
                    </span>
                  </label>
                </div>
              );
            })}
          </>
        )}

        {/* {router.query.cat && router.query.cat.includes("2") ? null : (
          <>
            <label
              htmlFor="sort"
              className="mt-4 text-sm font-medium text-gray-900 "
            >
              Putere:
            </label>
            {powers.data.map((power: any) => {
              return (
                <div
                  key={power.id}
                  className={`flex items-center mb-2  ${
                    power.attributes.produses.data.length === 0 ? "hidden" : ""
                  }`}
                >
                  <input
                    id={power.attributes.Putere}
                    type="checkbox"
                    onChange={handlePowerChange}
                    value={power.id}
                    checked={router.query.powers?.includes(power.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label
                    htmlFor={power.attributes.Putere}
                    className="ml-2 text-sm "
                  >
                    {power.attributes.Putere}
                    <span className="ml-2 text-gray-600 font-light">
                      ({power.attributes.produses.data.length})
                    </span>
                  </label>
                </div>
              );
            })}
          </>
        )} */}
      </div>
    </>
  );
}
