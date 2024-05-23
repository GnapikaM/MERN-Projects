import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirm = ({ productsInfo, handleCreateOrder }) => {
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(true);

  const handleCancel = () => {
    setShowPopUp(false);
  };

  return (
    <div>
      {showPopUp && (
        <div
          className="fixed inset-0 flex items-center justify-center overflow-y-auto"
          style={{ backgroundColor: `rgba(0, 0, 0, 0.7)` }}
        >
          <div className="w-[280px] h-44 rounded p-5" style={{backgroundColor: `var(--body-bg-color)`}}>
            <p className="font-semibold">
              Do you want to proceed with the payment for {productsInfo?.length}{" "}
              item(s)?
            </p>
            <div className="flex justify-center mt-10">
              <button
                className="mr-10 font-semibold hover:text-red-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 rounded font-semibold"
                style={{ backgroundColor: `var(--highlight-color)` }}
                onClick={handleCreateOrder}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirm;
