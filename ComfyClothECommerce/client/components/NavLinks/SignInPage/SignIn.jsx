import React, { useState, useEffect } from "react";
import { useTheme } from "../Theme/ThemeContext";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../actions/AuthActions";

const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(user || initialState);

  const [touchFields, setTouchFields] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    const emailFromSignUp = localStorage.getItem('signUpEmail');
    if (emailFromSignUp) {
      setFormData({ ...formData, email: emailFromSignUp });
      localStorage.removeItem('signUpEmail');
    }
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleClose = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const fieldName = e.target.name;
    setTouchFields({ ...touchFields, [fieldName]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouchFields({ name: false, password: false });
    setLoading(true);

    if (!formData.email || !formData.password) {
      setNotification(true);
      setNotificationColor(handleNotificationColor("error"));
      setNotificationMessage("Please fill in all the fields.");
      handleTimeout();
      setLoading(false);
      return;
    }
    dispatch(
      login(
        formData,
        navigate,
        setFormData,
        initialState,
        setNotification,
        setNotificationMessage,
        setNotificationColor,
        setLoading
      )
    );
  };
  
  return (
    <div
      className={`${
        theme === "dark" ? "dark-theme" : "light-theme"
      } flex justify-center items-center`}
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
        <h2 className="text-3xl font-semibold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
              <span className="text-red-500 text-xl"> *</span>
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
              <p className="text-xs text-red-500">Email field cannot be empty</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2">
              Password
              <span className="text-red-500 text-xl"> *</span>
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
              <p className="text-xs text-red-500">
                Password field cannot be empty
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
              {loading ? "LOGGING YOU IN ..." : "LOGIN"}
            </button>
          </div>
          <div className="text-center">
            <p>
              Not a member yet?{" "}
              <Link to="/register" style={{ color: `var(--highlight-color)` }}>
                Register
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

export default SignIn;
