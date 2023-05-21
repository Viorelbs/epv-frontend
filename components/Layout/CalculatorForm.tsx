import { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "../Common/Loader";
import sendContactForm from "@/lib/api";
import { FormValues } from "@/typings";

// importing dynamic modals
const DynamicModalForm = dynamic(() => import("./CalculatorFormModal"), {
  loading: () => <Loader size={6} />,
});

const DynamicConfirmMessage = dynamic(() => import("./DynamicConfirmModal"), {
  loading: () => <Loader size={6} />,
});

interface Props {
  monthlyCost: number;
  economy: number;
  panelsPrice: number;
  priceCoverage: string;
}
export default function CalculatorForm({
  monthlyCost,
  economy,
  panelsPrice,
  priceCoverage,
}: Props) {
  const initValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
    locatie: "",
    monthlyCost: monthlyCost,
    economy: economy.toLocaleString("RO"),
    panelsPrice: panelsPrice,
    priceCoverage: priceCoverage,
  };

  const initState = { isLoading: false, error: "", values: initValues };
  const [state, setState] = useState(initState);
  const { values, isLoading, error } = state;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [event.target.name]: event.target.value,
        subject: "Cost Calculator",
      },
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setOpen(false);
      setState(initState);
      setConfirmOpen(true);
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <>
      <button className="btn-primary" onClick={handleOpen}>
        Cere Oferta
      </button>

      {open ? (
        <DynamicModalForm
          open={open}
          setOpen={setOpen}
          setConfirmOpen={setConfirmOpen}
          handleClose={handleClose}
          monthlyCost={monthlyCost}
          economy={economy}
          panelsPrice={panelsPrice}
          initState={initState}
          priceCoverage={priceCoverage}
          setState={setState}
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ) : null}

      {confirmOpen ? (
        <DynamicConfirmMessage
          confirmOpen={confirmOpen}
          setConfirmOpen={setConfirmOpen}
        />
      ) : null}
    </>
  );
}
