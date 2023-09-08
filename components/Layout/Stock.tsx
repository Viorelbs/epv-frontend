import React from "react";

interface Props {
  stock: number;
  variant: "text" | "outlined";
}

export default function Stock({ stock, variant }: Props) {
  const stockText = () => {
    if (stock === 0) {
      return (
        <span
          className={`text-sm lg:text-base ${
            variant === "outlined"
              ? "border-red-500 border py-1 px-4 rounded-xl text-red-900"
              : "text-red-900"
          }`}
        >
          Stoc Epuizat
        </span>
      );
    }

    if (stock === 4) {
      return (
        <span
          className={`text-sm lg:text-base ${
            variant === "outlined"
              ? "border-orange-500 border py-1 px-4 rounded-xl text-orange-600"
              : "text-orange-600"
          }`}
        >
          Doar 4 buc.
        </span>
      );
    }

    if (stock === 3) {
      return (
        <span
          className={`text-sm lg:text-base ${
            variant === "outlined"
              ? "border-orange-500 border py-1 px-4 rounded-xl text-orange-600"
              : "text-orange-600"
          }`}
        >
          Doar 3 buc.
        </span>
      );
    }

    if (stock === 2) {
      return (
        <span
          className={`text-sm lg:text-base ${
            variant === "outlined"
              ? "border-orange-500 border py-1 px-4 rounded-xl text-orange-600"
              : "text-orange-600"
          }`}
        >
          Doar 2 buc.
        </span>
      );
    }

    if (stock === 1) {
      return (
        <span
          className={`text-sm lg:text-base ${
            variant === "outlined"
              ? "border-orange-500 border py-1 px-4 rounded-xl text-orange-600"
              : "text-orange-600"
          }`}
        >
          Doar 1 buc.
        </span>
      );
    }

    return (
      <span
        className={`text-sm lg:text-base ${
          variant === "outlined"
            ? "border-green-500 border py-[3px] px-4 rounded-xl text-green-600"
            : "text-green-600"
        }`}
      >
        In Stoc
      </span>
    );
  };

  return <div>{stockText()}</div>;
}
