import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCertificate,
  FaAward,
  FaCheckCircle,
  FaLink,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";

const Certifications = () => {
  const [selectedCertification, setSelectedCertification] = useState(null);

  const certifications = [
    {
      title: "Offensive Security Certified Professional (OSCP)",
      issuer: "Offensive Security",
      date: "In Progress",
      description:
        "Advanced penetration testing certification focusing on hands-on offensive security skills and real-world vulnerability exploitation.",
      icon: <FaShieldAlt />,
      status: "Pursuing",
      badgeColor: "bg-yellow-500",
      details: [
        "Comprehensive penetration testing methodology",
        "Hands-on exploit development",
        "Advanced network and web application security",
      ],
      verificationLink: "https://www.offensive-security.com/verify",
    },
    {
      title: "Certified Ethical Hacker (CEH)",
      issuer: "EC-Council",
      date: "2023",
      description:
        "Comprehensive certification in ethical hacking techniques and cybersecurity principles.",
      icon: <FaCertificate />,
      status: "Completed",
      badgeColor: "bg-green-500",
      details: [
        "Ethical hacking methodologies",
        "Vulnerability assessment",
        "Penetration testing techniques",
      ],
      verificationLink: "https://www.eccouncil.org/verify",
    },
    {
      title: "CompTIA Security+",
      issuer: "CompTIA",
      date: "2022",
      description:
        "Foundational cybersecurity certification covering core security functions.",
      icon: <FaAward />,
      status: "Completed",
      badgeColor: "bg-blue-500",
      details: [
        "Network security",
        "Compliance and operational security",
        "Threats and vulnerabilities",
      ],
      verificationLink: "https://www.comptia.org/verify",
    },

    // ✅ YOUR NEW CCEP CERTIFICATION ADDED PROPERLY
    {
      title: "Certified Cybersecurity Educator Professional (CCEP)",
      issuer: "Red Team Leaders",
      date: "2024",
      description:
        "Professional credential focused on cybersecurity education, offensive security training, and advanced teaching methodologies.",
      icon: <FaCertificate />,
      status: "Completed",
      badgeColor: "bg-purple-600",
      details: [
        "Cybersecurity curriculum design",
        "Offensive security lab instruction",
        "Advanced teaching methodology",
      ],
      verificationLink:
        "https://courses.redteamleaders.com/exam-completion/2c70d277a29cc072",
    },
<div className="bg-[#0F1A2A] shadow-xl rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 border border-gray-700">
  {/* Title + Icon */}
  <div className="flex items-center gap-3">
    <div className="text-green-400 text-3xl">
      <i className="fa-solid fa-certificate"></i>
    </div>
    <h3 className="text-xl font-semibold text-green-400">
      Foundations of Cybersecurity
    </h3>
  </div>

  {/* Issuer */}
  <p className="text-gray-300 mt-1 text-sm">Google / Coursera</p>

  {/* Description */}
  <p className="text-gray-400 mt-3 text-sm leading-relaxed">
    Foundational cybersecurity certificate covering security ethics, attacks,
    common tools, and analyst skills.
  </p>

  {/* What you will learn */}
  <div className="mt-4">
    <h4 className="text-green-400 font-semibold mb-2">What you will learn</h4>
    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
      <li>Recognize core skills and knowledge needed to become a cybersecurity analyst</li>
      <li>Identify how security attacks impact business operations</li>
      <li>Explain security ethics</li>
      <li>Identify common tools used by cybersecurity analysts</li>
    </ul>
  </div>

  {/* Status */}
  <div className="mt-4">
    <span className="px-3 py-1 text-sm rounded-full bg-green-600 text-white">
      Completed
    </span>
  </div>

  {/* Button */}
  <a
    href="https://coursera.org/share/a9182085a884e6daf4fccd1c10c138cb"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm transition"
  >
    View Certificate
  </a>
</div>
  
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text bg-gradient-to-r text-[#33FF33]">
            Professional Certifications
          </h1>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing Expertise in Cybersecurity and Ethical Hacking
          </p>
        </motion.div>

        {/* Certifications Layout */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedCertification(cert)}
              className={`group cursor-pointer bg-[#112240] rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-[#33FF33]/20
        ${
          selectedCertification?.title === cert.title
            ? "ring-4 ring-green-500 bg-gray-800"
            : " hover:scale-105 bg-gray-900"
        }
      `}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl md:text-4xl text-green-500 opacity-70">
                  {cert.icon}
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-semibold text-green-400">
                    {cert.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {cert.issuer}
                  </p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-400 line-clamp-3 mb-4">
                {cert.description}
              </p>
              <div className="flex justify-end">
                <span
                  className={`
            px-2 md:px-3 py-1 rounded-full text-xs font-bold text-white
            ${cert.badgeColor}
          `}
                >
                  {cert.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification Details Modal */}
        <AnimatePresence>
          {selectedCertification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto"
              onClick={() => setSelectedCertification(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-gray-800 rounded-xl max-w-2xl w-full my-8 p-6 md:p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCertification(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <FaTimes className="text-2xl" />
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="text-4xl text-green-500">
                      {selectedCertification.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-green-400">
                        {selectedCertification.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {selectedCertification.issuer} |{" "}
                        {selectedCertification.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`
                      px-4 py-2 rounded-full text-white font-bold
                      ${selectedCertification.badgeColor}
                    `}
                  >
                    {selectedCertification.status}
                  </span>
                </div>

                <p className="text-gray-300 mb-6">
                  {selectedCertification.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-green-400 mb-4">
                    Key Highlights
                  </h4>
                  <ul className="space-y-3">
                    {selectedCertification.details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-3 text-gray-300"
                      >
                        <FaCheckCircle className="text-green-500" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <a
                    href={selectedCertification.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <FaLink />
                    <span>Verify Certification</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Certifications;
