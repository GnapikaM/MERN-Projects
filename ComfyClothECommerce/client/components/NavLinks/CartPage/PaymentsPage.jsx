import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../../actions/OrderActions";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../Theme/ThemeContext";
import OrderConfirm from "./OrderConfirm";
import { fetchCart } from "../../../actions/CartActions";
import StripeCheckout from "./StripeCheckout";

const PaymentsPage = () => {
  const {
    theme,
    notification,
    notificationMessage,
    notificationColor,
  } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    cardHolder: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const [touchFields, setTouchFields] = useState({
    cardNumber: false,
    cvv: false,
    expiryDate: false,
    cardHolder: false,
  });
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAddress, productsInfo, totalAmount } = location.state;

  const user = useSelector((state) => state.AuthReducer.authData);
  const userId = user?.result._id;
  const userName = user?.result.name;
  const userPhone = user?.result?.phone;
  const userEmail = user?.result?.email;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  const cart = useSelector((state) => state.CartReducer.cart);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setIsPaymentMethodSelected(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });

    if (paymentMethod === "creditCard") {
      const isCardNumberValid = paymentDetails.cardNumber.trim() !== "";
      const isExpiryDateValid = paymentDetails.expiryDate.trim() !== "";
      const isCvvValid = paymentDetails.cvv.trim() !== "";
      const isCardHolderValid = paymentDetails.cardHolder.trim() !== "";

      setIsFormValid(
        isCardNumberValid &&
          isExpiryDateValid &&
          isCvvValid &&
          isCardHolderValid
      );
    }
  };

  const handleBlur = (e) => {
    const fieldData = e.target.name;
    setTouchFields({ ...touchFields, [fieldData]: true });
  };

  const handleCreateOrder = async () => {
    dispatch(
      createOrder(
        userId,
        userName,
        userPhone,
        userEmail,
        selectedAddress,
        paymentMethod,
        paymentDetails,
        productsInfo
      )
    );

    setTouchFields({
      cardNumber: false,
      cvv: false,
      expiryDate: false,
      cardHolder: false,
    });
    setShowPopUp(false);
    if (paymentMethod !== "creditCard") {
      navigate("/payments/success");
    }
  };

  const togglePopUp = () => setShowPopUp(!showPopUp);

  const handleBack = () => {
    navigate(-1);
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
      {notification && (
        <div className="notification-container max-sm:w-full max-sm:text-center">
          <div
            className={`notification ${
              notification ? "notification-visible" : ""
            }`}
            style={{ backgroundColor: notificationColor }}
          >
            {notificationMessage}
          </div>
        </div>
      )}
      <div
        className="px-5 pt-5 text-2xl flex items-center cursor-pointer"
        onClick={handleBack}
      >
        <ion-icon name="arrow-undo-outline"></ion-icon>
        <span className="text-lg ml-2">Back</span>
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className={`px-8 rounded w-full sm:w-96`}>
          <h1 className="text-2xl font-bold mb-8">Payment Details</h1>
          <div className="flex flex-col space-y-4">
            <label htmlFor="paymentMethod" className="block">
              Select Payment Method{" "}
              <span className="text-red-500 text-xl"> *</span>
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              className="form-select w-full border p-2 rounded outline-none"
              style={{
                backgroundColor: `var(--body-bg-color)`,
                borderColor: `var(--highlight-color)`,
              }}
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="select">Select...</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>
          {paymentMethod === "creditCard" && (
            <div className="mt-4">
              <StripeCheckout
                selectedAddress={selectedAddress}
                totalAmount={totalAmount}
                handleCreateOrder={handleCreateOrder}
              />
            </div>
          )}
          {paymentMethod === "paypal" && (
            <div className="mt-4">
              <p style={{ color: `var(--gray-color)` }}>
                You will be redirected to PayPal's website to complete your
                purchase.
              </p>
            </div>
          )}
          {paymentMethod === "bankTransfer" && (
            <div className="mt-4" style={{ color: `var(--gray-color)` }}>
              <p>Please make a bank transfer to the following account:</p>
              <p>Account Number: XXXXXXXX</p>
              <p>Bank: XXX Bank</p>
              <p>Reference: Your Order ID</p>
            </div>
          )}
          <div className="text-center">
            {paymentMethod !== "creditCard" && (
              <button
                type="submit"
                className="mt-4 py-2 px-4 rounded font-bold"
                style={{
                  backgroundColor: `var(--highlight-color)`,
                  color: `var(--text-color)`,
                }}
                onClick={togglePopUp}
                disabled={
                  !isPaymentMethodSelected ||
                  (paymentMethod === "creditCard" && !isFormValid)
                }
              >
                PAY NOW
              </button>
            )}
          </div>
        </div>
        {!isPaymentMethodSelected && (
          <div className="w-[350px] mt-5 max-sm:w-full">
            <div className="flex justify-between mb-5 max-sm:mx-3">
              <h2 className="font-bold">Your Items</h2>
              <p className="font-bold">&#8377; {totalAmount}</p>
            </div>
            {cart.map((item) => (
              <div key={item._id} className="flex my-2 border p-2 max-sm:mx-3" style={{borderColor: `var(--gray-color)`}}>
                <div className="h-24 mr-3">
                  <img src={item.image} alt="" className="h-full" />
                </div>
                <div className="text-sm">
                  <h2 className="mb-1 font-bold">{item.company}</h2>
                  <p className="mb-1 font-semibold">{item.name}</p>
                  <p className="mb-1 font-medium">Qty: {item.quantity}</p>
                  <p className="mb-1 font-medium">Size: {item.size}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {showPopUp && (
          <OrderConfirm
            productsInfo={productsInfo}
            handleCreateOrder={handleCreateOrder}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
