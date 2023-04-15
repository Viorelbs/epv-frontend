import React, { useState, useEffect } from "react";

const CookiePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAccept = () => {
    setShowPopup(false);
    document.cookie = "cookieAccepted=true; max-age=2592000";
  };

  useEffect(() => {
    const cookieAccepted = document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("cookieAccepted="));

    setShowPopup(!cookieAccepted);
  }, []);

  return (
    <>
      {showPopup && (
        <div
          className={`cookie-popup ${
            showPopup ? "visible" : "hidden"
          } fixed bottom-0 bg-black w-full flex items-center py-4 justify-between px-[5vw] text-white gap-[20vw]`}
        >
          <p className="font-light text-[15px]">
            Acest website utilizează cookie-uri pentru a îmbunătăți experiența
            dumneavoastră. Prin continuarea navigării pe acest site, sunteți de
            acord cu utilizarea acestora.
          </p>
          <button onClick={handleAccept} className="btn-primary py-2 shrink-0">
            Am înțeles
          </button>
        </div>
      )}
    </>
  );
};

export default CookiePopup;
