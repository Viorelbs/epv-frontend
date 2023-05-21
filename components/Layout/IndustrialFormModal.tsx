import React, { ChangeEventHandler, FormEventHandler } from "react";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { IndustrialFormValues } from "@/typings";
import Loader from "../Common/Loader";

interface Props {
  open: boolean;
  values: IndustrialFormValues;
  handleClose: () => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: ChangeEventHandler<HTMLInputElement> | any;
  isLoading: boolean;
}
export default function IndustrialFormModal({
  open,
  handleClose,
  values,
  handleChange,
  handleSubmit,
  isLoading,
}: Props) {
  return isLoading ? (
    <div className="min-h-screen min-w-screen grid z-50 place-content-center fixed left-0 right-0 bottom-0 top-0 bg-[#ffffff90]">
      <Loader size={10} />
    </div>
  ) : (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white top-0 bottom-0 left-0 max-w-[90vw] right-0 m-auto md:h-fit absolute gap-6 lg:max-w-4xl border p-5 rounded-md overflow-auto  scrollbar-hide md:scrollbar-default max-h-[90vh] h-full"
      >
        <div className="flex justify-between">
          <h3>Montaje Industriale</h3>
          <AiOutlineClose
            onClick={handleClose}
            className="w-5 h-5 cursor-pointer hover:text-red-500"
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col gap-1 grow">
            <label className="font-medium">Nume Societate</label>
            <input
              placeholder="Societatea SRL"
              className="input"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1 grow">
            <label className="font-medium">Telefon</label>
            <input
              placeholder="073 3333 333"
              className="input"
              type="number"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col gap-1 grow">
            <label className="font-medium">Email</label>

            <input
              type="email"
              placeholder="example@info.com"
              className="input"
              name="email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 grow">
            <label className="font-medium">Estimare kilowati</label>
            <input
              placeholder="10"
              className="input"
              type="number"
              name="kilowati"
              value={values.kilowati}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 grow">
          <label className="font-medium">Locatie</label>
          <input
            placeholder="Str. Zorilor 7A, Cluj-Napoca"
            className="input"
            type="text"
            name="locatie"
            value={values.locatie}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Alte Detalii</label>

          <textarea
            className="input"
            placeholder="Mesajul tău"
            name="message"
            required
            value={values.message}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="accept-industrial"
            required
            className="w-4 h-4 mr-2 relative top-1"
          />
          <label
            htmlFor="accept-industrial"
            className="text-[15px] cursor-pointer"
          >
            Sunt de acord ca datele personale colectate în formularul de mai sus
            să fie folosite exclusiv pentru scopul de a primi un raspuns la
            solicitare.*
          </label>
        </div>
        <button type="submit" className="btn-primary w-fit">
          Trimite Solicitare{" "}
        </button>
      </form>
    </Modal>
  );
}
