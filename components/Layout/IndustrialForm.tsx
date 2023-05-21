import { useState } from "react";
import Loader from "../Common/Loader";
import sendContactForm from "@/lib/api";
import dynamic from "next/dynamic";
import { IndustrialFormValues } from "@/typings";

// Importing dynamic modals
const DynamicConfirmModal = dynamic(() => import("./DynamicConfirmModal"), {
  loading: () => <Loader size={6} />,
});
const DynamicIndustrialForm = dynamic(() => import("./IndustrialFormModal"), {
  loading: () => <Loader size={6} />,
});

const initValues: IndustrialFormValues = {
  name: "",
  email: "",
  phone: "",
  kilowati: 0,
  message: "",
  locatie: "",
};

interface Props {
  MenuOpen?: (arg: boolean) => void;
}
export default function IndustrialForm({ MenuOpen }: Props) {
  const initState = { isLoading: false, error: "", values: initValues };
  const [state, setState] = useState(initState);
  const [open, setOpen] = useState(false);
  const { values, isLoading, error } = state;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [touched, setTouched] = useState({});

  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
    MenuOpen && MenuOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [event.target.name]: event.target.value,
        subject: "Montaje Industriale",
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
      setTouched({});
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

  return isLoading ? (
    <div className="min-h-screen min-w-screen grid place-content-center fixed left-0 right-0 bottom-0 top-0 bg-[#ffffff90]">
      <Loader size={10} />
    </div>
  ) : (
    <>
      <button className="btn-primary" onClick={handleOpen}>
        Montaje Industriale
      </button>

      {open ? (
        <DynamicIndustrialForm
          open={open}
          handleClose={handleClose}
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ) : null}
      {confirmOpen ? (
        <DynamicConfirmModal
          confirmOpen={confirmOpen}
          setConfirmOpen={setConfirmOpen}
        />
      ) : null}
    </>
  );
}
