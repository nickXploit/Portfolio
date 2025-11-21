import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaRocket,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const HeroSection = () => {
  const socialLinks = [
    {
      icon: (
        <FaLinkedin className="w-6 h-6 text-blue-600 hover:text-blue-400" />
      ),
      href: "https://www.linkedin.com/in/anil-tadvi-238b592a7",
    },
    {
      icon: <FaGithub className="w-6 h-6 text-gray-400 hover:text-white" />,
      href: "https://github.com/nickXploit",
    },
    {
      icon: <FaTwitter className="w-6 h-6 text-blue-400 hover:text-blue-300" />,
      href: "https://x.com/Nick980076",
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex items-center bg-gradient-to-br from-gray-900 to-black text-gray-200">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black text-gray-200 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Profile Image (on small devices first) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="md:hidden flex justify-center items-center mb-6"
        >
          <div className="w-70 h-70 rounded-full overflow-hidden border-4 border-[#33FF33]">
            <img
              src={assets.Profile}
              alt="Anil Tadvi"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#33FF33]">
            Anil Tadvi
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Cybersecurity Professional | Red Teamer | Ethical Hacker
          </p>
          <p className="text-md mb-6">
            Passionate about securing digital landscapes, breaking
            vulnerabilities, and pushing the boundaries of cybersecurity.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/projects"
              className="px-6 py-3 border border-[#33FF33] text-[#33FF33] 
              hover:bg-[#33FF33] hover:text-[#0A192F] 
              transition-all duration-300 rounded-lg 
              flex items-center space-x-2"
            >
              <FaRocket />
              <span>View Projects</span>
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#33FF33] text-[#0A192F] 
              hover:bg-opacity-80 
              transition-all duration-300 rounded-lg 
              flex items-center space-x-2"
            >
              <FaShieldAlt />
              <span>Hire Me</span>
            </Link>
            <a
              href="/path-to-your-resume.pdf" // Update this path to your resume file
              download
              className="px-6 py-3 bg-[#007BFF] text-white 
              hover:bg-blue-600 
              transition-all duration-300 rounded-lg 
              flex items-center space-x-2"
            >
              <span>Download Resume</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mt-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Profile Image (on larger devices) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex justify-center items-center"
        >
          <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-[#33FF33]">
            <img
              src={assets.Profile}
              alt="Anil Tadvi"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
