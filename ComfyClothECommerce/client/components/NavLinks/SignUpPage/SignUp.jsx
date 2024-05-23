import React, { useEffect, useState } from "react";
import { useTheme } from "../Theme/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, register } from "../../../actions/AuthActions.jsx";
import "../../css/animations.css";

const initialState = {
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const {
    theme,
    notification,
    setNotification,
    notificationMessage,
    setNotificationMessage,
    notificationColor,
    setNotificationColor,
    handleNotificationColor,
    handleTimeout,
  } = useTheme();

  const [formData, setFormData] = useState(initialState);
  const [touchFields, setTouchFields] = useState({
    name: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.AuthReducer.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    // navigate(-1) // Go back one step in history
    navigate("/");
  };

  const handleBlur = (e) => {
    const fieldData = e.target.name;
    setTouchFields({ ...touchFields, [fieldData]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setTouchFields({
      name: false,
      phone: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
    setLoading(true);
    const emailExists = allUsers.find(
      (user) => user.email === formData.email
    )
    const numberExists = allUsers.find((user) => String(user.phone) === String(formData.phone));

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setNotification(!notification);
      setNotificationColor(handleNotificationColor("error"));
      setNotificationMessage("Please fill in all the fields.");
      handleTimeout();
      setLoading(false);
      return;
    }

    if(formData.phone.length !== 10) {
      setNotification(!notification);
      setNotificationColor(handleNotificationColor("error"));
      setNotificationMessage("The phone number should contain 10 digits");
      handleTimeout();
      setLoading(false);
      return;
    }

    if (numberExists) {
      setNotification(!notification);
      setNotificationColor(handleNotificationColor("failure"));
      setNotificationMessage("User with Number already exists!!!");
      handleTimeout();
      setLoading(false);
      return;
    }
  
    if (emailExists) {
      setNotification(!notification);
      setNotificationColor(handleNotificationColor("failure"));
      setNotificationMessage("User with Email already exists!!!");
      handleTimeout();
      setLoading(false);
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setNotification(!notification);
      setNotificationColor(handleNotificationColor("error"));
      setNotificationMessage("Passwords don't match!!!");
      handleTimeout();
      setLoading(false);
      return;
    }
  
    setNotification(!notification);
    setNotificationColor(handleNotificationColor("success"));
    setNotificationMessage(
      `Congrats ${formData.name}, You have successfully registered !!!`
    );
    handleTimeout();

    dispatch(register(formData));
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  
  return (
    <div
      className={`${
        theme === "dark" ? "dark-theme" : "light-theme"
      } flex justify-center items-center relative`}
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

      <div className="max-w-sm w-full px-6 py-8 rounded-md">
        <h2 className="text-3xl font-semibold text-center mb-8">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Username <span className="text-red-500 text-xl"> *</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full appearance-none border rounded p-3 leading-tight ${
                theme === "dark" ? "border-gray-500" : "border-gray-400"
              } ${touchFields.name && !formData.name && 'border-red-500'} focus:outline-none focus:shadow-outline`}
              style={{ backgroundColor: `var(--body-bg-color)` }}
              required
            />
            {touchFields.name && !formData.name && (
              <p className="text-red-500 text-xs">Name field cannot be empty</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Phone <span className="text-red-500 text-xl"> *</span>
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full appearance-none border rounded p-3 leading-tight ${
                theme === "dark" ? "border-gray-500" : "border-gray-400"
              } ${touchFields.phone && !formData.phone && 'border-red-500'} focus:outline-none focus:shadow-outline`}
              style={{ backgroundColor: `var(--body-bg-color)` }}
              required
            />
            {touchFields.phone && !formData.phone && (
              <p className="text-red-500 text-xs">Phone field cannot be empty</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email <span className="text-red-500 text-xl"> *</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full appearance-none border rounded p-3 leading-tight ${
                theme === "dark" ? "border-gray-500" : "border-gray-400"
              } ${touchFields.email && !formData.email && 'border-red-500'} focus:outline-none focus:shadow-outline`}
              style={{ backgroundColor: `var(--body-bg-color)` }}
              required
            />
            {touchFields.email && !formData.email && (
              <p className="text-red-500 text-xs">
                Email field cannot be empty
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2">
              Password <span className="text-red-500 text-xl"> *</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full appearance-none border rounded p-3 leading-tight ${
                theme === "dark" ? "border-gray-500" : "border-gray-400"
              } ${touchFields.password && !formData.password && 'border-red-500'} focus:outline-none focus:shadow-outline`}
              style={{ backgroundColor: `var(--body-bg-color)` }}
              required
            />
            <div
              className={`absolute right-2 text-2xl ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              } ${
                touchFields.password && !formData.password
                  ? "bottom-5"
                  : "bottom-1"
              }`}
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <ion-icon name="eye-off"></ion-icon>
              ) : (
                <ion-icon name="eye"></ion-icon>
              )}
            </div>
            {touchFields.password && !formData.password && (
              <p className="text-red-500 text-xs">
                Password field cannot be empty
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm Password <span className="text-red-500 text-xl"> *</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full appearance-none border rounded p-3 leading-tight ${
                theme === "dark" ? "border-gray-500" : "border-gray-400"
              } ${touchFields.confirmPassword && !formData.confirmPassword && 'border-red-500'} focus:outline-none focus:shadow-outline`}
              style={{ backgroundColor: `var(--body-bg-color)` }}
              required
            />
            <div
              className={`absolute right-2 text-2xl ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              } ${
                touchFields.confirmPassword && !formData.confirmPassword
                  ? "bottom-5"
                  : "bottom-1"
              }`}
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? (
                <ion-icon name="eye-off"></ion-icon>
              ) : (
                <ion-icon name="eye"></ion-icon>
              )}
            </div>
            {touchFields.confirmPassword && !formData.confirmPassword && (
              <p className="text-red-500 text-xs">
                Please Confirm your Password
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mb-2">
            <button
              type="submit"
              className="w-full tracking-wide text-white font-semibold p-3 rounded focus:outline-none focus:shadow-outline"
              style={{
                backgroundColor: `var(--highlight-color)`,
                transition: `0.3s`,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${
                  theme === "dark" ? "#ec4899" : "#2563eb"
                }`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = `var(--highlight-color)`;
              }}
              disabled={loading}
            >
              {loading ? "REGISTERING ..." : "REGISTER"}
            </button>
          </div>
          <div className="text-center">
            <p>
              Already a member?{" "}
              <Link to="/login" style={{ color: `var(--highlight-color)` }}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div
        className="text-3xl absolute right-5 top-5 cursor-pointer"
        onClick={handleClose}
      >
        <ion-icon name="close"></ion-icon>
      </div>
    </div>
  );
};

export default SignUp;
