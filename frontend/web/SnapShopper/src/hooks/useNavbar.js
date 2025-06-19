import { useEffect, useRef, useState } from "react";
import { useModal, useDropdown } from "../utils/ModalUtils";
import { useAuth } from "./useAuth";

export default function useNavbarLogic() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { authUser, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

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
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      categoriesDropdown.closeDropdown();
    }
    if (
      cartDropdownRef.current &&
      !cartDropdownRef.current.contains(event.target)
    ) {
      cartDropdown.closeDropdown();
    }
    if (
      signInDropdownRef.current &&
      !signInDropdownRef.current.contains(event.target)
    ) {
      signInDropdown.closeDropdown();
    }
    if (
      notificationDropdownRef.current &&
      !notificationDropdownRef.current.contains(event.target)
    ) {
      notificationDropdown.closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "unset";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.body.style.overflow = "unset";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const handleLogout = (e) => {
    e.preventDefault();
    setLoggingOut(true);

    logout();
  };

  return {
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
  };
}
