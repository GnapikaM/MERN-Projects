import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { navLinks } from "../../constants";
import { useTheme } from "../NavLinks/Theme/ThemeContext";

import "../css/theme.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/AuthActions";

const NavBar = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [showDropdown, setShowDropdown] = useState(false);

  const navRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bagItems = useSelector((state) => state.CartReducer.cart);

  const { theme, toggleTheme } = useTheme();

  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = authData?.result?._id;

  useEffect(() => {
    setUser(authData);
  }, [authData]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  const handleEditProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEditProfile = () => {
    if (userId) {
      navigate("/manageAccount", {
        state: {
          userId,
        },
      });
    }
    setShowDropdown(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate("/login");
  };

  if (
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/addAddress" ||
    location.pathname === "/addressPage" ||
    location.pathname === "/payments" ||
    location.pathname === "/manageAccount" ||
    location.pathname === "/payments/success" || 
    location.pathname === "/payments/failure"
  ) {
    return null;
  }

  const renderAuthLinks = () => {
    if (user?.result) {
      return (
        <>
          <p>Hello, {user.result?.name}</p>
          <div className="relative" ref={navRef}>
            <button
              className="mx-10 max-sm:m-0 hover:underline"
              onClick={handleEditProfileClick}
            >
              Profile
            </button>
            {showDropdown && (
              <div
                className={`absolute flex flex-col w-60 z-20 top-5 right-0 mt-2 pt-5 rounded-md shadow-lg ${
                  theme === "dark" ? `bg-gray-800` : `bg-gray-100`
                }`}
              >
                <div className="flex flex-col items-center">
                  <p className="mb-1 font-bold">{user.result?.name}</p>
                  <p>{user.result?.email}</p>
                </div>
                <button
                  className={`block mt-5 mb-2 border mx-4 rounded-full px-4 py-2 text-sm hover:bg-opacity-80 transition-all ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                  style={{ borderColor: `var(--gray-color)` }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  className={`block mb-5 mx-4 rounded-full px-4 py-2 text-sm bg-red-500 transition-all text-white`}
                  onClick={handleEditProfile}
                >
                  Delete your account
                </button>
              </div>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" className="cursor-pointer hover:underline">
            Sign in
          </Link>
          <Link
            to="/register"
            className="mx-10 max-sm:m-0 cursor-pointer hover:underline"
          >
            Create Account
          </Link>
        </>
      );
    }
  };

  const navLinkItems = navLinks.map((link) => (
    <li
      key={link.label}
      className="transition-all font-montserrat text-[15px] max-lg:text-[15px] font-medium"
      style={{ color: `var(--text-color)` }}
    >
      <Link
        to={link.href}
        key={link.label}
        className="p-2 mx-2 max-lg:p-1 max-lg:mx-1"
      >
        {link.label}
      </Link>
    </li>
  ));

  const additionalNavOptions = () => (
    <>
      <li className="transition-all">
        <Link
          to="/wishlist"
          className="relative flex flex-col items-center p-2 max-lg:p-1"
          style={{ color: `var(--text-color)` }}
        >
          <div className="lg:text-xl text-2xl pr-1">
            <ion-icon name="heart-outline"></ion-icon>
          </div>
          <p className="text-xs font-semibold my-[-4px] max-lg:hidden">
            Wishlist
          </p>
        </Link>
      </li>
      <li className="transition-all relative">
        <Link
          to="/bag"
          className="relative flex flex-col items-center p-2 max-lg:p-1"
          style={{ color: `var(--text-color)` }}
        >
          <div className="lg:text-xl text-2xl pr-1">
            <ion-icon name="bag-outline"></ion-icon>
          </div>
          <p className="text-xs font-semibold my-[-4px] max-lg:hidden">Bag</p>
          <p
            className="absolute top-1 right-1 px-1 rounded-full text-sm font-bold"
            style={{ backgroundColor: `var(--highlight-color)` }}
          >
            {bagItems && bagItems.length}
          </p>
        </Link>
      </li>
    </>
  );

  return (
    <header
      ref={navRef}
      className={`shadow-md fixed top-0 left-0 w-full z-20 transition-transform duration-300 ease-in-out transform ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{ backgroundColor: `var(--header-bg-color)` }}
    >
      <div
        className="flex justify-end text-sm font-sans py-2 max-sm:justify-around"
        style={{
          color: `var(--light-text-color)`,
          backgroundColor: `var(--body-bg-color)`,
        }}
      >
        {renderAuthLinks()}
      </div>

      <nav className="py-2 flex items-center justify-around">
        <h1
          className="text-2xl font-semibold font-montserrat max-lg:text-xl"
          style={{ color: `var(--text-color)` }}
        >
          <span
            className="font-bold text-3xl max-lg:text-2xl"
            style={{ color: `var(--highlight-color)` }}
          >
            C
          </span>
          omfy
          <span
            className="font-bold text-3xl max-lg:text-2xl"
            style={{ color: `var(--highlight-color)` }}
          >
            C
          </span>
          loth
        </h1>

        <div>
          <ul
            className={`flex items-center max-[550px]:justify-center max-[550px]:py-3 max-[550px]:w-full max-[550px]:absolute max-[550px]:top-[88px] max-[550px]:left-0`}
            style={{ backgroundColor: `var(--header-bg-color)` }}
          >
            {navLinkItems}
          </ul>
        </div>

        <div>
          <ul
            className={`flex ${
              theme === "dark" ? "bg-slate-800" : "bg-slate-200"
            }`}
          >
            {additionalNavOptions()}

            <button
              className={`lg:text-xl text-2xl transition-all px-1 py-2 max-lg:p-0 hover:rounded ${
                theme === "light" ? "hover:bg-slate-300" : "hover:bg-slate-800"
              }`}
              style={{ color: `var(--text-color)` }}
              onClick={toggleTheme}
            >
              <ion-icon name={theme === "light" ? "sunny" : "moon"}></ion-icon>
              <p className="text-xs font-semibold my-[-4px] max-lg:hidden">
                Theme
              </p>
            </button>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
