import {
  FaBars,
  FaBell,
  FaShoppingCart,
  FaTimes,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { Link } from "react-router-dom";
import NavBarCategories from "./navbar/NavBarCategories";
import NavbarCart from "./navbar/NavbarCart";
import NavbarSignIn from "./navbar/NavbarSignIn";
import NavbarNotification from "./navbar/NavbarNotification";
import ImageSearchModal from "../ImageSearchModal";
import useNavbarLogic from "../../hooks/useNavbar";

const Navbar = () => {
  const {
    authUser,
    mobileMenuOpen,
    searchFocused,
    scrolled,
    dropdownRef,
    cartDropdownRef,
    signInDropdownRef,
    notificationDropdownRef,
    categoriesDropdown,
    cartDropdown,
    signInDropdown,
    notificationDropdown,
    imageSearchModal,
    setSearchFocused,
    toggleMobileMenu,
    handleLogout,
    loggingOut,
  } = useNavbarLogic();

  console.log("Auth User", authUser);
  return (
    <>
      <nav
        className={`bg-white border-b border-zinc-200 sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg backdrop-blur-sm bg-white/95" : "shadow-sm"
        }`}
      >
        {/* Top Bar - Hidden on small screens */}
        {/* <div className="hidden lg:block bg-zinc-50 border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex justify-between items-center text-sm text-zinc-600">
              <div className="flex space-x-6">
                <span>Free shipping on orders over $50</span>
                <span>24/7 Customer Support</span>
              </div>
              <div className="flex space-x-4">
                <Link to="/track-order" className="hover:text-blue-600 transition-colors">Track Order</Link>
                <Link to="/help" className="hover:text-blue-600 transition-colors">Help</Link>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 lg:h-20 w-full">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0">
              <Link className="flex items-center group" to={"/"}>
                <div className="relative">
                  <svg
                    className="h-8 w-8 lg:h-10 lg:w-10 text-blue-600 group-hover:text-blue-700 transition-colors"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21 5l-3-3H6L3 5v14l3 3h12l3-3V5zm-2 11h-4v4H9v-4H5V8h4V4h6v4h4v8z" />
                  </svg>
                  <div className="absolute -inset-2 bg-blue-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </div>
                <span className="ml-3 font-bold text-zinc-900 text-lg lg:text-xl tracking-tight">
                  SNAPPSHOPPER
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center flex-1 justify-center">
              <div className="flex items-center space-x-6 ml-7">
                {/* Home Link */}
                <Link
                  to="/home"
                  className="relative px-4 py-2 text-blue-600 font-medium rounded-full transition-all duration-300 
                         hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 
                         focus:ring-offset-2 group"
                >
                  <span>Home</span>
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 
                              group-hover:w-full transition-all duration-300"
                  ></div>
                </Link>

                {/* Categories Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center px-4 py-2 font-medium text-zinc-700 rounded-full transition-all 
                           duration-300 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 
                           focus:ring-blue-300 focus:ring-offset-2 group"
                    onClick={categoriesDropdown.toggleDropdown}
                  >
                    <span>Categories</span>
                    <svg
                      className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                        categoriesDropdown.isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {categoriesDropdown.isOpen && (
                    <NavBarCategories
                      dropdownRef={dropdownRef}
                      categories={categories}
                      featuredCategories={featuredCategories}
                      featuredCategories2={featuredCategories2}
                      featuredCategories3={featuredCategories3}
                      featuredCategories4={featuredCategories4}
                    />
                  )}
                </div>

                {/* Enhanced Search Bar */}
                <div className="flex-1 max-w-lg">
                  <div
                    className={`relative flex items-center transition-all duration-300 ${
                      searchFocused ? "transform scale-105" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center w-full border rounded-full px-4 py-2.5 bg-white 
                                 transition-all duration-300 ${
                                   searchFocused
                                     ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg"
                                     : "border-zinc-300 shadow-sm hover:border-zinc-400"
                                 }`}
                    >
                      <FiCamera
                        className="h-5 w-5 text-zinc-400 mr-3 cursor-pointer hover:text-blue-500 
                               transition-all duration-200 hover:scale-110"
                        onClick={imageSearchModal.openModal}
                      />
                      <input
                        type="text"
                        placeholder="Search products, brands, categories..."
                        className="flex-1 outline-none text-sm text-zinc-900 placeholder:text-zinc-500 bg-transparent"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                      />
                      <button className="ml-2 p-1.5 text-zinc-400 hover:text-blue-500 transition-colors rounded-full hover:bg-blue-50">
                        <FaSearch className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Mobile Search Icon */}
              <button className="md:hidden p-2 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <FaSearch className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  className="relative p-2 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 rounded-full 
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={notificationDropdown.toggleDropdown}
                >
                  <FaBell className="h-5 w-5" />
                  <span
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs 
                                 w-5 h-5 flex items-center justify-center font-medium shadow-sm 
                                 animate-pulse"
                  >
                    9
                  </span>
                </button>

                {notificationDropdown.isOpen && (
                  <NavbarNotification
                    notificationDropdownRef={notificationDropdownRef}
                  />
                )}
              </div>

              {/* Shopping Cart */}
              <div className="relative">
                <button
                  className="relative p-2 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 rounded-full 
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={cartDropdown.toggleDropdown}
                >
                  <FaShoppingCart className="h-5 w-5" />
                  <span
                    className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full text-xs 
                                 w-5 h-5 flex items-center justify-center font-medium shadow-sm"
                  >
                    3
                  </span>
                </button>

                {cartDropdown.isOpen && (
                  <NavbarCart cartDropdownRef={cartDropdownRef} />
                )}
              </div>

              {/* User Account */}
              <div className="relative hidden sm:block">
                <button
                  className="flex items-center space-x-2 p-2 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 
                           rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={signInDropdown.toggleDropdown}
                >
                  <FaUser className="h-5 w-5" />
                  <span className="text-sm font-medium hidden lg:inline">
                    Hello, {authUser ? authUser.first_name : "Sign in"}
                  </span>
                  <svg
                    className={`h-4 w-4 hidden lg:inline transition-transform duration-300 ${
                      signInDropdown.isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {signInDropdown.isOpen && (
                  <NavbarSignIn
                    signInDropdownRef={signInDropdownRef}
                    authUser={authUser}
                    handleLogout={handleLogout}
                    loggingOut={loggingOut}
                  />
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 rounded-full 
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Enhanced Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 
                        transform transition-transform duration-300 ease-in-out md:hidden ${
                          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200">
            <div className="flex items-center">
              <FaUser className="h-6 w-6 text-zinc-600 mr-3" />
              <div>
                <div className="font-semibold text-zinc-900">
                  Hello, Sign in
                </div>
                <div className="text-sm text-zinc-500">Manage your account</div>
              </div>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="p-6 border-b border-zinc-200">
            <div className="flex items-center border border-zinc-300 bg-zinc-50 rounded-full px-4 py-3">
              <FiCamera
                className="h-5 w-5 text-zinc-400 mr-3 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={imageSearchModal.openModal}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 outline-none text-sm text-zinc-900 placeholder:text-zinc-500 bg-transparent"
              />
              <FaSearch className="h-4 w-4 text-zinc-400" />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="p-6 space-y-4">
            <Link
              to="/home"
              className="flex items-center py-3 px-4 text-blue-600 font-medium bg-blue-50 rounded-lg 
                       hover:bg-blue-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>

            <button
              className="flex items-center justify-between w-full py-3 px-4 text-zinc-700 font-medium 
                       hover:bg-zinc-50 rounded-lg transition-colors"
              onClick={categoriesDropdown.toggleDropdown}
            >
              <span>Categories</span>
              <svg
                className={`h-5 w-5 transition-transform duration-300 ${
                  categoriesDropdown.isOpen ? "rotate-180" : "rotate-0"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="flex flex-col items-center p-4 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors">
                <FaBell className="h-6 w-6 text-zinc-600 mb-2" />
                <span className="text-sm font-medium text-zinc-700">
                  Notifications
                </span>
              </button>
              <button className="flex flex-col items-center p-4 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors">
                <FaShoppingCart className="h-6 w-6 text-zinc-600 mb-2" />
                <span className="text-sm font-medium text-zinc-700">Cart</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-zinc-50 border-t border-zinc-200">
            <div className="text-center text-sm text-zinc-500">
              Need help?{" "}
              <Link to="/support" className="text-blue-600 hover:text-blue-700">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar - Appears below navbar on small screens */}
      <div className="md:hidden bg-white border-b border-zinc-200 px-4 py-3">
        <div className="flex items-center border border-zinc-300 bg-zinc-50 rounded-full px-4 py-2.5">
          <FiCamera
            className="h-5 w-5 text-zinc-400 mr-3 cursor-pointer hover:text-blue-500 transition-colors"
            onClick={imageSearchModal.openModal}
          />
          <input
            type="text"
            placeholder="Search products, brands..."
            className="flex-1 outline-none text-sm text-zinc-900 placeholder:text-zinc-500 bg-transparent"
          />
          <FaSearch className="h-4 w-4 text-zinc-400" />
        </div>
      </div>

      <ImageSearchModal
        isOpen={imageSearchModal.isOpen}
        onClose={imageSearchModal.closeModal}
      />
    </>
  );
};

// Categories data remains the same
const categories = [
  { name: "Featured", link: "#" },
  { name: "Home and Kitchen", link: "#" },
  { name: "Women's Clothing", link: "#" },
  { name: "Women's Shoes", link: "#" },
  { name: "Men's Clothing", link: "#" },
  { name: "Men's Shoes", link: "#" },
  { name: "Sports & Outdoors", link: "#" },
  { name: "Jewelry & Accessories", link: "#" },
  { name: "Beauty & Health", link: "#" },
  { name: "Toys & Games", link: "#" },
  { name: "Baby & Maternity", link: "#" },
  { name: "Automotive", link: "#" },
  { name: "Bags & Luggages", link: "#" },
  { name: "Electronics", link: "#" },
  { name: "Smart home", link: "#" },
  { name: "Cell phones & Accessories", link: "#" },
  { name: "Books", link: "#" },
];

const featuredCategories = [
  { name: "Personal Care", image: "/personal-care.jpg" },
  { name: "Skin Care", image: "/skin-care.jpg" },
  { name: "Men's Set", image: "/mens-set.jpg" },
  { name: "Exercise", subtitle: "&Fitness Item", image: "/exercise.jpg" },
  { name: "Electronic Toys", image: "/electronic-toys.jpg" },
];

const featuredCategories2 = [
  { name: "Hair Care", image: "/hair-care.jpg" },
  { name: "Lightning", image: "/lightning.jpg" },
  { name: "Cutting Tools", image: "/cutting-tools.jpg" },
  { name: "Hair Accessories", image: "/hair-accessories.jpg" },
  { name: "Women's Jewelry", image: "/womens-jewelry.jpg" },
];

const featuredCategories3 = [
  { name: "Women's Top", image: "/womens-top.jpg" },
  { name: "Women's Pant", image: "/womens-pant.jpg" },
  { name: "Men's Watches", image: "/mens-watches.jpg" },
  { name: "Kid's Wears", image: "/kids-wears.jpg" },
  { name: "Women's Dresses", image: "/womens-dresses.jpg" },
];

const featuredCategories4 = [
  { name: "Electronics", image: "/electronics.jpg" },
  { name: "Skincare", image: "/skincare-alt.jpg" },
  { name: "Tools", image: "/tools.jpg" },
  { name: "Cutting Tools", image: "/cutting-tools-alt.jpg" },
  { name: "Planners", image: "/planners.jpg" },
];

export default Navbar;
