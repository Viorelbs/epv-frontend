import {
  BrandsType,
  CategoryType,
  PowersType,
  ProdusCardType,
} from "@/typings";
import { checkbox } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

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
  const [mainFilters, setMainFilters] = useState({});
  const [filters, setFilters] = useState<Record<string, string[] | undefined>>(
    {}
  );
  const router = useRouter();

  // Setting main categs
  const handleMainCateg = (e: React.MouseEvent<HTMLInputElement>) => {
    const checkboxValue = e.currentTarget.value;
    const checkboxName = e.currentTarget.name;
    setMainFilters({
      [checkboxName]: checkboxValue,
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(
      router.query as Record<string, string>
    );
    Object.entries(mainFilters).forEach((key, value) => {
      queryParams.set(key[0], key[1] as string);
    });
    router.push(`${router.pathname}?${queryParams}`, undefined, {
      scroll: false,
    });
  }, [mainFilters]);

  // Updating state based on checked inputs
  const handleChange = (e: React.MouseEvent<HTMLInputElement>) => {
    const checkboxValue = e.currentTarget.value;
    const checkboxName = e.currentTarget.name;

    setFilters((prev) => {
      const existingValues = prev[checkboxName] || [];

      // Remove filter if it's checked
      if (existingValues.includes(checkboxValue)) {
        const updatedValues = existingValues.filter(
          (value: string) => value !== checkboxValue
        );

        return {
          ...prev,
          [checkboxName]: updatedValues.length > 0 ? updatedValues : undefined,
        };
      } else {
        const updatedValues = [...existingValues, checkboxValue];
        return {
          ...prev,
          [checkboxName]: updatedValues,
        };
      }
    });
  };

  // Updating Slug based on state
  useEffect(() => {
    const queryParams = new URLSearchParams(
      router.query as Record<string, string>
    );
    const queryFilters: Record<string, string[]> = {};

    queryParams.forEach((value, key) => {
      if (key !== "sort") {
        queryFilters[key] = value.split(",");
      }
    });

    setFilters(queryFilters);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(
      router.query as Record<string, string>
    );
    Object.entries(filters).forEach(([key, values]) => {
      if (values) {
        queryParams.set(key, values.join(","));
      } else {
        queryParams.delete(key);
      }
    });
    router.push(`${router.pathname}?${queryParams.toString()}`, undefined, {
      scroll: false,
    });
  }, [filters]);

  // Sorting
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
              type="radio"
              value={cat.id}
              name="cat"
              checked={router.query.cat?.includes(cat.id)}
              className="checkbox"
              onClick={handleMainCateg}
              id={cat.id}
            />
            <label htmlFor={cat.id}>
              {cat.attributes.NumeCategorie.replace(/_/g, " ")}
            </label>
          </div>
        ))}
        <label
          htmlFor="countries"
          className="mt-4 text-sm font-medium text-gray-900"
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
              console.log();
              return (
                <div
                  key={brand.id}
                  className={`flex items-center  mb-2 ${
                    brand.attributes.produses.data.length === 0 && "hidden"
                  }`}
                >
                  <input
                    id={brand.attributes.Brand}
                    type="checkbox"
                    name="brand"
                    onClick={handleChange}
                    value={brand.id}
                    checked={router.query.brand?.includes(brand.id) || false}
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

        {router.query.cat && router.query.cat.includes("2") ? null : (
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
                    value={power.id}
                    name="power"
                    onClick={handleChange}
                    checked={router.query.power?.includes(power.id) || false}
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
        )}
      </div>
    </>
  );
}
