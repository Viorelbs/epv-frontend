import { Input, Textarea } from "@material-tailwind/react";
import { BsSend } from "react-icons/bs";
import sendContactForm from "../../lib/api";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import Loader from "../Common/Loader";

const initValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const router = useRouter();
  const initState = { isLoading: false, error: "", values: initValues };
  const [state, setState] = useState(initState);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { values, isLoading, error } = state;
  const [touched, setTouched] = useState({});
  const [subjectSt, setSubjectSt] = useState("");
  const [acceptance, setAcceptance] = useState(false);

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
        subject:
          router.query.slug !== undefined ? router.query.slug : subjectSt,
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
      setTouched({});
      setState(initState);
      setSubjectSt("");
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
    <Loader size={10} />
  ) : (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Contactează-ne</h3>
        <div className="space-y-4 contact-form">
          <Input
            variant="static"
            placeholder="Nume"
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
            placeholder="Numar telefon"
            size="lg"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={onBlur}
            color="orange"
            type="number"
            required
            className="placeholder:text-[17px]"
          />
          <Input
            variant="static"
            value={values.email}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder="Email"
            name="email"
            size="lg"
            color="orange"
            required
            type="email"
            className="placeholder:text-[17px]"
          />
          {router.query.slug === undefined && (
            <Input
              variant="static"
              value={subjectSt}
              onChange={(e) => setSubjectSt(e.target.value)}
              onBlur={onBlur}
              placeholder="Subiect"
              size="lg"
              color="orange"
              required
              type="text"
              className="placeholder:text-[17px]"
            />
          )}

          <Textarea
            variant="static"
            name="message"
            placeholder="Mesaj"
            value={values.message}
            onChange={handleChange}
            onBlur={(event: React.FocusEvent<any>) => onBlur(event)}
            size="lg"
            required
            color="orange"
            className="placeholder:text-[17px]"
          />
          <div>
            <input
              type="checkbox"
              id="accept"
              required
              className="w-4 h-4 mr-2 relative top-1"
              onChange={() => setAcceptance(!acceptance)}
            />
            <label htmlFor="accept" className="text-[15px] cursor-pointer">
              Sunt de acord ca datele personale colectate în formularul de mai
              sus să fie folosite exclusiv pentru scopul de a primi un raspuns
              la solicitare.*
            </label>
          </div>
          <button className="btn-primary flex items-center gap-4" type="submit">
            Trimite
            <BsSend className="text-xl" />
          </button>
        </div>
      </form>
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
            Vă mulțumim pentru mesajul dumneavoastră. Vă vom răspunde cât mai
            curând posibil. Toate cele bune!{" "}
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
