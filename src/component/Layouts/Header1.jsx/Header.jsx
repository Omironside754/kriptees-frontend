import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import "./Header.css";
import { toast } from "react-toastify";
import Cart from "../../Cart/Cart";
import AisaSideMenuIcon from "./AisaSideMenuIcon";

// Helper component for the right-arrow icon (rotates 90° when open)
function SubmenuArrow({ isOpen }) {
  return (
    <svg
      className={`inline-block ml-1 w-3 h-3 transition-transform ${isOpen ? "rotate-90" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const { isAuthenticated, user } = useSelector((state) => state.userData);
  const { cartItems } = useSelector((state) => state.cart);
  const cartItemCount = cartItems.length;

  // Local UI states
  const [isScrolled, setIsScrolled] = useState(false);
  const [info, setInfo] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sideMenu, setSideMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // For side menu slide animation
  const [sideMenuAnimation, setSideMenuAnimation] = useState("-translate-x-full");

  // Track which submenu is open (for Collections, Winterwears, etc.)
  const [openSubmenu, setOpenSubmenu] = useState(null);

  function toggleSubmenu(menuName) {
    if (openSubmenu === menuName) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(menuName);
    }
  }

  // Refs
  const sideref = useRef(null);

  // === Scroll logic ===
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === Close user dropdown if clicked outside (desktop) ===
  useEffect(() => {
    function handleClickOutside(e) {
      if (sideref.current && !sideref.current.contains(e.target)) {
        setInfo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sideref]);

  // === Animate the side menu like the cart ===
  useEffect(() => {
    if (sideMenu) {
      setTimeout(() => setSideMenuAnimation("translate-x-0"), 50);
    } else {
      setSideMenuAnimation("-translate-x-full");
    }
  }, [sideMenu]);

  // Prevent background scrolling when side menu is open
  useEffect(() => {
    if (sideMenu) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [sideMenu]);

  // Close side menu on route change
  useEffect(() => {
    setSideMenu(false);
  }, [navigate]);

  // === Profile dropdown handlers (desktop) ===
  function dashboardHandler() {
    setInfo(false);
    navigate("/admin/dashboard");
  }
  function accountHandler() {
    setInfo(false);
    navigate("/account");
  }
  function ordersHandler() {
    setInfo(false);
    navigate("/orders");
  }
  function logoutUserHandler() {
    setInfo(false);
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  // === Cart open/close ===
  const cartHandler = () => {
    setInfo(false);
    setIsCartOpen(true);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // === Wishlist & user icon ===
  function wishlistHandler() {
    setInfo(false);
    navigate("/wishlist");
  }
  function userIconClick() {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setInfo(!info);
    }
  }

  // === Search logic ===
  function handleSearchButtonClick() {
    setSearchBarActive(!searchBarActive);
  }
  function handleSearchInputChange(e) {
    setSearchValue(e.target.value);
  }
  function handleSearchFormSubmit(e) {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products/${searchValue}`);
    } else {
      navigate("/products");
    }
  }
  function handleCrossButtonClick() {
    setSearchValue("");
    setSearchBarActive(false);
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-300
          bg-white shadow-lg
        `}
      >
        <div className="transition-all duration-300 py-2">
          <div className="max-w-screen-xl mx-auto px-2 flex items-center justify-between">
            {/* LEFT: Mobile Menu Icon */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setSideMenu(true)}>
                <AisaSideMenuIcon />
              </button>
            </div>

            {/* CENTER: Logo */}
            <div className="flex justify-center items-center lg:flex-none">
              <Link to="/" className="kriptees-main">
                KRIPTEES
              </Link>
            </div>

            {/* RIGHT: Desktop Nav */}
            <nav className="hidden md:flex space-x-6"
            style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}>
              <div className="relative group">
                <button className="uppercase tracking-widest font-semibold flex items-center">
                  COLLECTIONS
                  <svg
                    className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute right-0  min-w-[150px] bg-white text-black text-xs shadow-lg border border-gray-200 rounded hidden group-hover:block divide-y divide-gray-200">
                  <Link to="/NewArrival" className="block px-4 py-2 hover:bg-gray-100 uppercase tracking-widest">
                    NEW ARRIVALS
                  </Link>
                  <Link to="/collections/kriptees-spc" className="block px-4 py-2 hover:bg-gray-100 uppercase tracking-widest">
                    KRIPTEES SPC.
                  </Link>
                  <Link to="/collections/anime-arc" className="block px-4 py-2 hover:bg-gray-100 uppercase tracking-widest">
                    ANIME ARC
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="uppercase tracking-widest font-semibold flex items-center">
                  WINTERWEARS
                  <svg
                    className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute right-0  min-w-[150px] text-xs bg-white text-black shadow-lg border border-gray-200 rounded hidden group-hover:block divide-y divide-gray-200">
                  <Link to="/Hoodies" className="block px-4 py-2 hover:bg-gray-100 uppercase tracking-widest">
                    HOODIES
                  </Link>
                  <Link to="/Sweatshirts" className="block px-4 py-2 hover:bg-gray-100 uppercase tracking-widest">
                    SWEATSHIRTS
                  </Link>
                </div>
              </div>

              <NavLink
                to="/Tshirt"
                className={({ isActive }) =>
                  isActive
                    ? "uppercase tracking-widest font-semibold"
                    : "uppercase tracking-widest hover:text-blue-600 font-semibold transition"
                }
              >
                TSHIRTS
              </NavLink>

              <NavLink
                to="/customise"
                className={({ isActive }) =>
                  isActive
                    ? "uppercase tracking-widest font-semibold"
                    : "uppercase tracking-widest hover:text-blue-600 font-semibold transition"
                }
              >
                CUSTOM
              </NavLink>
            </nav>

            {/* Icons (Search, User, Wishlist, Cart) */}
            <div className="flex items-center gap-1 md:gap-0">
              {/* Search */}
              <button
                onClick={handleSearchButtonClick}
                className=" md:px-3 transition hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18 9.5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.736 6.024a8 8 0 1 1 .71-.704l4.62 4.62a.5.5 0 1 1-.707.706l-4.623-4.622Z"
                  ></path>
                </svg>
              </button>

              {/* User (desktop only) */}
              <div className="relative hidden md:block" ref={sideref}
              style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}>
                <button
                  onClick={userIconClick}
                  className="px-2 md:px-3 mt-2 relative transition hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 5.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm-12.5 14c0-2.143.486-3.732 1.596-4.796C7.212 13.634 9.058 13 12 13c2.942 0 4.788.635 5.904 1.704 1.11 1.064 1.596 2.652 1.596 4.796a.5.5 0 0 0 1 0c0-2.275-.514-4.186-1.904-5.518C17.212 12.656 15.058 12 12 12c-3.058 0-5.212.656-6.596 1.982C4.014 15.314 3.5 17.225 3.5 19.5a.5.5 0 0 0 1 0Z"
                    ></path>
                  </svg>
                </button>
                {info && (
                  <div className="absolute right-0 mt-2 min-w-[150px] text-xs bg-white text-black shadow-lg border border-gray-200 rounded divide-y divide-gray-200 z-50">
                    {user?.role === "admin" && (
                      <button
                        onClick={dashboardHandler}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 uppercase tracking-widest"
                      >
                        DASHBOARD
                      </button>
                    )}
                    <button
                      onClick={accountHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 uppercase tracking-widest"
                    >
                      PROFILE
                    </button>
                    <button
                      onClick={ordersHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 uppercase tracking-widest"
                    >
                      ORDERS
                    </button>
                    <button
                      onClick={cartHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 uppercase tracking-widest"
                    >
                      CART
                    </button>
                    <button
                      onClick={logoutUserHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 uppercase tracking-widest"
                    >
                      SIGN OUT
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist (desktop only) */}
              <button
                onClick={wishlistHandler}
                className="px-2 md:px-3 transition hover:-translate-y-1 hover:scale-110 duration-300 relative hidden md:block"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="none"
                    strokeWidth="1"
                  />
                </svg>
              </button>

              {/* Cart */}
              <button
                onClick={cartHandler}
                className="ml-1 mr-2 md:px-3 transition hover:-translate-y-1 hover:scale-110 duration-300 relative"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="16.75" cy="19.949" r=".75"></circle>
                  <circle cx="9.75" cy="19.949" r=".75"></circle>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18 18.2a.5.5 0 0 0 0-1h-7.99
                      a2.5 2.5 0 0 1-2.46-2.06l-.123-.688
                      h9.16a2.5 2.5 0 0 0 2.355-1.66
                      l1.55-4.34a1.5 1.5 0 0 0-1.413
                      -2.004H5.997l-.065-.364A3.5 3.5 0 0 0 2.488 3.2h-.99a.5.5 0 1 0 0 1h.99a2.5 
                      2.5 0 0 1 2.06 1.997l1.617 9.057
                      a3.5 3.5 0 0 0 3.446 2.884H18
                      M6.176 7.45l12.903-.001
                      a.5.5 0 0 1 .47.668
                      l-1.548 4.34a1.5 1.5 0 0 
                      1-1.413.996h-9.34L6.176 7.45Z"
                  ></path>
                </svg>
                <div className="absolute">
                  {cartItemCount > 0 && (
                    <span className="bg-gray-600 text-white border text-xs relative bottom-9 left-4 py-0.5 px-1.5 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ========== MOBILE SIDE MENU ========== */}
        {(sideMenu || sideMenuAnimation !== "-translate-x-full") && (
          <div className="fixed inset-0 z-50 flex md:hidden tracking-widest">
            {/* Dark overlay (click to close) */}
            <div
              className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-500"
              style={{ opacity: sideMenuAnimation === "translate-x-0" ? 1 : 0 }}
              onClick={() => setSideMenu(false)}
            />
            {/* Slide-in drawer from the left */}
            <div
              className={`
                relative z-10
                transition-transform duration-700 ease-in-out
                transform ${sideMenuAnimation}
                w-64 max-w-[70%] bg-black text-white h-full
              `}
            >
              {/* Close Button (X) in top-right corner */}
              <button
                onClick={() => setSideMenu(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-4 mt-8">
                {/* Profile Section with border below */}
                {isAuthenticated && user ? (
                  <div className="flex flex-row items-center gap-4 mb-4 border-b border-white pb-4">
                    {/* Circular profile with first letter */}
                    <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl font-semibold">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    {/* Name + EDIT in a column */}
                    <div className="flex flex-col items-start">
                      <span className="uppercase text-base font-medium">{user.name}</span>
                      <button
                        onClick={() => {
                          navigate("/account");
                          setSideMenu(false);
                        }}
                        className="mt-1 text-xs border-b border-white uppercase text-white"
                      >
                        EDIT
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 text-center">
                    <Link to="/login" className="uppercase text-base font-medium" onClick={() => setSideMenu(false)}>
                      SIGN IN
                    </Link>
                  </div>
                )}

                {/* Navigation Items */}
                <nav className="space-y-4 text-base font-normal tracking-widest uppercase"
                style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}>
                  {/* Dashboard link for admin, placed right below HOME */}
                  {isAuthenticated && user?.role === "admin" && (
                    <Link to="/admin/dashboard" onClick={() => setSideMenu(false)} className="block hover:text-gray-300">
                      DASHBOARD
                    </Link>
                  )}
                  {/* HOME */}
                  <Link to="/" onClick={() => setSideMenu(false)} className="block hover:text-gray-300">
                    HOME
                  </Link>
                  
                  {/* WISHLIST */}
                  <button
                    onClick={() => {
                      setSideMenu(false);
                      wishlistHandler();
                    }}
                    className="block hover:text-gray-300 w-full text-left"
                  >
                    WISHLIST
                  </button>
                  {/* COLLECTIONS Submenu */}
                  <button onClick={() => toggleSubmenu("collections")} className="block hover:text-gray-300 w-full text-left">
                    COLLECTIONS
                    <SubmenuArrow isOpen={openSubmenu === "collections"} />
                  </button>
                  {openSubmenu === "collections" && (
                    <div className="pl-4 space-y-2 mt-2 text-sm font-normal">
                      <Link to="/NewArrival" onClick={() => setSideMenu(false)} className="block hover:text-gray-300">
                        NEW ARRIVALS
                      </Link>
                      <Link to="/collections/kriptees-spc" onClick={() => setSideMenu(false)} className="block hover:text-gray-300">
                        KRIPTEES SPC.
                      </Link>
                      <Link to="/collections/anime-arc" onClick={() => setSideMenu(false)} className="block hover:text-gray-300">
                        ANIME ARC
                      </Link>
                    </div>
                  )}
                  {/* WINTERWEARS Submenu */}
                  <button onClick={() => toggleSubmenu("winterwears")} className="block hover:text-gray-300 w-full text-left">
                    WINTERWEARS
                    <SubmenuArrow isOpen={openSubmenu === "winterwears"} />
                  </button>
                  {openSubmenu === "winterwears" && (
                    <div className="pl-4 space-y-2 mt-2 text-sm font-normal">
                      <Link to="/Hoodies" onClick={() => setSideMenu(false)} className="block hover:text-gray-300">
                        HOODIES
                      </Link>
                      <Link to="/Sweatshirts" onClick={() => setSideMenu(false)} className="block hover:text-gray-300">
                        SWEATSHIRTS
                      </Link>
                    </div>
                  )}
                  {/* TSHIRTS */}
                  <Link to="/Tshirt" onClick={() => setSideMenu(false)} className="block hover:text-gray-300">
                    TSHIRTS
                  </Link>
                  {/* CUSTOM */}
                  <Link to="/customise" onClick={() => setSideMenu(false)} className="block hover:text-gray-300">
                    CUSTOM
                  </Link>
                  {/* ORDERS (simple link) */}
                  {isAuthenticated && (
                    <Link to="/orders" onClick={() => setSideMenu(false)} className="block hover:text-gray-300">
                      ORDERS
                    </Link>
                  )}
                </nav>
              </div>
              {/* LOGOUT button at bottom left */}
              {isAuthenticated && (
                <div className="absolute bottom-4 left-4">
                  <button
                    onClick={() => {
                      setSideMenu(false);
                      logoutUserHandler();
                    }}
                    className="text-sm hover:text-gray-300"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search Overlay */}
        {searchBarActive && (
          <div className="fixed inset-0 z-50 flex flex-col bg-gray-200">
            {/* 1) Search Bar at the Top */}
            <div className="shadow-lg p-2 sticky" style={{ top: 0 }}>
              <div className="flex items-center justify-between w-full rounded-full p-2">
                {/* Back Icon (Left) */}
                <div
                  className="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer"
                  onClick={handleCrossButtonClick}
                >
                  <svg
                    className="h-6 w-6 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {/* Search Input */}
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchInputChange}
                  className="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:ring-0 focus:border-gray-300 border border-transparent lg:text-sm text-xs"
                  placeholder="Search"
                  autoFocus
                />
                {/* Search Icon (Right) */}
                <div
                  className="bg-gray-600 p-2 hover:bg-gray-700 cursor-pointer mx-2 rounded-full"
                  onClick={handleSearchFormSubmit}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* 2) Suggestions Panel */}
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto">
              {/* Left Column: Popular Searches */}
              <div className="md:w-1/3 w-full bg-transparent p-4">
                <h2 className="text-gray-700 text-base font-semibold mb-3">
                  POPULAR SEARCHES
                </h2>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="cursor-pointer hover:text-gray-900">Shirt</li>
                  <li className="cursor-pointer hover:text-gray-900">Hoodie</li>
                  <li className="cursor-pointer hover:text-gray-900">Anime Arc</li>
                  <li className="cursor-pointer hover:text-gray-900">Kurta</li>
                </ul>
              </div>
              {/* Right Column: Trending Now */}
              <div className="md:w-2/3 w-full bg-transpaent p-4">
                <h2 className="text-gray-700 text-base font-semibold mb-3">
                  TRENDING NOW
                </h2>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="cursor-pointer hover:text-gray-900">Basic Tees</li>
                  <li className="cursor-pointer hover:text-gray-900">Winterwears</li>
                  <li className="cursor-pointer hover:text-gray-900">Custom Prints</li>
                  <li className="cursor-pointer hover:text-gray-900">Combos</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Modal Component (unchanged) */}
      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}

export default Header;
