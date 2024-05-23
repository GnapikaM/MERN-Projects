import React, { useEffect, useState } from "react";
import { useTheme } from "../Theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, fetchAddresses } from "../../../actions/AddressActions";

const AddAddress = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = authData?.result?._id;
  const allAddresses = useSelector((state) => state.AddressReducer.addresses);

  useEffect(() => {
    dispatch(fetchAddresses(userId));
  }, [dispatch, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAddress(userId, shippingAddress));
  };

  const handleBack = () => {
    navigate("/bag");
  };

  const handleDeleteAddress = (id) => {
    dispatch(deleteAddress(id, userId));
  }

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
      <div className="flex justify-around">
      <div className="absoulte left-0 top-0">
          <button onClick={handleBack}>BACK</button>
        </div>
        <div className="absoulte right-0 top-0">
          <button>NEXT</button>
        </div>
      </div>
      <div className="max-w-md mx-auto pt-32 pb-16">
        <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="John Doe"
                name="name"
                value={shippingAddress.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="123-456-7890"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="street"
            >
              Street Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="street"
              type="text"
              placeholder="123 Main St"
              name="street"
              value={shippingAddress.street}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                placeholder="New York"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="state"
              >
                State
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                type="text"
                placeholder="NY"
                name="state"
                value={shippingAddress.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="zip"
              >
                ZIP Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="zip"
                type="text"
                placeholder="10001"
                name="zip"
                value={shippingAddress.zip}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Continue to Shipping Options
            </button>
          </div>
        </form>
        {allAddresses ? (
          allAddresses.map((address) => (
            <div key={address._id} className="flex justify-between">
              <p>
                {address.name}, {address.phone}, {address.street},{address.city}
                , {address.state}, {address.zip}
              </p>
              <button onClick={() => handleDeleteAddress(address._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No addresses found.</p>
        )}
      </div>
    </div>
  );
};

export default AddAddress;
XMLDocument;
