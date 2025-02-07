import React from "react";
import { FaShieldAlt, FaCode, FaBug, FaCertificate } from "react-icons/fa";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const expertiseAreas = [
    {
      icon: <FaShieldAlt className="text-green-500 w-12 h-12" />,
      title: "Red Team Operations",
      description:
        "Advanced offensive security techniques and adversarial simulations",
    },
    {
      icon: <FaBug className="text-red-500 w-12 h-12" />,
      title: "Bug Bounty",
      description:
        "Identifying and reporting critical vulnerabilities across platforms",
    },
    {
      icon: <FaCode className="text-blue-500 w-12 h-12" />,
      title: "Web Security",
      description: "Comprehensive web application security assessments",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-[#0A192F] text-[#8892B0] w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Expertise Section */}
      <div className="w-full py-16 bg-[#112240]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[#0A192F] p-6 rounded-lg text-center 
                transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">{area.icon}</div>
                <h3 className="text-xl font-semibold text-[#33FF33] mb-3">
                  {area.title}
                </h3>
                <p className="text-sm">{area.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* About Preview */}
      <div className="w-full py-16 bg-[#0A192F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-[#112240] p-8 rounded-lg"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#33FF33] mb-4">
                  About Me
                </h2>
                <p className="mb-4">
                  A passionate Cybersecurity Professional with a keen interest
                  in offensive security, vulnerability research, and ethical
                  hacking. OSCP Aspirant committed to pushing the boundaries of
                  digital security.
                </p>
                <div className="flex items-center space-x-4">
                  <FaCertificate className="text-yellow-500 w-8 h-8" />
                  <span>OSCP Certification Journey</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-[#0A192F] p-4 rounded-lg">
                  <div className="h-64 w-full bg-gradient-to-br from-[#33FF33] to-[#0A192F] opacity-30 rounded-lg"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
