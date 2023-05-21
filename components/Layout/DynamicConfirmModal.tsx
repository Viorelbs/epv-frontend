import { Modal } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  confirmOpen: boolean;
  setConfirmOpen: Dispatch<SetStateAction<boolean>>;
}
export default function DynamicConfirmModal({
  confirmOpen,
  setConfirmOpen,
}: Props) {
  return (
    <Modal
      open={confirmOpen}
      onClose={() => setConfirmOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex flex-col bg-white top-0 bottom-0 left-0 right-0 m-auto h-fit absolute gap-8 max-w-xl border p-5 rounded-md">
        <div className="check-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg-success"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
            >
              <circle
                className="success-circle-outline"
                cx="12"
                cy="12"
                r="11.5"
              />
              <circle
                className="success-circle-fill"
                cx="12"
                cy="12"
                r="11.5"
              />
              <polyline
                className="success-tick"
                points="17,8.5 9.5,15.5 7,13"
              />
            </g>
          </svg>
        </div>
        <p className="text-center">
          Vă mulțumim pentru solicitarea dumneavoastră. Vă vom răspunde cât mai
          curând posibil. Toate cele bune!
        </p>
        <button
          className="btn-primary w-fit mx-auto mb-4"
          onClick={() => setConfirmOpen(false)}
        >
          Inchide
        </button>
      </div>
    </Modal>
  );
}
