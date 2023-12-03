import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { headerLogo, userImage } from "../../assets/images";
import { navLinks } from "../../constants";
import * as actionType from "../../constants/actionTypes";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true); // Set initial state to true

  const authData = useSelector((state) => state.AuthReducer.authData);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(authData);
  }, [authData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    setVisible(true);
  }, [location]);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  }

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    localStorage.removeItem("profile");
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleProfileModal = () => {
    setProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full bg-white z-20 transition-transform duration-300 ease-in-out transform ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="flex justify-around items-center p-2 shadow-md bg-[#393E46] text-white font-medium z-50 max-lg:hidden">
        <Link to="/" className="flex items-center z-10">
          <img src={headerLogo} alt="header-logo" width={50} className="object-cover"/>
          <h3 className="text-2xl font-bold font-palanquin pl-3">Snapshots</h3>
        </Link>
        <ul className="flex justify-center items-center z-10">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="mr-9 p-1 font-palanquin hover:text-[#393E46] hover:bg-white rounded-md"
            >
              <Link to={link.href} key={link.label}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="z-10">
          {user?.result ? (
            <div className="flex items-center group relative">
              <div className="relative group" onClick={toggleProfileModal}>
                <div className="group cursor-pointer">
                  <img
                    src={user.result?.profileImage || userImage}
                    alt={user.result?.name}
                    className="w-12 h-12 object-cover rounded-full border-2 border-white mr-2 group-hover:opacity-75 transition-opacity"
                  />
                </div>
                {isProfileModalOpen && (
                  <div className="z-50">
                    <div className="absolute left-4 top-[50px] h-3 w-3 bg-gray-200 rotate-45"></div>
                    <div className="w-[200px] flex absolute top-14 left-2 bg-gray-200 text-sm rounded-md p-2 text-[#393E46]">
                      {user.result?.profileImage && (
                        <img
                          src={user.result.profileImage}
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      )}
                      <div className="ml-2">
                        <p>{user.result?.name}</p>
                        <p>{user.result?.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="ml-4 px-3 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:shadow-outline-blue active:bg-gray-950 transition duration-150 ease-in-out"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <button className="ml-4 px-3 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:shadow-outline-blue active:bg-gray-950 transition duration-150 ease-in-out">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>
      <nav className="p-2 shadow-md bg-[#393E46] text-white font-medium lg:hidden">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center z-10 max-sm:flex-col">
            <img
              src={headerLogo}
              alt="header-logo"
              width={50}
              className="max-sm:w-10 object-cover"
            />
            <h3 className="text-2xl font-bold font-palanquin pl-3 max-sm:text-xs">
              Snapshots
            </h3>
          </Link>
          <div className="z-10 absolute right-16">
            {user?.result && (
              <div className="flex items-center group relative">
                <div className="relative group" onClick={toggleProfileModal}>
                  <div className="group cursor-pointer">
                    <img
                      src={user.result?.profileImage || userImage}
                      alt={user.result?.name}
                      className="w-12 h-12 object-cover rounded-full border-2 border-white mr-2 group-hover:opacity-75 transition-opacity"
                    />
                  </div>
                  {isProfileModalOpen && (
                    <>
                      <div className="absolute left-4 top-[50px] h-3 w-3 bg-gray-200 rotate-45"></div>
                      <div className="w-[200px] absolute top-14 right-2 bg-gray-200 text-sm rounded-md p-2 text-[#393E46]">
                        <div className="flex">
                          {user.result?.profileImage && (
                            <img
                              src={user.result.profileImage}
                              alt=""
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                          )}
                          <div className="ml-2 z-50">
                            <p>{user.result?.name}</p>
                            <p>{user.result?.email}</p>
                          </div>
                        </div>
                        <div className="text-center mt-3">
                          <button className="p-1 bg-red-500 text-white rounded" onClick={logout}>
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <button onClick={handleMenuToggle} className="z-10">
            <ion-icon name="menu" class="text-4xl"></ion-icon>
          </button>
        </div>
        <div className={`bg-[#393E46] ${isMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col items-center z-10">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="p-3 text-lg font-palanquin hover:text-[#393E46] hover:bg-white rounded-md"
              >
                <Link to={link.href} key={link.label}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="z-10 text-center pr-10">
            {user?.result ? (
              <button
                className="ml-10 p-2 text-lg font-palanquin bg-red-500 rounded-md"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <Link to="/auth">
                <button className="ml-10 p-2 text-lg font-palanquin bg-green-500 rounded-md">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
