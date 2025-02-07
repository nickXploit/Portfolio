import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaShieldAlt,
  FaPaperPlane,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form Submitted", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/anil-tadvi-238b592a7",
      color: "text-blue-600",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/InfinityCodder",
      color: "text-gray-500",
    },
    {
      icon: <FaTwitter />,
      url: "https://x.com/Nick980076",
      color: "text-sky-500",
    },
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#33FF33]">
            Get in Touch
          </h1>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            Interested in cybersecurity collaboration or professional
            opportunities?
          </p>
        </motion.div>

        {/* Contact Container */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0A192F] rounded-xl p-8 h-fit"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-6">
              Contact Approach
            </h2>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <FaShieldAlt className="text-green-500 text-2xl" />
                <div>
                  <p className="text-gray-400">Professional Communication</p>
                  <p className="text-gray-200">
                    Preferred contact through professional networks
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-green-500 text-2xl" />
                <div>
                  <p className="text-gray-400">Communication Strategy</p>
                  <p className="text-gray-200">
                    Secure communication channels preferred
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    text-3xl ${social.color} 
                    hover:scale-110 transition-transform
                  `}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#0A192F] rounded-xl p-8 space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#112240] text-gray-200 rounded-lg px-4 py-3 
        border border-[#233554] 
        focus:outline-none focus:ring-2 focus:ring-[#33FF33] 
        hover:border-[#33FF33] 
        transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  Professional Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#112240] text-gray-200 rounded-lg px-4 py-3 
        border border-[#233554] 
        focus:outline-none focus:ring-2 focus:ring-[#33FF33] 
        hover:border-[#33FF33] 
        transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#112240] text-gray-200 rounded-lg px-4 py-3 
        border border-[#233554] 
        focus:outline-none focus:ring-2 focus:ring-[#33FF33] 
        hover:border-[#33FF33] 
        transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-[#112240] text-gray-200 rounded-lg px-4 py-3 
        border border-[#233554] 
        focus:outline-none focus:ring-2 focus:ring-[#33FF33] 
        hover:border-[#33FF33] 
        transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#33FF33] text-black py-3 rounded-lg 
      hover:bg-[#33FF33]/90 
      transition-colors 
      flex items-center justify-center space-x-2 
      font-bold"
              >
                <FaPaperPlane />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
