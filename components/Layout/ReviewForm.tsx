import { useState } from "react";
import { useMutation } from "@apollo/client";
import Modal from "@mui/material/Modal";
import { CREATE_REVIEW_MUTATION } from "@/queries/queries";
import Loader from "../Common/Loader";
import { StarRating } from "../Common/StarRating";

type FormValues = {
  NumeUtilizator: string;
  EmailUtilizator: string;
  Rating: number;
  Recenzie: string;
};

const defaultValues: FormValues = {
  NumeUtilizator: "",
  EmailUtilizator: "",
  Rating: 5,
  Recenzie: "",
};
interface Props {
  prodId: number;
}

export default function ReviewForm({ prodId }: Props) {
  const [review, setReview] = useState<FormValues>(defaultValues);
  const [createReview, { loading, error }] = useMutation(
    CREATE_REVIEW_MUTATION
  );
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = useState(4);

  // Must add useMemo for rating
  // Submiting form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await createReview({
        variables: {
          data: {
            produs: prodId,
            NumeUtilizator: review.NumeUtilizator,
            EmailUtilizator: review.EmailUtilizator,
            Rating: rating,
            Recenzie: review.Recenzie,
          },
        },
      });
      setReview(defaultValues);
      setOpen(false);
      setConfirmOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRatingChange = (newValue: number) => {
    setRating(newValue);
  };

  // Updating the values
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: name === "Rating" ? parseInt(value) : value,
    }));
  };

  return loading ? (
    <div className="min-h-screen min-w-screen grid place-content-center fixed left-0 right-0 bottom-0 top-0 bg-[#ffffff90]">
      <Loader size={10} />
    </div>
  ) : (
    <>
      <div className="flex gap-4 flex-col md:flex-row items-center ">
        <span>Nu ezita sa iti spui parerea !</span>
        <button className="btn-primary" onClick={handleOpen}>
          Adauga recenzie
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-white top-0 bottom-0 left-0 max-w-[90vw] right-0 m-auto h-fit absolute gap-8 md:max-w-4xl border p-5 rounded-md"
        >
          <div className="flex flex-col gap-1">
            <label className="font-medium">Nume</label>
            <input
              placeholder="Florin"
              className="input"
              type="text"
              name="NumeUtilizator"
              value={review.NumeUtilizator}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Email</label>

            <input
              type="email"
              placeholder="example@info.com"
              className="input"
              name="EmailUtilizator"
              required
              value={review.EmailUtilizator}
              onChange={handleChange}
            />
          </div>

          <StarRating value={rating} onChange={handleRatingChange} />

          <div className="flex flex-col gap-1">
            <label className="font-medium">Recenzie</label>

            <textarea
              className="input"
              placeholder="Mesajul tău"
              name="Recenzie"
              required
              value={review.Recenzie}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-primary w-fit">
            Adaugă Review
          </button>
        </form>
      </Modal>
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
            Vă mulțumim pentru evaluarea făcută, după verificarea acesteia, va
            fi publicată în secțiunea de recenzii.
          </p>
          <button
            className="btn-primary w-fit mx-auto mb-4"
            onClick={() => setConfirmOpen(false)}
          >
            Inchide
          </button>
        </div>
      </Modal>
    </>
  );
}
