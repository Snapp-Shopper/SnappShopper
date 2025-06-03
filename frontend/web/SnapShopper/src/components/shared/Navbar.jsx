import React, { useEffect, useRef, useState } from 'react'
import { FaBars, FaBell, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa'
import { FiCamera } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import NavBarCategories from './navbar/NavBarCategories';
import NavbarCart from './navbar/NavbarCart';
import NavbarSignIn from './navbar/NavbarSignIn';
import NavbarNotification from './navbar/NavbarNotification';
import ImageSearchModal from '../ImageSearchModal';
import { useModal, useDropdown } from '../../utils/ModalUtils';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);
  const signInDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  const categoriesDropdown = useDropdown();
  const cartDropdown = useDropdown();
  const signInDropdown = useDropdown();
  const notificationDropdown = useDropdown();
  const imageSearchModal = useModal();

  const handleClickOutside = (event) => {
    // Closing logic for dropdowns
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      categoriesDropdown.closeDropdown();
    }
    if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
      cartDropdown.closeDropdown();
    }
    if (signInDropdownRef.current && !signInDropdownRef.current.contains(event.target)) {
      signInDropdown.closeDropdown();
    }
    if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
      notificationDropdown.closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white shadow py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link className="flex items-center" to={"/"}>
              <svg className="h-8 w-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 5l-3-3H6L3 5v14l3 3h12l3-3V5zm-2 11h-4v4H9v-4H5V8h4V4h6v4h4v8z" />
              </svg>
              <span className="ml-2 font-bold text-black">SNAPPSHOPPER</span>
            </Link>
            
            <button 
              onClick={toggleMobileMenu}
              type="button" 
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-default" 
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation Links - Hidden on Mobile unless menu open */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto md:space-x-8 mt-4 md:mt-0`}>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
              <Link to="home"
                className="px-4 py-2 text-blue-600 font-medium rounded-full transition-all duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 mb-2 md:mb-0">
                Home
              </Link>

              <div className="relative mb-2 md:mb-0">
                <button
                  data-category-button
                  className="w-full md:w-auto text-left px-4 py-2 font-medium rounded-full transition-all 
                  duration-200 hover:text-blue-600 hover:bg-blue-100 focus:outline-none
                  focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 flex items-center justify-between"
                  onClick={categoriesDropdown.toggleDropdown}>
                  <span>Categories</span>
                  <svg className="h-4 w-4 inline ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            </div>

            {/* Search Bar - Full width on mobile */}
            <div className="w-full md:w-96 mb-2 md:mb-0">
              <div className="flex items-center border rounded-full px-4 py-2">
                <FiCamera 
                  className="h-6 w-6 text-gray-400 mr-2 cursor-pointer hover:text-blue-500 transition-colors"
                  onClick={imageSearchModal.openModal} 
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full outline-none text-sm"
                />
                <svg className="h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right Icons - Aligned differently on mobile */}
            <div className={`${mobileMenuOpen ? 'mt-5' : ''} flex items-center justify-between md:justify-end md:space-x-6 w-full md:w-auto`}>
              <div className="relative">
                <button
                  data-notification-button
                  className="focus:outline-none flex items-center cursor-pointer"
                  onClick={notificationDropdown.toggleDropdown}>
                  <FaBell className="h-6 w-6 text-gray-600 hover:text-blue-600 focus:text-blue-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">9</span>
                </button>

                {notificationDropdown.isOpen && (
                  <NavbarNotification notificationDropdownRef={notificationDropdownRef} />
                )}
              </div>

              {/* Shopping Cart with Dropdown */}
              <div className="relative">
                <button
                  data-cart-button
                  className="focus:outline-none flex items-center cursor-pointer"
                  onClick={cartDropdown.toggleDropdown}>
                  <FaShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600 focus:text-blue-600" />
                </button>

                {cartDropdown.isOpen && (
                  <NavbarCart cartDropdownRef={cartDropdownRef} />
                )}
              </div>

              <div className="relative">
                <button
                  data-signin-button
                  className="flex items-center cursor-pointer"
                  onClick={signInDropdown.toggleDropdown}
                >
                  <div className="flex items-center space-x-2 hover:text-blue-600">
                    <FaUser className="h-6 w-6 text-gray-600" />
                    <span className="text-gray-700 hidden md:inline">Hello, Sign in</span>
                  </div>
                  <svg className="h-4 w-4 ml-1 text-gray-600 hidden md:inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {signInDropdown.isOpen && (
                  <NavbarSignIn signInDropdownRef={signInDropdownRef} />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ImageSearchModal
        isOpen={imageSearchModal.isOpen}
        onClose={imageSearchModal.closeModal}
      />
    </>
  );
};

// Left sidebar categories data
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
  { name: "Books", link: "#" }
];

// Featured categories Row 1
const featuredCategories = [
  { name: "Personal Care", image: "/personal-care.jpg" },
  { name: "Skin Care", image: "/skin-care.jpg" },
  { name: "Men's Set", image: "/mens-set.jpg" },
  { name: "Exercise", subtitle: "&Fitness Item", image: "/exercise.jpg" },
  { name: "Electronic Toys", image: "/electronic-toys.jpg" }
];

// Featured categories Row 2
const featuredCategories2 = [
  { name: "Hair Care", image: "/hair-care.jpg" },
  { name: "Lightning", image: "/lightning.jpg" },
  { name: "Cutting Tools", image: "/cutting-tools.jpg" },
  { name: "Hair Accessories", image: "/hair-accessories.jpg" },
  { name: "Women's Jewelry", image: "/womens-jewelry.jpg" }
];

// Featured categories Row 3
const featuredCategories3 = [
  { name: "Women's Top", image: "/womens-top.jpg" },
  { name: "Women's Pant", image: "/womens-pant.jpg" },
  { name: "Men's Watches", image: "/mens-watches.jpg" },
  { name: "Kid's Wears", image: "/kids-wears.jpg" },
  { name: "Women's Dresses", image: "/womens-dresses.jpg" }
];

// Featured categories Row 4
const featuredCategories4 = [
  { name: "Electronics", image: "/electronics.jpg" },
  { name: "Skincare", image: "/skincare-alt.jpg" },
  { name: "Tools", image: "/tools.jpg" },
  { name: "Cutting Tools", image: "/cutting-tools-alt.jpg" },
  { name: "Planners", image: "/planners.jpg" }
];

export default Navbar;