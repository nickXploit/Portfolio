import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaShieldAlt,
  FaBug,
  FaCertificate,
  FaMedium,
} from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";

const Footer = () => {
  const socialLinks = [
    {
      icon: (
        <FaGithub className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
      ),
      href: "https://github.com/InfinityCodder",
      aria: "GitHub Security Repositories",
    },
    {
      icon: (
        <FaLinkedin className="w-6 h-6 text-blue-600 hover:text-blue-400 transition-colors" />
      ),
      href: "https://www.linkedin.com/in/anil-tadvi-238b592a7",
      aria: "LinkedIn Professional Profile",
    },
    {
      icon: (
        <FaTwitter className="w-6 h-6 text-blue-400 hover:text-blue-300 transition-colors" />
      ),
      href: "https://x.com/Nick980076",
      aria: "Twitter Profile",
    },
    {
      icon: (
        <FaMedium className="w-6 h-6 text-black hover:text-gray-700 transition-colors" />
      ),
      href: "https://medium.com/@hack8655793",
      aria: "Medium Blog",
    },
    {
      icon: (
        <SiTryhackme className="w-6 h-6 text-red-500 hover:text-red-400 transition-colors" />
      ),
      href: "https://tryhackme.com/p/GreatestHacker",
      aria: "TryHackMe Profile",
    },
  ];

  return (
    <footer className="bg-[#0A192F] text-[#8892B0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#33FF33]">Anil Tadvi</h3>
            <p className="text-sm leading-relaxed">
              Cybersecurity Professional & Red Teamer specializing in web
              security, ethical hacking, and comprehensive vulnerability
              assessment. OSCP Aspirant committed to pushing the boundaries of
              digital security.
            </p>
            <Link
              to="/contact"
              className="inline-block px-4 py-2 border border-[#33FF33] text-[#33FF33] 
              hover:bg-[#33FF33] hover:text-[#0A192F] 
              transition-all duration-300 rounded-lg 
              text-sm font-medium"
            >
              Collaborate on Security
            </Link>
          </div>

          {/* Expertise Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-[#33FF33]">
              Cybersecurity Expertise
            </h4>
            <ul className="space-y-3 hover:cursor-pointer">
              {[
                {
                  icon: <FaShieldAlt className="text-green-500" />,
                  title: "Red Team Operations",
                  description: "Advanced offensive security techniques",
                },
                {
                  icon: <FaBug className="text-red-500" />,
                  title: "Web Security & Bug Bounty",
                  description: "Vulnerability identification and reporting",
                },
                {
                  icon: <FaCertificate className="text-yellow-500" />,
                  title: "Ethical Hacking",
                  description: "Comprehensive security assessments",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 
                  group hover:bg-[#112240] p-2 rounded-lg 
                  transition-all duration-300"
                >
                  {item.icon}
                  <div>
                    <h5 className="text-sm font-medium text-[#33FF33] group-hover:text-white">
                      {item.title}
                    </h5>
                    <p className="text-xs text-[#8892B0]">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-[#33FF33]">
              Connect & Verify
            </h4>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.aria}
                  className="transform hover:scale-110 transition-transform"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="bg-[#112240] p-4 rounded-lg">
              <h5 className="text-sm font-semibold text-[#33FF33] mb-2">
                Verified Platforms
              </h5>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center">
                  <FaShieldAlt className="mr-2 text-green-500" />
                  TryHackMe Verified Rank
                </li>
                <li className="flex items-center">
                  <FaBug className="mr-2 text-red-500" />
                  Active Bug Bounty Researcher
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-[#112240] text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p className="text-sm text-[#8892B0]">
              © {new Date().getFullYear()} Anil Tadvi. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
