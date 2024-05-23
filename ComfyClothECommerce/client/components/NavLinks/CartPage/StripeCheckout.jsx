import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "../../../actions/AddressActions";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PEW0FSEhT928vkDah37lT6lC8g4CIMS4i9UxlIucgQQTNr602DJZ8RjOKvwhouCH4d8roU4oQHXylzRQJgkEsZ10095JnZLjQ"
);

const CheckoutForm = ({ selectedAddress, totalAmount, handleCreateOrder }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.authData);
  const allAddresses = useSelector((state) => state.AddressReducer.addresses);

  useEffect(() => {
    if (user?.result?._id) {
      dispatch(fetchAddresses(user.result._id));
    }
  }, [dispatch, user?.result?._id]);

  const customerAddress = allAddresses.find(
    (address) => address._id === selectedAddress
  );

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!customerAddress) return;

      try {
        const response = await axios.post(
          "http://localhost:3000/create-payment-intent",
          {
            amount: totalAmount,
            description: "Your payment description here",
            customerAddress,
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error(
          "Error fetching client secret:",
          error.response ? error.response.data : error.message
        );
      }
    };

    createPaymentIntent();
  }, [customerAddress]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !elements.getElement(CardNumberElement) ||
      !elements.getElement(CardExpiryElement) ||
      !elements.getElement(CardCvcElement)
    ) {
      setError("Please fill in all card details.");
      return;
    }

    if (!postalCode.trim()) {
      setError("Please fill in the postal code.");
      return;
    }

    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          address: {
            postal_code: postalCode,
          },
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
      // Navigate to failure page
      navigate("/payments/failure");
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      // Navigate to success page
      navigate("/payments/success");
      handleCreateOrder();
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">
          Card Number <span className="text-xl text-red-500">*</span>
        </label>
        <CardNumberElement
          id="card-number-element"
          className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring"
        />
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium">
            Expiry Date <span className="text-xl text-red-500">*</span>
          </label>
          <CardExpiryElement
            id="card-expiry-element"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium">
            CVC <span className="text-xl text-red-500">*</span>
          </label>
          <CardCvcElement
            id="card-cvc-element"
            className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2 text-sm font-medium">
          Postal Code <span className="text-xl text-red-500">*</span>
        </label>
        <input
          type="text"
          id="postal-code"
          value={postalCode}
          placeholder="12345"
          onChange={(e) => setPostalCode(e.target.value)}
          className="p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none"
          style={{backgroundColor: `var(--body-bg-color)`}}
        />
      </div>
      <div className="text-center">
        <button
          disabled={processing || succeeded}
          id="submit"
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 disabled:bg-gray-400"
        >
          <span id="button-text">
            {processing ? "PROCESSING..." : "PAY NOW"}
          </span>
        </button>
      </div>
      {error && (
        <div className="card-error text-red-500 mt-2" role="alert">
          {error}
        </div>
      )}
      {succeeded && (
        <p className="result-message text-green-500 mt-2">Payment succeeded!</p>
      )}
    </form>
  );
};

const StripeCheckout = ({ selectedAddress, totalAmount, handleCreateOrder }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        selectedAddress={selectedAddress}
        totalAmount={totalAmount}
        handleCreateOrder={handleCreateOrder}
      />
    </Elements>
  );
};

export default StripeCheckout;
