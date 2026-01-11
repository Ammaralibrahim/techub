"use client"

import { motion } from "framer-motion"
import { FiCode, FiSmartphone, FiBarChart2, FiShield, FiChevronRight, FiZap, FiLayers, FiGlobe } from "react-icons/fi"
import { TbWorldWww } from "react-icons/tb"
import { SiGoogleanalytics } from "react-icons/si"

export default function Services() {
  const services = [
    {
      icon: <FiCode className="text-xl sm:text-2xl" />,
      title: "Elite Web Development",
      description: "Architecting digital masterpieces with cutting-edge technologies and meticulous attention to detail.",
      features: ["Next.js 14 & React 18", "TypeScript Excellence", "Micro-Interactions", "Performance at Scale"],
      gradient: "from-blue-500/10 via-transparent to-transparent",
      accent: "text-blue-300",
      border: "border-blue-500/20",
      number: "01"
    },
    {
      icon: <FiSmartphone className="text-xl sm:text-2xl" />,
      title: "Mobile-First Mastery",
      description: "Creating immersive experiences that adapt seamlessly across every device and screen dimension.",
      features: ["Progressive Web Apps", "Native-like Performance", "Gesture Navigation", "Offline Capabilities"],
      gradient: "from-purple-500/10 via-transparent to-transparent",
      accent: "text-purple-300",
      border: "border-purple-500/20",
      number: "02"
    },
    {
      icon: <TbWorldWww className="text-xl sm:text-2xl" />,
      title: "E-commerce Excellence",
      description: "Building high-conversion digital storefronts that drive revenue and customer loyalty.",
      features: ["Shopify Plus", "Headless Commerce", "Payment Integration", "Inventory Intelligence"],
      gradient: "from-green-500/10 via-transparent to-transparent",
      accent: "text-green-300",
      border: "border-green-500/20",
      number: "03"
    },
    {
      icon: <FiLayers className="text-xl sm:text-2xl" />,
      title: "Enterprise Solutions",
      description: "Scalable architectures designed for large organizations with complex business requirements.",
      features: ["Custom CRM/ERP", "API Ecosystems", "Enterprise Security", "Cloud Migration"],
      gradient: "from-yellow-500/10 via-transparent to-transparent",
      accent: "text-yellow-300",
      border: "border-yellow-500/20",
      number: "04"
    },
    {
      icon: <FiZap className="text-xl sm:text-2xl" />,
      title: "Performance Optimization",
      description: "Achieving lightning-fast loading speeds and optimal Core Web Vitals scores.",
      features: ["95+ Lighthouse Score", "CDN Integration", "Image Optimization", "Code Splitting"],
      gradient: "from-red-500/10 via-transparent to-transparent",
      accent: "text-red-300",
      border: "border-red-500/20",
      number: "05"
    },
    {
      icon: <SiGoogleanalytics className="text-xl sm:text-2xl" />,
      title: "Data & Analytics",
      description: "Transforming raw data into actionable insights with sophisticated analytics platforms.",
      features: ["Real-time Dashboards", "Custom Reporting", "A/B Testing Suite", "ROI Tracking"],
      gradient: "from-cyan-500/10 via-transparent to-transparent",
      accent: "text-cyan-300",
      border: "border-cyan-500/20",
      number: "06"
    }
  ]

  const enterpriseFeatures = [
    {
      title: "24/7 Premium Support",
      description: "Round-the-clock technical support with 30-minute response time guarantee",
      icon: "⚡"
    },
    {
      title: "Enterprise Security",
      description: "Military-grade encryption and compliance with industry standards",
      icon: "🛡️"
    },
    {
      title: "Performance SLA",
      description: "99.99% uptime guarantee with comprehensive service level agreement",
      icon: "📊"
    },
    {
      title: "Dedicated Team",
      description: "Assigned specialists who deeply understand your business objectives",
      icon: "👥"
    }
  ]

  return (
    <section id="services" className="relative min-h-screen py-12 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden bg-black">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "30px 30px"
        }}></div>
        
        {/* Floating Luxury Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-4 sm:left-10 w-1 h-1 bg-yellow-300/30 xx-full"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-3/4 right-4 sm:right-20 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/10 xx-full"
        />
        
        {/* Corner Accents */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-t border-l border-white/10"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-b border-r border-white/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
            <div className="w-4 sm:w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
            <span className="text-xs sm:text-sm text-yellow-300 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase font-light">
              Our Services
            </span>
            <div className="w-4 sm:w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mb-4 sm:mb-6 md:mb-8">
            <span className="text-white">Crafting Digital</span>
            <br />
            <span className="text-yellow-300">Excellence</span>
          </h2>
          
          <div className="w-12 sm:w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-4 sm:my-6 md:my-8"></div>
          
          <p className="text-white/60 text-xs sm:text-sm md:text-lg lg:text-xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto font-light tracking-wide leading-relaxed px-2">
            We deliver bespoke digital solutions that transcend conventional boundaries, 
            blending cutting-edge technology with unparalleled craftsmanship.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-20 md:mb-32">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative h-full"
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 xx-xl sm:xx-2xl blur-xl`}></div>
              
              {/* Service Card */}
              <div className={`relative h-full bg-black/50 backdrop-blur-sm border ${service.border} xx-xl sm:xx-2xl p-4 sm:p-6 md:p-8 group-hover:border-white/30 transition-all duration-500 overflow-hidden`}>
                {/* Service Number */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 text-[80px] sm:text-[100px] md:text-[120px] font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                  {service.number}
                </div>

                {/* Icon Container */}
                <div className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 xx-xl sm:xx-2xl ${service.accent}/10 border ${service.border} flex items-center justify-center mb-4 sm:mb-6 md:mb-8 group-hover:${service.accent}/20 transition-all duration-300`}>
                  <div className={service.accent}>
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-3 sm:mb-4 md:mb-6 group-hover:text-yellow-300 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8 leading-relaxed font-light line-clamp-3">
                  {service.description}
                </p>

                <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 mb-4 sm:mb-6 md:mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-white/70 text-xs sm:text-sm group-hover:text-white transition-colors duration-300">
                      <FiChevronRight className={`${service.accent} mr-2 sm:mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs sm:text-sm`} />
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Explore Button */}
                <div className="mt-auto pt-4 sm:pt-6 border-t border-white/10 group-hover:border-white/30 transition-colors duration-300">
                  <button className="text-xs sm:text-sm text-white/50 group-hover:text-yellow-300 uppercase tracking-widest flex items-center gap-1 sm:gap-2 transition-colors duration-300">
                    Explore Service
                    <FiChevronRight className="group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300 text-xs sm:text-sm" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Solutions Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Luxury Card Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/5 via-black/80 to-black xx-xl sm:xx-2xl lg:xx-3xl"></div>
          <div className="absolute inset-0 border border-yellow-300/20 xx-xl sm:xx-2xl lg:xx-3xl"></div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-t border-l border-yellow-300/30"></div>
          <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-b border-r border-yellow-300/30"></div>

          <div className="relative p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 xx-xl sm:xx-2xl lg:xx-3xl">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div>
                <span className="inline-block text-yellow-300 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase font-light mb-3 sm:mb-4 md:mb-6">
                  Enterprise Excellence
                </span>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-4 sm:mb-6 md:mb-8 leading-tight">
                  Tailored Solutions for
                  <span className="block text-yellow-300">Global Enterprises</span>
                </h3>

                <p className="text-white/60 text-xs sm:text-sm md:text-lg mb-6 sm:mb-8 md:mb-12 leading-relaxed font-light">
                  For organizations that demand nothing less than perfection, 
                  we offer bespoke solutions engineered to drive innovation, 
                  efficiency, and sustainable growth.
                </p>

                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-300 text-black font-light py-3 sm:py-4 px-6 sm:px-8 md:px-10 text-xs sm:text-sm tracking-widest uppercase hover:bg-white transition-all duration-300 whitespace-nowrap"
                  >
                    Schedule Consultation
                  </motion.button>
                  <button className="border border-white/20 text-white font-light py-3 sm:py-4 px-6 sm:px-8 md:px-10 text-xs sm:text-sm tracking-widest uppercase hover:border-yellow-300 hover:text-yellow-300 transition-all duration-300 whitespace-nowrap">
                    View Case Studies
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
                {enterpriseFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-black/40 backdrop-blur-sm border border-white/10 xx-lg sm:xx-xl p-4 sm:p-6 hover:border-yellow-300/30 transition-all duration-300"
                  >
                    <div className="text-xl sm:text-2xl mb-2 sm:mb-3 md:mb-4">{feature.icon}</div>
                    <h4 className="text-white text-sm sm:text-base md:text-lg font-light mb-1 sm:mb-2">{feature.title}</h4>
                    <p className="text-white/50 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-20 md:mt-32 pt-8 sm:pt-12 md:pt-16 border-t border-white/10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {[
              { value: "99.9%", label: "Uptime Guarantee" },
              { value: "24/7", label: "Premium Support" },
              { value: "48h", label: "Response Time" },
              { value: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="relative">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-yellow-300 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-white/50 text-xs sm:text-sm tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Add custom styles for line clamp */}
      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}