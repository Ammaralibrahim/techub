"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck, FiClock, FiShield, FiDollarSign, FiMessageSquare } from "react-icons/fi"
import { toast } from "@/lib/toast"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Airtable veri hazırlama
      const airtableData = {
        name: formData.name,
        email: formData.email,
        company: formData.company || "",
        budget: formData.budget || "",
        message: formData.message,
        source: "Contact Page",
        submissionTime: new Date().toISOString()
      }

      // API'ye gönder
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airtableData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Form gönderilemedi")
      }

      // Başarılı
      console.log("Airtable kaydı başarılı:", result)

      // Toast bildirimi göster
      toast.success(
        "Message sent successfully! We'll get back to you within 24 hours.",
        {
          duration: 5000,
          position: "bottom-right"
        }
      )

      setIsSubmitting(false)
      setIsSubmitted(true)

      // 3 saniye sonra formu sıfırla
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          budget: "",
          message: ""
        })
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error("Gönderim hatası:", error)

      // Hata toast'ı göster
      toast.error(`Message failed to send: ${error.message}`, {
        duration: 6000,
        position: "bottom-right"
      })

      setIsSubmitting(false)
      setIsSubmitted(false)
    }
  }

  const contactInfo = [
    {
      icon: <FiMail className="text-base sm:text-xl" />,
      title: "Email Address",
      value: "hello@techhub.com",
      link: "mailto:hello@techhub.com"
    },
    {
      icon: <FiPhone className="text-base sm:text-xl" />,
      title: "Phone Number",
      value: "+90 555 123 4567",
      link: "tel:+905551234567"
    },
    {
      icon: <FiMapPin className="text-base sm:text-xl" />,
      title: "Our Location",
      value: "İstanbul, Turkey",
      link: "#"
    }
  ]

  const budgets = [
    { value: "$1k-$5k", label: "Basic Project" },
    { value: "$5k-$15k", label: "Standard Project" },
    { value: "$15k-$50k", label: "Premium Project" },
    { value: "$50k+", label: "Enterprise Solution" }
  ]

  return (
    <section
      id="contact"
      className="relative min-h-screen py-12 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden bg-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-4 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-white/5 rounded-full"></div>
        <div className="absolute bottom-1/4 left-4 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 border border-white/5 rounded-full"></div>

        {/* Corner Accents */}
        <div className="absolute top-10 sm:top-20 right-4 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border-t border-r border-white/10"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border-b border-l border-white/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
            <div className="w-4 sm:w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
            <span className="text-xs sm:text-sm text-yellow-300 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase font-light">
              Get In Touch
            </span>
            <div className="w-4 sm:w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mb-4 sm:mb-6 md:mb-8">
            <span className="text-white">Lets Start Your</span>
            <br />
            <span className="relative inline-block mt-1 sm:mt-2 md:mt-0">
              {/* White box background */}
              <span className="absolute inset-0 bg-white -rotate-1"></span>
              {/* Text */}
              <span className="relative block text-black px-3 sm:px-4 md:px-6 py-1 sm:py-2 font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Project
              </span>
            </span>
          </h2>

          <div className="w-12 sm:w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-4 sm:my-6 md:my-8"></div>

          <p className="text-white/60 text-xs sm:text-sm md:text-lg lg:text-xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto font-light tracking-wide leading-relaxed px-2">
            Share your vision with us. Lets create something exceptional
            together. Schedule a complimentary consultation with our experts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12">
              {/* Form Header */}
              <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <div className="inline-flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-300"></div>
                  <span className="text-xs sm:text-sm text-yellow-300 tracking-widest uppercase font-light">
                    Project Inquiry
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white mb-2 sm:mb-3 md:mb-4">
                  Tell Us About Your Project
                </h3>
                <p className="text-white/50 text-xs sm:text-sm font-light">
                  Fill out the form below and well get back to you within 24
                  hours.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5 md:space-y-6"
              >
                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm text-white/70 mb-1.5 sm:mb-2 font-light"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm focus:outline-none focus:border-yellow-300/50 transition-all duration-300 font-light"
                      placeholder="Enter your name"
                      aria-label="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm text-white/70 mb-1.5 sm:mb-2 font-light"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm focus:outline-none focus:border-yellow-300/50 transition-all duration-300 font-light"
                      placeholder="Enter your email"
                      aria-label="Your email address"
                    />
                  </div>
                </div>

                {/* Company & Budget */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs sm:text-sm text-white/70 mb-1.5 sm:mb-2 font-light"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm focus:outline-none focus:border-yellow-300/50 transition-all duration-300 font-light"
                      placeholder="Your company name"
                      aria-label="Your company name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-xs sm:text-sm text-white/70 mb-1.5 sm:mb-2 font-light"
                    >
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm focus:outline-none focus:border-yellow-300/50 transition-all duration-300 font-light appearance-none"
                      aria-label="Project budget"
                    >
                      <option value="">Select budget range</option>
                      {budgets.map((budget, index) => (
                        <option key={index} value={budget.value}>
                          {budget.label} ({budget.value})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm text-white/70 mb-1.5 sm:mb-2 font-light"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm focus:outline-none focus:border-yellow-300/50 transition-all duration-300 font-light resize-none"
                    placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                    aria-label="Your project details"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full font-light py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 text-xs sm:text-sm tracking-widest uppercase ${
                    isSubmitted
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-white text-black hover:bg-yellow-300 hover:text-white"
                  }`}
                  aria-label={
                    isSubmitted ? "Message sent successfully" : "Send message"
                  }
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <FiCheck className="text-sm sm:text-base md:text-lg" />
                      Message Sent Successfully
                    </>
                  ) : (
                    <>
                      <FiSend className="text-sm sm:text-base" />
                      Submit Project Inquiry
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information & Details */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-5 md:space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  whileHover={{ x: 8 }}
                  className="group relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-500 hover:border-yellow-300/30 block"
                  aria-label={info.title}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 group-hover:bg-yellow-300/10 group-hover:border-yellow-300/30 transition-all duration-300">
                      <div className="text-yellow-300">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white text-base sm:text-lg md:text-xl font-light mb-0.5 sm:mb-1">
                        {info.title}
                      </h3>
                      <p className="text-white/50 text-xs sm:text-sm font-light">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Our Commitment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-yellow-300/5 via-black/50 to-black border border-yellow-300/20 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8"
            >
              <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-300 text-black px-3 sm:px-4 py-0.5 sm:py-1 text-xs tracking-widest uppercase font-light whitespace-nowrap rounded-full">
                  Our Promise
                </span>
              </div>

              <div className="space-y-4 sm:space-y-5 md:space-y-6 pt-2 sm:pt-3">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-yellow-300/10 border border-yellow-300/20">
                    <FiClock className="text-yellow-300 text-sm sm:text-base" />
                  </div>
                  <div>
                    <h4 className="text-white text-base sm:text-lg md:text-xl font-light mb-1 sm:mb-2">
                      24-Hour Response
                    </h4>
                    <p className="text-white/50 text-xs sm:text-sm font-light">
                      We guarantee a response within 24 hours for all inquiries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-yellow-300/10 border border-yellow-300/20">
                    <FiShield className="text-yellow-300 text-sm sm:text-base" />
                  </div>
                  <div>
                    <h4 className="text-white text-base sm:text-lg md:text-xl font-light mb-1 sm:mb-2">
                      Confidentiality
                    </h4>
                    <p className="text-white/50 text-xs sm:text-sm font-light">
                      Your project details are protected by strict NDA
                      agreements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-yellow-300/10 border border-yellow-300/20">
                    <FiDollarSign className="text-yellow-300 text-sm sm:text-base" />
                  </div>
                  <div>
                    <h4 className="text-white text-base sm:text-lg md:text-xl font-light mb-1 sm:mb-2">
                      Transparent Pricing
                    </h4>
                    <p className="text-white/50 text-xs sm:text-sm font-light">
                      No hidden fees. Clear pricing with detailed project
                      estimates.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Response Process */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8"
            >
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-light mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 sm:gap-3">
                <FiMessageSquare className="text-yellow-300 text-base sm:text-lg" />
                Our Response Process
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-yellow-300/20 border border-yellow-300/30 flex items-center justify-center">
                    <span className="text-yellow-300 text-xs sm:text-sm font-light">
                      1
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white text-sm sm:text-base font-light">
                      Initial Consultation
                    </h4>
                    <p className="text-white/50 text-xs">
                      Free 30-minute strategy call
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-yellow-300/20 border border-yellow-300/30 flex items-center justify-center">
                    <span className="text-yellow-300 text-xs sm:text-sm font-light">
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white text-sm sm:text-base font-light">
                      Project Proposal
                    </h4>
                    <p className="text-white/50 text-xs">
                      Detailed scope and timeline
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-yellow-300/20 border border-yellow-300/30 flex items-center justify-center">
                    <span className="text-yellow-300 text-xs sm:text-sm font-light">
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white text-sm sm:text-base font-light">
                      Kick-off Meeting
                    </h4>
                    <p className="text-white/50 text-xs">
                      Project start with dedicated team
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-green-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg sm:rounded-xl shadow-2xl z-50 max-w-xs sm:max-w-sm"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <FiCheck className="text-lg sm:text-xl" />
              <div>
                <h4 className="font-semibold text-sm sm:text-base">
                  Thank You!
                </h4>
                <p className="text-xs sm:text-sm opacity-90">
                  Well get back to you within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}