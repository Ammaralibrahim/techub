"use client"

import { motion } from "framer-motion"
import { FiTrendingUp, FiGlobe, FiAward, FiUsers, FiClock, FiShield } from "react-icons/fi"
import { TbRocket } from "react-icons/tb"

export default function About() {
  const stats = [
    { 
      icon: <FiTrendingUp className="text-xl" />, 
      value: "25+", 
      label: "High-Quality",
      suffix: "Projects"
    },
    { 
      icon: <FiGlobe className="text-xl" />, 
      value: "15+", 
      label: "Remote",
      suffix: "Countries"
    },
    { 
      icon: <FiAward className="text-xl" />, 
      value: "Direct", 
      label: "Founder",
      suffix: "Collaboration"
    },
    { 
      icon: <FiUsers className="text-xl" />, 
      value: "Focused", 
      label: "Small Team",
      suffix: "Better Results"
    },
  ]

  const values = [
    {
      title: "Craft Over Volume",
      description: "We take on fewer projects to ensure each receives our full attention and care.",
      icon: "⭐"
    },
    {
      title: "Clear Communication",
      description: "No agencies, no account managers—just direct collaboration with our founders.",
      icon: "💬"
    },
    {
      title: "Purposeful Design",
      description: "Every design decision serves your business goals and user needs.",
      icon: "🎯"
    }
  ]

  const timeline = [
    { year: "2024", title: "Focus", description: "Founded with a simple vision: build fewer, better products" },
    { year: "2024", title: "Refinement", description: "Defined our studio approach: small team, deep focus" },
    { year: "2025", title: "Growth", description: "Started serving startup founders and digital brands" },
    { year: "Today", title: "Clarity", description: "Helping ambitious brands build their digital foundation" },
  ]

  return (
    <section id="about" className="relative min-h-screen py-20 md:py-32 px-4 md:px-6 overflow-hidden bg-black">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Gradient Mesh */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`
          }}
        ></div>
        
        {/* Geometric Patterns - Responsive sizing */}
        <div className="absolute top-1/4 left-4 md:left-10 w-24 h-24 md:w-32 md:h-32 border border-white/5 xx-full"></div>
        <div className="absolute bottom-1/4 right-4 md:right-10 w-32 h-32 md:w-48 md:h-48 border border-white/5 xx-full"></div>
        
        {/* Floating Dots */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-1/4 w-1 h-1 bg-yellow-300/40 xx-full"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute bottom-60 left-1/3 w-2 h-2 bg-white/10 xx-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24 px-2"
        >
          <div className="inline-flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
            <span className="text-xs md:text-sm text-yellow-300 tracking-[0.2em] md:tracking-[0.3em] uppercase font-light">
              Our Approach
            </span>
            <div className="w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight mb-6 md:mb-8 px-2">
            <span className="text-white block mb-2 md:mb-0 md:inline">Building Digital</span>{" "}
            <motion.span 
              className="relative inline-block mt-2 md:mt-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* White box background */}
              <span className="absolute inset-0 bg-white -rotate-1"></span>
              {/* Text */}
              <span className="relative block text-black px-4 md:px-6 py-1 md:py-2 font-medium text-3xl md:text-5xl lg:text-7xl">
                Foundations
              </span>
            </motion.span>
          </h2>
          
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-6 md:my-8"></div>
          
          <p className="text-white/60 text-sm md:text-lg lg:text-xl max-w-2xl md:max-w-3xl mx-auto font-light tracking-wide leading-relaxed px-2">
            A focused web studio building digital foundations for ambitious brands. 
            We believe in fewer projects, deeper collaboration, and purposeful design.
          </p>
        </motion.div>

        {/* Stats Grid - Improved mobile layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-32"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/5 to-transparent xx-xl md:xx-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 xx-xl md:xx-2xl p-4 md:p-6 lg:p-8 group-hover:border-yellow-300/30 transition-all duration-500">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 xx-xl md:xx-2xl bg-yellow-300/10 border border-yellow-300/20 mb-4 md:mb-6 mx-auto group-hover:bg-yellow-300/20 transition-colors duration-300">
                  <div className="text-yellow-300 text-lg md:text-xl">
                    {stat.icon}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-yellow-300 text-xs md:text-sm tracking-widest uppercase mb-0.5 md:mb-1">{stat.label}</div>
                  <div className="text-white/40 text-xs md:text-sm">{stat.suffix}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content - Stack on mobile, side by side on desktop */}
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 mb-16 md:mb-32">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="lg:sticky lg:top-32">
              <span className="inline-block text-yellow-300 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-light mb-4 md:mb-6">
                Our Story
              </span>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 md:mb-8 leading-tight">
                Built for founders
                <span className="block text-yellow-300">by founders</span>
              </h3>
              
              <div className="space-y-4 md:space-y-6">
                <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">
                  We started because we saw too many great ideas get lost in agency bureaucracy. 
                  Too many layers, too little care. So we built a different kind of studio.
                </p>
                
                <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">
                  We're small by design. This means every project gets founder-level attention, 
                  from strategy to the final pixel. No junior teams, no handoffs—just consistent 
                  quality throughout.
                </p>
                
                <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">
                  Today, we work with startup founders and digital brands who value clarity, 
                  craftsmanship, and honest collaboration. We build the foundation they need 
                  to grow with confidence.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Timeline & Values */}
          <div className="lg:w-1/2 space-y-12 md:space-y-16">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-300/20 via-white/10 to-transparent"></div>
              
              <span className="inline-block text-white text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-light mb-6 md:mb-8">
                Our Journey
              </span>
              
              <div className="space-y-8 md:space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-16 md:pl-20 group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-yellow-300 xx-full border-2 md:border-4 border-black group-hover:scale-125 md:group-hover:scale-150 transition-transform duration-300"></div>
                    
                    <div className="text-yellow-300 text-lg md:text-xl lg:text-2xl font-light mb-1 md:mb-2">{item.year}</div>
                    <h4 className="text-white text-lg md:text-xl font-light mb-1 md:mb-2">{item.title}</h4>
                    <p className="text-white/50 text-xs md:text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Core Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-white text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-light mb-6 md:mb-8">
                Our Principles
              </span>
              
              <div className="space-y-4 md:space-y-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 8 }}
                    className="group"
                  >
                    <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 border border-white/10 xx-xl md:xx-2xl hover:border-yellow-300/30 hover:bg-black/30 transition-all duration-300">
                      <div className="text-xl md:text-2xl">{value.icon}</div>
                      <div>
                        <h4 className="text-white text-base md:text-lg font-light mb-1 md:mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                          {value.title}
                        </h4>
                        <p className="text-white/50 text-xs md:text-sm">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Commitment Section - Improved mobile layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Luxury Card */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 via-black/70 to-black xx-2xl md:xx-3xl"></div>
          <div className="absolute inset-0 border border-yellow-300/20 xx-2xl md:xx-3xl"></div>
          
          {/* Corner Accents - Smaller on mobile */}
          <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-4 h-4 md:w-8 md:h-8 border-t border-l border-yellow-300/30"></div>
          <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-4 h-4 md:w-8 md:h-8 border-b border-r border-yellow-300/30"></div>

          <div className="relative p-6 md:p-8 lg:p-12 xx-2xl md:xx-3xl">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 md:gap-12">
              <div className="lg:w-2/3">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 md:mb-6">
                  How We Work
                  <span className="block text-yellow-300">Differently</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-3 md:space-y-4">
                    <h4 className="text-white text-base md:text-lg font-light flex items-center gap-2 md:gap-3">
                      <FiClock className="text-yellow-300 text-lg md:text-xl" />
                      Deep Focus
                    </h4>
                    <p className="text-white/50 text-xs md:text-sm">
                      We limit our active projects to ensure each gets the attention it deserves.
                    </p>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <h4 className="text-white text-base md:text-lg font-light flex items-center gap-2 md:gap-3">
                      <FiShield className="text-yellow-300 text-lg md:text-xl" />
                      No Surprises
                    </h4>
                    <p className="text-white/50 text-xs md:text-sm">
                      Clear pricing, clear timelines, and honest communication at every step.
                    </p>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <h4 className="text-white text-base md:text-lg font-light flex items-center gap-2 md:gap-3">
                      <TbRocket className="text-yellow-300 text-lg md:text-xl" />
                      Founder-Led
                    </h4>
                    <p className="text-white/50 text-xs md:text-sm">
                      You work directly with our founders, not through layers of management.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/3 flex justify-center lg:justify-end">
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 xx-xl md:xx-2xl p-6 md:p-8 w-full max-w-sm">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-light text-yellow-300 mb-3 md:mb-4">2-3</div>
                    <div className="text-white text-sm md:text-base tracking-widest uppercase mb-1 md:mb-2">Active Projects</div>
                    <p className="text-white/50 text-xs md:text-sm">
                      Maximum at any time. This is how we maintain quality and attention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}