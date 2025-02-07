import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaLink,
  FaGithub,
  FaRobot,
  FaNetworkWired,
  FaShieldVirus,
} from "react-icons/fa";
import { SiEthereum } from "react-icons/si";

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const projectCategories = [
    "All",
    "AI Security",
    "Web Exploitation",
    "Offensive Security",
  ];

  const projects = [
    {
      title: "AI-Powered Autonomous Pentesting Bot",
      description:
        "Advanced AI-driven automated penetration testing framework with machine learning-based vulnerability detection",
      technologies: ["Python", "Machine Learning", "Cybersecurity"],
      category: "AI Security",
      githubLink: "#",
      liveLink: "#",
      icon: <FaRobot className="text-blue-500" />,
    },
    {
      title: "AI-Based Web Application Exploiter",
      description:
        "Intelligent web application security assessment tool using AI to identify and exploit complex vulnerabilities",
      technologies: ["AI", "Web Security", "Exploit Development"],
      category: "Web Exploitation",
      githubLink: "#",
      liveLink: "#",
      icon: <FaShieldVirus className="text-red-500" />,
    },
    {
      title: "AI-Powered Phishing Framework",
      description:
        "Sophisticated phishing simulation and awareness training platform with AI-driven social engineering techniques",
      technologies: ["React", "AI", "Cybersecurity"],
      category: "AI Security",
      githubLink: "#",
      liveLink: "#",
      icon: <FaNetworkWired className="text-green-500" />,
    },
    {
      title: "Web3 & Smart Contract Hacking Framework",
      description:
        "Comprehensive security assessment tool for blockchain smart contracts and Web3 applications",
      technologies: ["Solidity", "Blockchain", "Ethereum"],
      category: "Offensive Security",
      githubLink: "#",
      liveLink: "#",
      icon: <SiEthereum className="text-purple-500" />,
    },
    {
      title: "Automated API Pentesting Framework",
      description:
        "Automated vulnerability scanning and exploitation framework for API security assessment",
      technologies: ["Python", "API Security", "Automation"],
      category: "Web Exploitation",
      githubLink: "#",
      liveLink: "#",
      icon: <FaCode className="text-yellow-500" />,
    },
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

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
            Cutting-Edge Security Projects
          </h1>
          <p className="text-xl text-[#8892B0]">
            Innovative cybersecurity solutions pushing technological boundaries
          </p>
        </motion.div>

        {/* Project Filters */}
        <div className="flex justify-center mb-12 space-x-4 flex-wrap">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 m-1 rounded-lg transition-all duration-300 ${
                filter === category
                  ? "bg-[#33FF33] text-[#0A192F]"
                  : "border border-[#33FF33] text-[#33FF33] hover:bg-[#33FF33] hover:text-[#0A192F]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
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
          {filteredProjects.map((project, index) => (
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
                <div className="text-4xl">{project.icon}</div>
                <div className="flex space-x-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8892B0] hover:text-[#33FF33] transition-colors"
                    >
                      <FaGithub className="w-6 h-6" />
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8892B0] hover:text-[#33FF33] transition-colors"
                    >
                      <FaLink className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#33FF33] mb-2">
                {project.title}
              </h3>
              <p className="text-sm mb-4 h-20 overflow-hidden">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-[#0A192F] text-xs rounded-full text-[#8892B0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Projects Found */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-[#8892B0]">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
