import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signin, signup } from "../../actions/Auth";

const initialState = {
  firstName: "",
  lastName: "",
  profileImage: null,
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthForm = ({ isSignup, setSignup }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(user || initialState);
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTimeOut = () => {
    setTimeout(() => setNotification(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = existingUsers.find(
      (user) => user.email === formData.email
    );

    if (emailExists) {
      setNotification(!notification);
      setNotificationMessage(
        "User already exists in the database. Please use a different email."
      );
      handleTimeOut();
      return;
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      setNotification(!notification);
      setNotificationMessage("Passwords Don't Match !!!");
      handleTimeOut();
    }

    if (isSignup) {
      setNotification(!notification);
      setNotificationMessage(
        `Congrats ${formData.firstName}, You have successfully signed up !!!`
      );
      handleTimeOut();

      const updatedUsers = [...existingUsers, formData];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setFormData(initialState);
    setSignup(!isSignup);
    setShowPassword(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (e.target.name === "profileImage") {
          setFormData({ ...formData, profileImage: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearSelection = (field) => {
    setFormData({ ...formData, [field]: null });
  };

  return (
    <div>
      {notification && (
        <div className="fixed top-24 left-[50%] transition-transform -translate-x-1/2 -translate-y-1/2 bg-[#00ADB5] z-[1000] text-white py-2 px-4 text-lg font-semibold rounded shadow-md">
          <p>{notificationMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid">
          {isSignup && (
            <>
              <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
                <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full">
                  <label htmlFor="">First Name: </label>
                </div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your First Name*"
                  className="outline-none p-2 w-3/4 max-sm:w-full my-1"
                  required
                  autoFocus
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
                <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full">
                  <label htmlFor="">Last Name: </label>
                </div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Your Last Name*"
                  className="outline-none p-2 w-3/4 max-sm:w-full my-1"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                {!formData.profileImage ? (
                  <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
                    <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full">
                      <label htmlFor="profileImage">Profile Image: </label>
                    </div>
                    <input
                      type="file"
                      name="profileImage"
                      className="outline-none border-none my-2"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="flex items-center mr-2 font-semibold text-base max-sm:w-full">
                      <label htmlFor="profileImage">Profile Image: </label>
                      <img
                        src={formData.profileImage}
                        alt="preview"
                        className="h-16 w-16 object-cover rounded-md m-2"
                      />
                      <button
                        className="ml-2 bg-white text-[#393E46] p-1 rounded hover:scale-105 hover:transition-all font-medium"
                        onClick={() => handleClearSelection("profileImage")}
                      >
                        Clear Selection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
            <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full">
              <label htmlFor="">Email: </label>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your Email*"
              className="outline-none p-2 w-3/4 max-sm:w-full my-1"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
            <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full">
              <label htmlFor="">Password: </label>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your password*"
              className="outline-none p-2 w-3/4 max-sm:w-full my-1"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            {isSignup && (
              <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
                <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full">
                  <label htmlFor="">Confirm Password: </label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password*"
                  className="outline-none p-2 w-3/4 max-sm:w-full my-1"
                  required
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
          <div
            className="flex items-center justify-center bg-[#393E46] w-[130px] text-white py-1 rounded-md cursor-pointer"
            onClick={handleShowPassword}
          >
            <div className="text-sm">
              {showPassword ? <p>Hide Password</p> : <p>Show Password</p>}
            </div>
            <div className="relative top-[2.5px] ml-1">
              {showPassword ? (
                <ion-icon name="eye-off"></ion-icon>
              ) : (
                <ion-icon name="eye"></ion-icon>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="my-4 bg-[#393E46] hover:bg-[#00ADB5] text-white py-2 rounded-full transition-all"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
          <div className="text-center mt-2">
            <button onClick={switchMode}>
              {isSignup
                ? "Already have an account? Sign In"
                : `Don't have an account? Sign Up`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
