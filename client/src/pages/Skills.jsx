import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaShieldAlt,
  FaNetworkWired,
  FaDatabase,
  FaTerminal,
  FaTools,
  FaCertificate,
} from "react-icons/fa";
import { SiKalilinux } from "react-icons/si";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const skillCategories = [
    "All",
    "Programming",
    "Security Tools",
    "Frameworks",
    "Certifications",
  ];

  const skills = [
    // Programming Skills
    {
      name: "Python",
      level: "Advanced",
      category: "Programming",
      icon: <FaCode className="text-blue-500" />,
      proficiency: 90,
    },
    {
      name: "JavaScript",
      level: "Intermediate",
      category: "Programming",
      icon: <FaCode className="text-yellow-500" />,
      proficiency: 80,
    },
    {
      name: "Bash Scripting",
      level: "Advanced",
      category: "Programming",
      icon: <FaTerminal className="text-green-500" />,
      proficiency: 85,
    },
    // Security Tools
    {
      name: "Metasploit",
      level: "Expert",
      category: "Security Tools",
      icon: <FaShieldAlt className="text-red-500" />,
      proficiency: 95,
    },
    {
      name: "Burp Suite",
      level: "Advanced",
      category: "Security Tools",
      icon: <FaTools className="text-purple-500" />,
      proficiency: 90,
    },
    {
      name: "Nmap",
      level: "Advanced",
      category: "Security Tools",
      icon: <FaNetworkWired className="text-green-500" />,
      proficiency: 85,
    },
    // Frameworks
    {
      name: "React",
      level: "Intermediate",
      category: "Frameworks",
      icon: <FaCode className="text-blue-400" />,
      proficiency: 75,
    },
    {
      name: "Node.js",
      level: "Intermediate",
      category: "Frameworks",
      icon: <FaDatabase className="text-green-600" />,
      proficiency: 70,
    },
    // Certifications
    {
      name: "OSCP Preparation",
      level: "In Progress",
      category: "Certifications",
      icon: <FaCertificate className="text-yellow-500" />,
      proficiency: 60,
    },
    {
      name: "Kali Linux Certified",
      level: "Certified",
      category: "Certifications",
      icon: <SiKalilinux className="text-blue-600" />,
      proficiency: 85,
    },
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#8892B0] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#33FF33]">
            Technical Skills
          </h1>
          <p className="text-xl text-[#8892B0]">
            Expertise in Cybersecurity, Programming, and Offensive Technologies
          </p>
        </motion.div>

        {/* Skill Filters */}
        <div className="flex justify-center mb-12 space-x-4 flex-wrap">
          {skillCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 m-1 rounded-lg transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#33FF33] text-[#0A192F]"
                  : "border border-[#33FF33] text-[#33FF33] hover:bg-[#33FF33] hover:text-[#0A192F]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                },
              }}
              className="bg-[#112240] rounded-lg p-6 
              transform hover:scale-105 transition-transform duration-300 
              hover:shadow-lg hover:shadow-[#33FF33]/20"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-4xl">{skill.icon}</div>
                <span className="text-sm text-[#33FF33]">{skill.level}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#33FF33] mb-2">
                {skill.name}
              </h3>

              {/* Skill Proficiency Bar */}
              <div className="w-full bg-[#0A192F] rounded-full h-2.5 mt-4">
                <div
                  className="bg-[#33FF33] h-2.5 rounded-full"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Skills Found */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-[#8892B0]">
              No skills found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
