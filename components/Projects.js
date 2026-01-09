"use client"

import { motion } from "framer-motion"
import { FiExternalLink, FiGithub, FiCalendar, FiUsers, FiCode, FiArrowRight, FiCheck } from "react-icons/fi"
import { useState } from "react"
import Image from "next/image"

// Teknoloji icon"ları için import"lar
import { 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiTailwindcss, 
  SiFramer, 
  SiThreedotjs, 
  SiGooglecloud 
} from "react-icons/si"

// Proje verileri
const projects = [
  {
    id: 1,
    title: "Gamma Cities",
    description: "A virtual metaverse platform offering gaming-like immersion with diverse online spaces.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Three.js", "Google Cloud"],
    image: "/gammacities.png",
    link: "https://gammacities.com",
    featured: true,
    features: [
      "Real-time 3D rendering",
      "Multi-user synchronization",
      "Avatar customization",
      "Virtual event hosting"
    ],
    status: "Live",
    launchDate: "2023",
    teamSize: "2 developers",
    role: "Full Stack Developer"
  },
  {
    id: 2,
    title: "ASAK",
    description: "An international company based in Turkey, specializing in building startups and digital services.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "GSAP", "Framer Motion"],
    image: "/asak.png",
    link: "https://asakcompany.vercel.app/asak",
    featured: true,
    features: [
      "Multi-language support",
      "Advanced animations",
      "SEO optimized pages",
      "Real-time dashboard"
    ],
    status: "In Development",
    launchDate: "2025",
    teamSize: "1 developer",
    role: "Project Leader"
  },
  {
    id: 3,
    title: "GammaAssets",
    description: "Blockchain-powered real estate investment platform for metaverse properties.",
    technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "Blockchain"],
    image: "/gammaassets.png",
    link: "https://gammaassets.com/",
    featured: false,
    features: [
      "Blockchain-based ownership",
      "Smart contract integration",
      "Portfolio tracking",
      "Crypto payment gateway"
    ],
    status: "Live",
    launchDate: "2023",
    teamSize: "2 developers",
    role: "Full Stack Developer"
  },
  {
    id: 4,
    title: "BrightEdu",
    description: "Modern educational platform with parallax effects and smooth animations.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/brightedu.png",
    link: "https://brightedu.vercel.app/",
    featured: false,
    features: [
      "Interactive courses",
      "Progress tracking",
      "Video streaming",
      "Assessment tools"
    ],
    status: "Live",
    launchDate: "2023",
    teamSize: "1 developer",
    role: "Project Lead"
  },
  {
    id: 5,
    title: "Gamma Universe",
    description: "Central hub for all Gamma company platforms with unified design system.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    image: "/gammauniverse.png",
    link: "https://www.gammauniverse.io/",
    featured: false,
    features: [
      "Unified authentication",
      "Cross-platform navigation",
      "Analytics dashboard",
      "API documentation"
    ],
    status: "Live",
    launchDate: "2023",
    teamSize: "1 developer",
    role: "Full Stack Developer"
  },
  {
    id: 6,
    title: "Gamma Studio",
    description: "Promotional platform for accessing metaverse spaces and interactive demos.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Google Cloud"],
    image: "/gammastudio.png",
    link: "https://gammastudio.io",
    featured: false,
    features: [
      "Interactive demos",
      "Case studies",
      "Virtual tours",
      "Client portal"
    ],
    status: "Live",
    launchDate: "2023",
    teamSize: "1 developer",
    role: "Full Stack Developer"
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

  const projectCategories = ["All", "Featured", "Metaverse", "Web Apps"]

  const filteredProjects = projects.filter(project => {
    if (activeFilter === "All") return true
    if (activeFilter === "Featured") return project.featured
    if (activeFilter === "Metaverse") return project.title.includes("Gamma")
    if (activeFilter === "Web Apps") return true
    return true
  })

  const technologyIcons = {
    "React.js": <SiReact className="text-base sm:text-lg text-cyan-400" />,
    "Next.js": <SiNextdotjs className="text-base sm:text-lg text-white" />,
    "Node.js": <SiNodedotjs className="text-base sm:text-lg text-green-500" />,
    "Express.js": <SiExpress className="text-base sm:text-lg text-gray-300" />,
    "MongoDB": <SiMongodb className="text-base sm:text-lg text-green-400" />,
    "Tailwind CSS": <SiTailwindcss className="text-base sm:text-lg text-teal-400" />,
    "Framer Motion": <SiFramer className="text-base sm:text-lg text-pink-500" />,
    "Three.js": <SiThreedotjs className="text-base sm:text-lg text-blue-300" />,
    "Google Cloud": <SiGooglecloud className="text-base sm:text-lg text-blue-400" />,
    "Blockchain": <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded" />,
  };

  return (
    <section id="projects" className="relative min-h-screen py-12 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 sm:left-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-white/5 rounded-full"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 border border-white/5 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-20 px-2"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
            <div className="w-4 sm:w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
            <span className="text-[10px] xs:text-xs sm:text-sm md:text-sm text-yellow-300 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase font-light">
              Our Portfolio
            </span>
            <div className="w-4 sm:w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mb-4 sm:mb-6 md:mb-8 px-2">
            <span className="text-white block mb-1 sm:mb-2 md:mb-0 md:inline">Featured</span>{" "}
            <span className="relative inline-block mt-1 sm:mt-2 md:mt-0">
              <span className="absolute inset-0 bg-white -rotate-1"></span>
              <span className="relative block text-black px-3 sm:px-4 md:px-6 py-1 sm:py-2 font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
                Projects
              </span>
            </span>
          </h2>
          
          <div className="w-12 sm:w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-4 sm:my-6 md:my-8"></div>
          
          <p className="text-white/60 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto font-light tracking-wide leading-relaxed px-2">
            Discover our portfolio of exceptional digital solutions that have transformed businesses worldwide.
          </p>
        </motion.div>

        {/* Project Categories - Improved mobile scrolling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-1.5 sm:gap-2 md:gap-3 mb-8 sm:mb-12 md:mb-16 px-1 overflow-x-auto pb-2 scrollbar-hide"
        >
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm font-light tracking-widest uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeFilter === category
                  ? "bg-yellow-300 text-black shadow-lg shadow-yellow-300/20"
                  : "border border-white/10 text-white/70 hover:border-yellow-300/30 hover:text-yellow-300"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* All Projects as Large Cards - Improved mobile layout */}
        <div className="space-y-6 sm:space-y-8 md:space-y-12 mb-12 sm:mb-16 md:mb-20">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              {/* Large Project Card */}
              <div className={`relative bg-black/50 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-500 
                ${project.featured ? "border border-yellow-300/50" : "border border-white/10"} 
                group-hover:border-yellow-300/30`}>
                
                {/* Badges - Improved mobile positioning */}
                <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 z-20 flex justify-between">
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="bg-yellow-300 text-black px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full text-[10px] xs:text-xs sm:text-xs font-semibold uppercase tracking-widest flex items-center gap-1 sm:gap-2">
                      <FiCheck className="text-[10px] xs:text-xs sm:text-xs md:text-sm" />
                      <span className="hidden xs:inline">Featured</span>
                      <span className="inline xs:hidden">★</span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className={`px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full text-[10px] xs:text-xs sm:text-xs font-semibold uppercase tracking-widest backdrop-blur-sm flex items-center gap-1 sm:gap-2 ml-auto ${
                    project.status === "Live" 
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                  }`}>
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${project.status === "Live" ? "bg-green-300" : "bg-yellow-300"}`}></div>
                    <span>{project.status}</span>
                  </div>
                </div>

                {/* Grid Layout - Improved mobile stacking */}
                <div className="flex flex-col lg:flex-row">
                  {/* Left Side - Project Image */}
                  <div className="relative w-full lg:w-1/2 h-40 xs:h-48 sm:h-56 md:h-64 lg:h-auto lg:min-h-[350px] bg-black overflow-hidden order-1">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-contain p-4 sm:p-6 md:p-8 lg:p-12"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                          priority={index < 2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Project Details */}
                  <div className="w-full lg:w-1/2 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-between order-2">
                    <div>
                      {/* Project Number - Responsive display */}
                      <div className="text-[10px] xs:text-xs sm:text-sm text-yellow-300 tracking-widest uppercase mb-2 sm:mb-3 md:mb-4 font-light hidden xs:block">
                        Project 0{index + 1}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-3xl font-light text-white mb-2 sm:mb-3 md:mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/50 text-xs xs:text-sm sm:text-base mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-relaxed font-light">
                        {project.description}
                      </p>

                      {/* Technologies - Improved mobile grid */}
                      <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                        <h4 className="text-white text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-3 md:mb-4 font-light">Technologies</h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-white/5 text-white/70 text-[10px] xs:text-xs rounded-full border border-white/10 group-hover:border-white/20 transition-colors duration-300"
                            >
                              <div className="hidden xs:block">
                                {technologyIcons[tech] || <FiCode className="text-white/50 text-xs sm:text-sm" />}
                              </div>
                              <span className="text-[10px] xs:text-xs truncate max-w-[60px] xs:max-w-none">{tech.replace(".js", "")}</span>
                            </div>
                          ))}
                          {project.technologies.length > 3 && (
                            <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-white/5 text-white/70 text-[10px] xs:text-xs rounded-full border border-white/10">
                              <span className="text-[10px] xs:text-xs">+{project.technologies.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Features - Responsive grid */}
                      <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                        <h4 className="text-white text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-3 md:mb-4 font-light">Key Features</h4>
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                          {project.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-300 mt-0.5 sm:mt-1 md:mt-1.5 flex-shrink-0"></div>
                              <span className="text-white/70 text-[10px] xs:text-xs sm:text-sm line-clamp-2">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Project Meta & Actions */}
                    <div>
                      {/* Meta Info - Improved mobile layout */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                        <div className="space-y-0.5 sm:space-y-1">
                          <div className="flex items-center gap-1 sm:gap-2 text-white/50 text-[10px] xs:text-xs sm:text-sm">
                            <FiCalendar className="text-yellow-300 text-[10px] xs:text-xs sm:text-sm" />
                            <span className="font-light">Launch Date</span>
                          </div>
                          <div className="text-white text-xs xs:text-sm sm:text-base font-light">{project.launchDate}</div>
                        </div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <div className="flex items-center gap-1 sm:gap-2 text-white/50 text-[10px] xs:text-xs sm:text-sm">
                            <FiUsers className="text-yellow-300 text-[10px] xs:text-xs sm:text-sm" />
                            <span className="font-light">Team Size</span>
                          </div>
                          <div className="text-white text-xs xs:text-sm sm:text-base font-light">{project.teamSize}</div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4 sm:mb-5 md:mb-6 lg:mb-8"></div>

                      {/* Action Buttons - Better mobile layout */}
                      <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 md:gap-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn bg-white text-black font-light py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-[10px] xs:text-xs sm:text-sm tracking-widest uppercase hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 flex-1"
                        >
                          <span>View Project</span>
                          <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300 text-[10px] xs:text-xs sm:text-sm" />
                        </a>
                        <button className="border border-white/20 text-white font-light py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-[10px] xs:text-xs sm:text-sm tracking-widest uppercase hover:border-yellow-300 hover:text-yellow-300 transition-all duration-300 flex-1">
                          Case Study
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action - Improved mobile responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center px-2"
        >
          <div className="relative border border-yellow-300/20 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 bg-gradient-to-br from-yellow-300/5 via-black/50 to-black">
            <div className="absolute -top-2.5 sm:-top-3 md:-top-6 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-300 text-black px-3 py-0.5 sm:px-4 sm:py-1 md:px-6 md:py-2 text-[10px] xs:text-xs sm:text-sm tracking-widest uppercase font-light whitespace-nowrap">
                Lets Work Together
              </span>
            </div>
            
            <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-3xl font-light text-white mb-3 sm:mb-4 md:mb-6 mt-3 sm:mt-4 md:mt-0">
              Have a Project in Mind?
            </h3>
            
            <p className="text-white/60 text-xs xs:text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-xs sm:max-w-md md:max-w-2xl mx-auto font-light">
              Transform your vision into an exceptional digital experience.
            </p>
            
            <a
              href="#contact"
              className="group bg-white text-black font-light py-2.5 sm:py-3 md:py-4 px-6 sm:px-8 md:px-12 text-[10px] xs:text-xs sm:text-sm tracking-widest uppercase hover:bg-yellow-300 hover:text-white transition-all duration-300 inline-flex items-center gap-1.5 sm:gap-2 md:gap-3"
            >
              <span>Start Your Project</span>
              <FiArrowRight className="group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300 text-xs sm:text-sm" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Add custom scrollbar hiding for categories */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}