"use client"

import { motion } from "framer-motion"
import { FiInstagram, FiLinkedin, FiTwitter, FiArrowUp, FiFacebook, FiGithub } from "react-icons/fi"
import { useState } from "react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: <FiInstagram className="text-xl" />, label: "Instagram", href: "https://instagram.com/techhubstudio" },
    { icon: <FiLinkedin className="text-xl" />, label: "LinkedIn", href: "https://linkedin.com/company/techhubstudio" },
    { icon: <FiTwitter className="text-xl" />, label: "Twitter", href: "https://twitter.com/techhubstudio" },
    { icon: <FiFacebook className="text-xl" />, label: "Facebook", href: "https://facebook.com/techhubstudio" },
    { icon: <FiGithub className="text-xl" />, label: "GitHub", href: "https://github.com/techhubstudio" },
  ]

  const footerLinks = [
    { 
      title: "Services", 
      links: [
        { name: "Web Development", href: "#services" },
        { name: "UI/UX Design", href: "#services" },
        { name: "E-commerce", href: "#services" },
        { name: "Brand Strategy", href: "#services" }
      ] 
    },
    { 
      title: "Company", 
      links: [
        { name: "About Us", href: "#about" },
        { name: "Portfolio", href: "#projects" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#contact" }
      ] 
    },
    { 
      title: "Resources", 
      links: [
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#projects" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" }
      ] 
    },
  ]

  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      console.log("Subscribed:", email)
      setEmail("")
      // Burada email subscribe API çağrısı yapılabilir
    }
  }

  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-10 px-4 md:px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-32 h-32 border border-white/5 rounded-full"></div>
        <div className="absolute top-0 right-0 w-48 h-48 border border-white/5 rounded-full"></div>
      </div>
      
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-light mb-4">
                TechHub<span className="text-yellow-300">.</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base font-light mb-8 max-w-md">
                Crafting premium digital experiences for forward-thinking brands worldwide.
              </p>
              
              {/* Newsletter Subscription */}
              <div className="mb-8 md:mb-12">
                <h3 className="text-white text-sm tracking-widest uppercase mb-4 font-light">Stay Updated</h3>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-300/50 transition-all duration-300 font-light placeholder:text-white/30"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-white text-black font-light py-3 px-6 text-sm tracking-widest uppercase hover:bg-yellow-300 hover:text-white transition-all duration-300 whitespace-nowrap rounded-xl"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-white text-sm tracking-widest uppercase mb-4 font-light">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-yellow-300 hover:border-yellow-300/30 transition-all duration-300"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links - Responsive Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-3 gap-8 md:gap-12">
            {footerLinks.map((column, index) => (
              <div key={index}>
                <h3 className="text-white text-sm tracking-widest uppercase mb-6 font-light">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 5 }}
                        className="text-white/60 text-sm font-light hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2 group"
                        aria-label={`Navigate to ${link.name}`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-300/20 group-hover:bg-yellow-300 transition-colors duration-300"></div>
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8 md:mb-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          {/* Copyright */}
          <div className="text-white/40 text-xs md:text-sm text-center md:text-left font-light order-2 md:order-1">
            © {new Date().getFullYear()} TechHub Studio. All rights reserved.
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 order-1 md:order-2">
            <motion.a 
              href="#" 
              whileHover={{ y: -2 }}
              className="text-white/40 hover:text-yellow-300 text-xs md:text-sm transition-colors duration-300 font-light"
              aria-label="View our privacy policy"
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ y: -2 }}
              className="text-white/40 hover:text-yellow-300 text-xs md:text-sm transition-colors duration-300 font-light"
              aria-label="View our terms of service"
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ y: -2 }}
              className="text-white/40 hover:text-yellow-300 text-xs md:text-sm transition-colors duration-300 font-light"
              aria-label="View our cookie policy"
            >
              Cookie Policy
            </motion.a>
          </div>

          {/* Back to Top Button */}
          <motion.button
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-yellow-300 hover:border-yellow-300/30 transition-all duration-300 order-3"
            aria-label="Scroll back to top"
          >
            <FiArrowUp className="text-lg" />
          </motion.button>
        </div>

        {/* Contact Info - Mobile Only */}
        <div className="mt-8 md:hidden">
          <div className="grid grid-cols-1 gap-4 text-center">
            <div className="text-white/40 text-xs font-light">
              <span className="text-yellow-300">Email:</span> hello@techhub.com
            </div>
            <div className="text-white/40 text-xs font-light">
              <span className="text-yellow-300">Phone:</span> +90 555 123 4567
            </div>
            <div className="text-white/40 text-xs font-light">
              <span className="text-yellow-300">Location:</span> İstanbul, Turkey
            </div>
          </div>
        </div>

        {/* Trust Badges - Desktop Only */}
        <div className="hidden md:flex justify-center gap-8 mt-12">
          {[
            { text: "SSL Secured", icon: "🔒" },
            { text: "GDPR Compliant", icon: "📜" },
            { text: "24/7 Support", icon: "🛡️" }
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-white/30 text-xs">
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}