import Logo from "../assets/logo.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaCode,
  FaLaptopCode,
  FaCertificate,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      path: "/",
      label: "Home",
      icon: <FaHome className="w-5 h-5" />,
    },
    {
      path: "/projects",
      label: "Projects",
      icon: <FaCode className="w-5 h-5" />,
    },
    {
      path: "/skills",
      label: "Skills",
      icon: <FaLaptopCode className="w-5 h-5" />,
    },
    {
      path: "/certifications",
      label: "Certifications",
      icon: <FaCertificate className="w-5 h-5" />,
    },
    {
      path: "/contact",
      label: "Contact",
      icon: <FaEnvelope className="w-5 h-5" />,
    },
  ];

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full z-50 bg-[#0A192F] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-[#33FF33] hover:text-[#8892B0] transition-colors"
          >
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="group relative text-[#8892B0] hover:text-[#33FF33] transition-colors"
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#33FF33] group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#33FF33] focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0A192F] z-40"
              onClick={toggleMenu}
            />

            {/* Mobile Menu Slide */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 w-64 h-full bg-[#112240] shadow-lg z-50"
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={toggleMenu}
                  className="text-[#33FF33] focus:outline-none"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="px-4 pt-20 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: index * 0.1,
                        duration: 0.3,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: 20,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={toggleMenu}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-[#8892B0] hover:bg-[#112240] hover:text-[#33FF33] transition-colors"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
