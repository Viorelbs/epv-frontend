import { Checkbox, Input, Textarea } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState } from "react";

const initValues = {
  name: "",
  email: "",
  phone: "",
  adress: "",
  message: "",
};

export default function CheckoutForm() {
  const initState = { isLoading: false, error: "", values: initValues };
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});
  const [checkedInput, setCheckedInput] = useState(false);
  const { values, isLoading, error } = state;

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) =>
    setTouched((prev) => ({ ...prev, [event.target.name]: true }));

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [event.target.name]: event.target.value,
      },
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      //   await sendContactForm(values);
      //   setTouched({});
      //   setState(initState);
      //   setSubjectSt("");
      //   setConfirmOpen(true);
    } catch (error: any) {
      //   setState((prev) => ({
      //     ...prev,
      //     isLoading: false,
      //     error: error.message,
      //   }));
    }
  };

  return (
    <form className="flex flex-col  gap-4 ">
      <div className="contact-form">
        <Input
          variant="static"
          placeholder="Nume Complet"
          size="lg"
          color="orange"
          type="text"
          required
          value={values.name}
          name="name"
          onChange={handleChange}
          onBlur={onBlur}
          className="placeholder:text-[17px]"
        />
        <Input
          variant="static"
          placeholder="Email"
          size="lg"
          color="orange"
          type="Email"
          required
          value={values.email}
          name="email"
          onChange={handleChange}
          onBlur={onBlur}
          className="placeholder:text-[17px]"
        />
        <Input
          variant="static"
          placeholder="Telefon"
          size="lg"
          color="orange"
          type="number"
          required
          value={values.phone}
          name="phone"
          onChange={handleChange}
          onBlur={onBlur}
          className="placeholder:text-[17px]"
        />
        <Input
          variant="static"
          placeholder="Adresa Completă"
          size="lg"
          color="orange"
          type="text"
          required
          value={values.adress}
          name="adress"
          onChange={handleChange}
          onBlur={onBlur}
          className="placeholder:text-[17px]"
        />
        <Textarea
          variant="static"
          name="message"
          placeholder="Alte mentiuni"
          value={values.message}
          onChange={handleChange}
          onBlur={(event: React.FocusEvent<any>) => onBlur(event)}
          size="lg"
          required
          color="orange"
          className="placeholder:text-[17px]"
        />
      </div>

      <div className="col-span-6">
        <Checkbox
          checked={checkedInput}
          onClick={() => setCheckedInput(!checkedInput)}
        />
        <span
          className="relative bottom-1 cursor-pointer"
          onClick={() => setCheckedInput(!checkedInput)}
        >
          Am citit si sunt de acord cu{" "}
          <Link href="/termeni-si-conditii" className="font-semibold mr-1">
            termenii si conditiile
          </Link>
          site-ului Epv Infinity
        </span>

        <button className=" mt-8 block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg">
          Trimite comanda
        </button>
      </div>
    </form>
  );
}
