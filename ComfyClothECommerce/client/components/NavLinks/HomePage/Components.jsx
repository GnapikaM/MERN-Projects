import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return null;
};

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="text-center">
      <button
        className="mt-10 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out hover:opacity-90"
        style={{
          backgroundColor: `var(--highlight-color)`,
          color: `var(--text-color)`,
        }}
        onClick={handleBack}
      >
        BACK
      </button>
    </div>
  );
};
