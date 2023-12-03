import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { contact } from "../../../actions/Contact";

const initialState = {
  name: "",
  email: "",
  message: "",
};

const ContactUs = () => {
  const [contactData, setContactData] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    dispatch(contact(contactData));
    
    setTimeout(() => {
      setIsSubmitted(false);
      setContactData(initialState);
    }, 3000);
  };

  const handleInputChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-16 mx-auto p-8">
      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <div className="text-center bg-gray-800 text-white py-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p>Feel free to reach out to us</p>
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
          {isSubmitted && (
            <div>
              <p className="text-center mb-4 text-[#FF2E63]">
                Thank you for sending us a message !!!
              </p>
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Name"
              onChange={handleInputChange}
              value={contactData.name}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Email"
              onChange={handleInputChange}
              value={contactData.email}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Your Message"
              onChange={handleInputChange}
              value={contactData.message}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
