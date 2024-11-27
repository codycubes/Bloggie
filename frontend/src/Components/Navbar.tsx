import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { userInfo } = useTypedSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`relative top-0 left-0 w-full z-50 flex justify-between items-center py-5 px-6 bg-transparent text-white transition-transform duration-300 ${
        showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="text-3xl font-black">
        <Link to="/">Logo</Link>
      </div>

      {/* Hamburger menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsHamburgerOpen(true)}
          className="focus:outline-none text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center space-x-6">
        {userInfo ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <span className="text-lg mr-2">{userInfo.name}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Edit Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/registration" className="font-semibold">
              Sign up
            </Link>
            <Link to="/login">
              <button className="border-2 uppercase text-lg py-2 px-5 border-white rounded-full hover:bg-red-600 hover:text-white transition">
                Log In
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Fullscreen Hamburger Menu with Overlay */}
      {isHamburgerOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="fixed inset-0 bg-black opacity-75"></div>
          <div className="absolute w-full h-full flex flex-col justify-center items-center space-y-8 text-white">
            <button
              onClick={() => setIsHamburgerOpen(false)}
              className="absolute top-5 right-5 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {userInfo ? (
              <>
                <Link to="/profile" className="text-2xl">
                  Edit Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="text-2xl border border-white px-4 py-2 rounded-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/registration" className="text-2xl">
                  Sign up
                </Link>
                <Link to="/login" className="text-2xl">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
