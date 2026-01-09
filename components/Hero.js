"use client"

import { motion } from "framer-motion"
import { FiCheck, FiArrowRight, FiChevronDown } from "react-icons/fi"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    })
  }

  const handleOrder = (plan) => {
    console.log(`Selected plan: ${plan}`)
    scrollToContact()
  }

  const openWhatsApp = () => {
    const phoneNumber = "905551234567" // WhatsApp numaranız
    const message = "Merhaba, TechHub web sitenizden iletişime geçiyorum. Bir projem var!"
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black pt-20 md:pt-0">
      {/* Logo - Responsive Positioning */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-6 left-4 md:top-12 md:left-8 z-20"
      >
        <div className="flex items-center gap-2">
          {/* Responsive Logo Image */}
          <div className="relative w-24 h-10 md:w-40 md:h-16">
            <Image
              src="/logo.png"
              alt="TechHub Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 96px, 160px"
            />
          </div>
        </div>
      </motion.div>

      {/* WhatsApp İkonu - Responsive */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        onClick={openWhatsApp}
        className="absolute top-6 right-4 md:top-8 md:right-8 z-20 group"
        aria-label="Contact via WhatsApp"
      >
        <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
          <FaWhatsapp className="text-2xl md:text-3xl text-yellow-300 transition-all duration-300 group-hover:text-yellow-200 group-hover:scale-110" />
        </div>
      </motion.button>

      {/* Scroll Icon - Responsive */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onClick={scrollToContact}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 group flex flex-col items-center focus:outline-none"
        aria-label="Scroll to contact"
      >
        <div className="text-xs text-white/30 tracking-widest uppercase mb-1 md:mb-2 group-hover:text-white/50 transition-colors duration-300 hidden md:block">
          Scroll
        </div>
        <div className="w-8 h-8 md:w-10 md:h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-yellow-300/30 transition-colors duration-300">
          <FiChevronDown className="text-white/50 text-sm md:text-base group-hover:text-yellow-300 transition-colors duration-300" />
        </div>
      </motion.button>

      {/* Background Decorations - Responsive */}
      <div className="absolute inset-0">
        <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 md:w-16 h-px bg-white/10"></div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8 w-px h-8 md:h-16 bg-white/10"></div>
        
        <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 md:w-1 md:h-1 bg-yellow-300/20 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-0.5 h-0.5 md:w-1 md:h-1 bg-yellow-300/15 rounded-full"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Responsive Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="w-4 h-px bg-white/20"></div>
            <span className="text-xs text-white/50 tracking-[0.2em] md:tracking-[0.3em] uppercase font-light">
              Premium Web Solutions
            </span>
            <div className="w-4 h-px bg-white/20"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-6 md:mb-8 leading-tight">
            <span className="text-white block md:inline">Elevate Your</span>
            <br className="hidden md:block" />
            <span className="relative inline-block mt-2 md:mt-0">
              <span className="absolute inset-0 bg-white -rotate-1"></span>
              <span className="relative block text-black px-3 py-1 md:px-6 md:py-2 font-medium text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
                Digital Presence
              </span>
            </span>
          </h1>
          
          <div className="w-16 md:w-32 h-px bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent mx-auto my-6 md:my-8"></div>
          
          <p className="text-white/70 text-base md:text-lg lg:text-xl max-w-sm md:max-w-2xl mx-auto font-light tracking-wide">
            Transform your vision into a stunning digital experience. 
            <span className="block text-yellow-300 text-sm md:text-base mt-2">
              No compromises. Just excellence.
            </span>
          </p>
        </motion.div>

        {/* Responsive Pricing Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
        >
          {/* Starter Package - Responsive */}
          <div className="group relative border border-white/10 bg-black/50 p-6 md:p-8 hover:border-yellow-300/30 transition-all duration-300 flex flex-col">
            <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-white text-black px-3 py-1 text-xs tracking-widest uppercase">
                Most Popular
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-light text-white mb-3 md:mb-4">Starter Website</h3>
            <div className="mb-4 md:mb-6">
              <span className="text-3xl md:text-4xl font-light text-yellow-300">$100</span>
              <span className="text-white/50 text-xs md:text-sm ml-2">one-time</span>
            </div>
            
            <p className="text-white/60 text-sm mb-6 font-light">
              1 stunning landing page, ultra-fast & modern design
            </p>
            
            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow">
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                Single landing page
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                Modern & elegant design
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                Lightning fast loading
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                Mobile responsive
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                3-day delivery
              </li>
            </ul>
            
            <button
              onClick={() => handleOrder("Starter")}
              className="mt-auto bg-white text-black font-light py-3 text-sm tracking-widest uppercase hover:bg-yellow-300 hover:text-white transition-all duration-300 group-hover:scale-[1.02] w-full"
            >
              Get Started
            </button>
          </div>

          {/* Business Package - Responsive */}
          <div className="group relative border border-white/10 bg-black/50 p-6 md:p-8 hover:border-yellow-300/30 transition-all duration-300 flex flex-col">
            <h3 className="text-xl md:text-2xl font-light text-white mb-3 md:mb-4">Business Website</h3>
            <div className="mb-4 md:mb-6">
              <span className="text-3xl md:text-4xl font-light text-yellow-300">$249</span>
              <span className="text-white/50 text-xs md:text-sm ml-2">one-time</span>
            </div>
            
            <p className="text-white/60 text-sm mb-6 font-light">
              Up to 5 pages with animations, fully responsive & professional
            </p>
            
            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow">
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                Up to 5 pages
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                Advanced animations
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                Fully responsive
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                SEO optimized
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                5-day delivery
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <FiCheck className="text-yellow-300 mr-3 flex-shrink-0" />
                Contact form integration
              </li>
            </ul>
            
            <button
              onClick={() => handleOrder("Business")}
              className="mt-auto border border-white/20 text-white font-light py-3 text-sm tracking-widest uppercase hover:border-yellow-300 hover:bg-yellow-300/10 transition-all duration-300 group-hover:scale-[1.02] w-full"
            >
              Choose Business
            </button>
          </div>

          {/* Premium Package - Responsive */}
          <div className="group relative border-2 border-yellow-300 bg-gradient-to-br from-yellow-300/15 via-black/70 to-black p-6 md:p-8 hover:border-yellow-300 hover:shadow-xl hover:shadow-yellow-300/10 transition-all duration-300 flex flex-col">
            <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-300 text-black px-3 py-1 text-xs tracking-widest uppercase">
                PREMIUM
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-light text-white mb-3 md:mb-4">Premium Brand Website</h3>
            <div className="mb-4 md:mb-6">
              <span className="text-3xl md:text-4xl font-light text-yellow-300">$500</span>
              <span className="text-white/50 text-xs md:text-sm ml-2">one-time</span>
            </div>
            
            <p className="text-white/60 text-sm mb-6 font-light">
              Multi-page website with advanced animations, optimized speed & premium features
            </p>
            
            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow">
              <li className="flex items-center text-white/70 text-sm">
                <div className="w-4 h-4 bg-yellow-300/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <FiCheck className="text-yellow-300 text-xs" />
                </div>
                Multi-page (10+ pages)
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <div className="w-4 h-4 bg-yellow-300/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <FiCheck className="text-yellow-300 text-xs" />
                </div>
                Advanced animations & effects
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <div className="w-4 h-4 bg-yellow-300/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <FiCheck className="text-yellow-300 text-xs" />
                </div>
                Optimized loading speed
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <div className="w-4 h-4 bg-yellow-300/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <FiCheck className="text-yellow-300 text-xs" />
                </div>
                Advanced SEO setup
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <div className="w-4 h-4 bg-yellow-300/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <FiCheck className="text-yellow-300 text-xs" />
                </div>
                7-day delivery
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <div className="w-4 h-4 bg-yellow-300/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <FiCheck className="text-yellow-300 text-xs" />
                </div>
                CMS integration
              </li>
              <li className="flex items-center text-white/70 text-sm">
                <div className="w-4 h-4 bg-yellow-300/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <FiCheck className="text-yellow-300 text-xs" />
                </div>
                Premium support (30 days)
              </li>
            </ul>
            
            <button
              onClick={() => handleOrder("Premium")}
              className="mt-auto border-2 border-yellow-300 bg-transparent text-yellow-300 font-light py-3 text-sm tracking-widest uppercase hover:bg-yellow-300 hover:text-white transition-all duration-300 group-hover:scale-[1.02] w-full hover:shadow-lg hover:shadow-yellow-300/20"
            >
              Go Premium
            </button>
          </div>
        </motion.div>

        {/* Responsive Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 md:mb-8">
            <button
              onClick={scrollToContact}
              className="group bg-white text-black font-light py-3 px-8 md:py-4 md:px-10 text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-yellow-300 hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              <span>Request Custom Quote</span>
              <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <a
              href="#projects"
              className="text-white/70 font-light py-3 px-8 md:py-4 md:px-8 text-sm tracking-widest uppercase border border-white/10 hover:border-yellow-300/30 hover:text-white transition-all duration-300 w-full sm:w-auto text-center"
            >
              View Portfolio
            </a>
          </div>
          
          <p className="text-white/40 text-xs md:text-sm max-w-sm md:max-w-md mx-auto font-light">
            All packages include free hosting setup & basic SEO. 
            <span className="block mt-1">30-day money back guarantee.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}