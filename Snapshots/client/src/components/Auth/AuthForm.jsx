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
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
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
      <form action="" onSubmit={handleSubmit} className="">
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
                    <input type="file" name="profileImage" className="outline-none border-none my-2" onChange={handleFileChange} />
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