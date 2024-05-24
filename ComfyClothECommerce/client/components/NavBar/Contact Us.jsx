import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../actions/ContactActions";
import { useTheme } from "../NavLinks/Theme/ThemeContext";
import { ScrollToTop } from "../NavLinks/HomePage/Components";

const ContactUs = () => {
  const {
    theme,
    notification,
    notificationMessage,
    notificationColor,
    setNotification,
    setNotificationMessage,
    setNotificationColor,
    handleTimeout,
  } = useTheme();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touchFields, setTouchFields] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const { name, email, subject, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    const fieldName = e.target.name;
    setTouchFields({ ...touchFields, [fieldName]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(formData));
    setNotification(true);
    setNotificationColor("green");
    setNotificationMessage("Thank You for contacting us !!!");
    setTimeout(() => {
      setNotification(false);
    }, 2000);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setTouchFields({
      name: false,
      email: false,
      subject: false,
      message: false,
    });
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
      <div className="pt-32 pb-16 max-[550px]:pt-36">
        {notification && (
          <div className="fixed top-6 text-center left-1/2 right-0 z-40 notification-container max-sm:w-full max-sm:text-center">
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
        <ScrollToTop />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="text-3xl font-extrabold sm:text-4xl"
              style={{ color: `var(--text-color)` }}
            >
              Contact Us
            </h2>
            <p className="mt-4 text-lg" style={{ color: `var(--gray-color)` }}>
              We'd love to hear from you!
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Contact Information
              </h3>
              <div
                className="flex items-center mb-2"
                style={{ color: `var(--gray-color)` }}
              >
                <div className="text-2xl mr-2">
                  <ion-icon name="map"></ion-icon>
                </div>
                <span>123 Street Name, City, Country</span>
              </div>
              <div
                className="flex items-center mb-2"
                style={{ color: `var(--gray-color)` }}
              >
                <div className="text-2xl mr-2">
                  <ion-icon name="mail"></ion-icon>
                </div>
                <span>contact@example.com</span>
              </div>
              <div
                className="flex items-center"
                style={{ color: `var(--gray-color)` }}
              >
                <div className="text-2xl mr-2">
                  <ion-icon name="call"></ion-icon>
                </div>
                <span>+1234567890</span>
              </div>
            </div>
            <div
              className="rounded-lg shadow-xl p-6"
              style={{ color: `var(--text-color)` }}
            >
              <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name <span className="text-red-500 text-xl">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 p-2 border rounded-md w-full"
                    style={{
                      backgroundColor: `var(--body-bg-color)`,
                      borderColor: `var(--gray-color)`,
                    }}
                    required
                  />
                  {touchFields.name && !name && (
                    <p className="text-xs text-red-500">
                      Name field cannot be empty
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email <span className="text-red-500 text-xl">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 p-2 border rounded-md w-full"
                    style={{
                      backgroundColor: `var(--body-bg-color)`,
                      borderColor: `var(--gray-color)`,
                    }}
                    required
                  />
                  {touchFields.email && !email && (
                    <p className="text-xs text-red-500">
                      Email field cannot be empty
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium"
                  >
                    Subject <span className="text-red-500 text-xl">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 p-2 border rounded-md w-full"
                    style={{
                      backgroundColor: `var(--body-bg-color)`,
                      borderColor: `var(--gray-color)`,
                    }}
                    required
                  />
                  {touchFields.subject && !subject && (
                    <p className="text-xs text-red-500">
                      Subject field cannot be empty
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Message <span className="text-red-500 text-xl">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 p-2 border rounded-md w-full"
                    style={{
                      backgroundColor: `var(--body-bg-color)`,
                      borderColor: `var(--gray-color)`,
                    }}
                    required
                  ></textarea>
                  {touchFields.message && !message && (
                    <p className="text-xs text-red-500">
                      Please enter a message
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-md font-bold hover:rounded-full"
                    style={{
                      backgroundColor: `var(--highlight-color)`,
                      color: `var(--text-color)`,
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-16">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124079.74569014557!2d79.3440998335296!3d13.62780572198372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b0f88620427%3A0xcf4152d1daca0cac!2sTirupati%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1713788223605!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-16 flex justify-center">
            <a href="#" className="mr-4" style={{ color: `var(--gray-color)` }}>
              <div className="text-2xl mr-2">
                <ion-icon name="logo-instagram"></ion-icon>
              </div>
            </a>
            <a href="#" className="mr-4" style={{ color: `var(--gray-color)` }}>
              <div className="text-2xl mr-2">
                <ion-icon name="logo-facebook"></ion-icon>
              </div>
            </a>
            <a href="#" style={{ color: `var(--gray-color)` }}>
              <div className="text-2xl mr-2">
                <ion-icon name="logo-twitter"></ion-icon>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
