import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTheme } from "../Theme/ThemeContext";
import { fetchAddresses, deleteAddress } from "../../../actions/AddressActions";

const AddressPage = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = authData?.result?._id;
  const allAddresses = useSelector((state) => state.AddressReducer.addresses);

  const [showButtons, setShowButtons] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const location = useLocation();
  const productsInfo = location.state ? location.state.productsInfo : null;
  const totalAmount = location.state ? location.state.totalAmount : null;

  useEffect(() => {
    dispatch(fetchAddresses(userId));
  }, [dispatch, userId]);

  const handleDeleteAddress = (id) => {
    dispatch(deleteAddress(id, userId));
  };

  const handleRadioChange = (id) => {
    setSelectedAddress(id);
    setShowButtons(true);
  };

  const handleContinuePayment = () => {
    navigate("/payments", {
      state: {
        selectedAddress,
        productsInfo,
        totalAmount,
      },
    });
  };

  const handleEditAddress = (address) => {
    navigate("/addAddress", {
      state: {
        addressToEdit: address,
      },
    });
  };

  const handleBack = () => {
    navigate("/bag");
  };

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
      <div>
        <div
          className="px-5 pt-5 text-2xl flex items-center cursor-pointer"
          onClick={handleBack}
        >
          <ion-icon name="arrow-undo-outline"></ion-icon>
          <span className="text-lg ml-2">Back</span>
        </div>
        <div className="flex items-center justify-center pt-32 pb-8 text-sm max-[550px]:pt-36">
          <div className="w-[500px] p-3 border">
            <div
              className="flex justify-between items-center font-bold py-3 border-b"
              style={{ borderColor: `var(--gray-color)` }}
            >
              <p className="px-2 py-1">SELECT DELIVERY ADDRESS</p>
              <button
                className="px-2 py-1 rounded border max-sm:hidden"
                style={{ borderColor: `var(--text-color)` }}
              >
                <Link to="/addAddress">ADD NEW ADDRESS</Link>
              </button>
              <button
                className="hidden max-sm:w-10 max-sm:h-10 max-sm:border max-sm:flex max-sm:justify-center max-sm:text-2xl ma-sm:rounded"
                style={{ borderColor: `var(--text-color)` }}
              >
                <Link to="/addAddress">+</Link>
              </button>
            </div>
            <div className="px-1 pt-8">
              {allAddresses ? (
                allAddresses.map((address) => (
                  <div
                    key={address._id}
                    className="flex p-2 shadow mb-4 cursor-pointer"
                    onClick={() => handleRadioChange(address._id)}
                  >
                    <input
                      type="radio"
                      className="cursor-pointer"
                      checked={selectedAddress === address._id}
                      onChange={() => {}}
                    />
                    <div className="pl-4">
                      <div>
                        {showButtons && selectedAddress === address._id && (
                          <span
                            className="py-1 px-2 rounded text-white"
                            style={{ backgroundColor: `var(--gray-color)` }}
                          >
                            DELIVERING HERE
                          </span>
                        )}
                        <p className="font-bold pb-1 mt-2">{address.name}</p>
                        <p>
                          {address.street}, {address.city}, {address.state} -{" "}
                          {address.zip}
                        </p>
                        <p className="pt-1">
                          Mobile:{" "}
                          <span className="font-bold">{address.phone}</span>
                        </p>
                      </div>
                      {showButtons && selectedAddress === address._id && (
                        <div className="mt-1">
                          <button
                            className="underline"
                            onClick={() => handleEditAddress(address)}
                          >
                            Edit
                          </button>
                          <button
                            className="ml-3 underline"
                            onClick={() => handleDeleteAddress(address._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No addresses found.</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-8 text-sm font-bold">
          <button
            className="py-2 px-4 rounded"
            style={{ backgroundColor: `var(--highlight-color)` }}
            onClick={handleContinuePayment}
            disabled={!selectedAddress}
          >
            CONTINUE WITH PAYMENT PROCESS
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;