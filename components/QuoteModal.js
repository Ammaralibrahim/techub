"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiX, FiCheck, FiCalendar, FiDollarSign, FiMail, FiUser, FiBriefcase, FiFileText, FiGlobe, FiArrowRight, FiArrowLeft } from "react-icons/fi"
import { toast } from "@/lib/toast"

export default function QuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const projectTypes = [
    "Landing Page",
    "Business Website", 
    "E-commerce Store",
    "Web Application",
    "Corporate Website",
    "Portfolio Site",
    "Brand Identity",
    "UI/UX Design"
  ]

  const budgetRanges = [
    { value: "100-500", label: "$100 - $500", description: "Basic website or landing page" },
    { value: "500-1000", label: "$500 - $1,000", description: "Standard business website" },
    { value: "1000-2000", label: "$1,000 - $2,000", description: "Advanced website with features" },
    { value: "2000-4000", label: "$2,000 - $4,000", description: "Premium custom solution" }
  ]

  const timelines = [
    { value: "3-7", label: "3-7 Days", description: "Fast delivery" },
    { value: "7-14", label: "7-14 Days", description: "Standard timeline" },
    { value: "14-30", label: "14-30 Days", description: "Complex project" }
  ]

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format"
      }
    }
    
    if (step === 2) {
      if (!formData.projectType) newErrors.projectType = "Please select a project type"
      if (!formData.budget) newErrors.budget = "Please select a budget range"
      if (!formData.timeline) newErrors.timeline = "Please select a timeline"
    }
    
    if (step === 3) {
      if (!formData.description.trim()) newErrors.description = "Project description is required"
      if (formData.description.trim().length < 20) newErrors.description = "Please provide more details (minimum 20 characters)"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setTouched(prev => ({ ...prev, [name]: true }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setTouched(prev => ({ ...prev, [field]: true }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const step1Valid = validateStep(1)
    const step2Valid = validateStep(2)
    const step3Valid = validateStep(3)
    
    if (!step1Valid || !step2Valid || !step3Valid) {
      if (!step1Valid) setCurrentStep(1)
      else if (!step2Valid) setCurrentStep(2)
      else if (!step3Valid) setCurrentStep(3)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Airtable veri hazırlama
      const airtableData = {
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        website: formData.website || '',
        projectType: formData.projectType,
        budget: formData.budget,
        budgetLabel: budgetRanges.find(b => b.value === formData.budget)?.label || formData.budget,
        timeline: formData.timeline,
        timelineLabel: timelines.find(t => t.value === formData.timeline)?.label || formData.timeline,
        description: formData.description,
        source: 'Quote Modal',
        submissionTime: new Date().toISOString()
      }

      // API'ye gönder
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airtableData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Form gönderilemedi')
      }

      // Başarılı
      console.log('Airtable kaydı başarılı:', result)
      
      // Toast bildirimi göster
      toast.success('Quote request submitted successfully! We will contact you within 24 hours.', {
        duration: 5000,
        position: 'bottom-right'
      })
      
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // 4 saniye sonra modal'ı kapat
      setTimeout(() => {
        handleClose()
      }, 4000)
      
    } catch (error) {
      console.error('Gönderim hatası:', error)
      
      // Hata toast'ı göster
      toast.error(`Submission failed: ${error.message}`, {
        duration: 6000,
        position: 'bottom-right'
      })
      
      setIsSubmitting(false)
      setErrors({ submit: error.message })
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      // Başarılı gönderimden sonra toast göster
      if (isSubmitted) {
        toast.info('Quote request completed. Check your email for details.', {
          duration: 3000,
          position: 'bottom-right'
        })
      }
      
      onClose()
      setTimeout(() => {
        setCurrentStep(1)
        setIsSubmitted(false)
        setErrors({})
        setTouched({})
        setFormData({
          name: "",
          email: "",
          company: "",
          website: "",
          projectType: "",
          budget: "",
          timeline: "",
          description: ""
        })
      }, 300)
    }
  }

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        handleClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isSubmitting])

  const progressPercentage = (currentStep / 3) * 100

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/95"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl max-h-[96vh] sm:max-h-[90vh] overflow-hidden bg-black border border-white/10 flex flex-col xx-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Compact */}
              <div className="relative border-b border-white/10 p-4 sm:p-6 md:p-8 flex-shrink-0">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="pr-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-3">
                      <div className="w-2 sm:w-3 h-px bg-white/20"></div>
                      <span className="text-[10px] xs:text-xs sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-light text-white/50">
                        Custom Quote
                      </span>
                      <div className="w-2 sm:w-3 h-px bg-white/20"></div>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white tracking-tight">
                      Request Your
                      <span className="block mt-0.5 sm:mt-1">
                        <span className="relative inline-block">
                          <span className="absolute inset-0 bg-white -rotate-1"></span>
                          <span className="relative block text-black px-2 py-0.5 sm:px-3 sm:py-1 text-sm sm:text-base md:text-lg font-medium">Personalized Quote</span>
                        </span>
                      </span>
                    </h2>
                  </div>
                  
                  <button
                    onClick={handleClose}
                    className="group w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 border border-white/10 flex items-center justify-center hover:border-white/20 hover:bg-white/5 transition-all duration-300 flex-shrink-0 mt-0.5 xx-full"
                    disabled={isSubmitting}
                    aria-label="Close modal"
                  >
                    <FiX className="text-white/70 group-hover:text-white text-sm sm:text-base md:text-lg transition-colors duration-300" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex justify-between text-[10px] xs:text-xs text-white/50 mb-1">
                    <span>Step {currentStep} of 3</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="h-0.5 sm:h-px bg-white/10 overflow-hidden xx-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-yellow-300 xx-full"
                    />
                  </div>
                </div>

                {/* Step Indicators - Compact */}
                <div className="flex items-center justify-between">
                  {["Details", "Scope", "Review"].map((step, index) => {
                    const stepNumber = index + 1
                    const isCurrent = currentStep === stepNumber
                    
                    return (
                      <div
                        key={step}
                        className="flex items-center gap-1.5 sm:gap-2"
                      >
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border flex items-center justify-center text-xs sm:text-sm font-light transition-all duration-300 xx-full ${
                          isCurrent
                            ? "border-yellow-300 bg-yellow-300 text-black"
                            : currentStep > stepNumber
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-white/10 text-white/30"
                        }`}>
                          {currentStep > stepNumber ? (
                            <FiCheck className="text-[10px] sm:text-xs md:text-sm" />
                          ) : (
                            stepNumber
                          )}
                        </div>
                        <span className={`text-[10px] xs:text-xs sm:text-sm font-light transition-all duration-300 hidden xs:block ${
                          isCurrent ? "text-yellow-300" : 
                          currentStep > stepNumber ? "text-green-500" : "text-white/30"
                        }`}>
                          {step}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Form Content - Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                <form onSubmit={handleSubmit} noValidate>
                  <AnimatePresence mode="wait">
                    {/* Step 1: Contact Information - Mobile Optimized */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                          <div className="space-y-1.5">
                            <label className="block text-white/70 text-xs sm:text-sm font-light tracking-wide uppercase mb-1.5 sm:mb-3">
                              <FiUser className="inline mr-1 sm:mr-2 text-yellow-300 text-xs sm:text-sm" />
                              Your Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                              required
                              className={`w-full bg-black border px-3 py-2 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-yellow-300 transition-all duration-300 font-light tracking-wide xx-lg ${
                                errors.name ? "border-red-500/50" : "border-white/10"
                              }`}
                              placeholder="John Doe"
                            />
                            {errors.name && (
                              <p className="text-red-400/70 text-[10px] xs:text-xs mt-1">{errors.name}</p>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-white/70 text-xs sm:text-sm font-light tracking-wide uppercase mb-1.5 sm:mb-3">
                              <FiMail className="inline mr-1 sm:mr-2 text-yellow-300 text-xs sm:text-sm" />
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                              required
                              className={`w-full bg-black border px-3 py-2 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-yellow-300 transition-all duration-300 font-light tracking-wide xx-lg ${
                                errors.email ? "border-red-500/50" : "border-white/10"
                              }`}
                              placeholder="john@example.com"
                            />
                            {errors.email && (
                              <p className="text-red-400/70 text-[10px] xs:text-xs mt-1">{errors.email}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                          <div className="space-y-1.5">
                            <label className="block text-white/70 text-xs sm:text-sm font-light tracking-wide uppercase mb-1.5 sm:mb-3">
                              <FiBriefcase className="inline mr-1 sm:mr-2 text-yellow-300 text-xs sm:text-sm" />
                              Company / Brand
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full bg-black border border-white/10 px-3 py-2 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-yellow-300 transition-all duration-300 font-light tracking-wide xx-lg"
                              placeholder="Your company name"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-white/70 text-xs sm:text-sm font-light tracking-wide uppercase mb-1.5 sm:mb-3">
                              <FiGlobe className="inline mr-1 sm:mr-2 text-yellow-300 text-xs sm:text-sm" />
                              Current Website (Optional)
                            </label>
                            <input
                              type="url"
                              name="website"
                              value={formData.website}
                              onChange={handleChange}
                              className="w-full bg-black border border-white/10 px-3 py-2 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-yellow-300 transition-all duration-300 font-light tracking-wide xx-lg"
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Project Scope - Mobile Optimized */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="block text-white/70 text-xs sm:text-sm font-light tracking-wide uppercase mb-2 sm:mb-3">
                              Project Type *
                            </label>
                            {formData.projectType && (
                              <span className="text-yellow-300 text-[10px] xs:text-xs sm:text-sm font-light">
                                ✓ Selected
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2">
                            {projectTypes.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => handleSelect("projectType", type)}
                                className={`p-2.5 sm:p-3 md:p-4 border text-left transition-all duration-200 group xx-lg ${
                                  formData.projectType === type
                                    ? "border-yellow-300 bg-yellow-300/10 text-yellow-300"
                                    : "border-white/10 bg-black text-white/70 hover:border-white/20 hover:text-white"
                                } ${errors.projectType ? "border-red-500/50" : ""}`}
                              >
                                <span className="text-[10px] xs:text-xs sm:text-sm font-light tracking-wide block leading-tight">{type}</span>
                                <div className={`h-px mt-1.5 sm:mt-2 transition-all duration-200 ${
                                  formData.projectType === type 
                                    ? "bg-yellow-300 w-full" 
                                    : "bg-white/10 w-2 group-hover:w-full"
                                }`} />
                              </button>
                            ))}
                          </div>
                          {errors.projectType && (
                            <p className="text-red-400/70 text-[10px] xs:text-xs mt-1">{errors.projectType}</p>
                          )}
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="block text-white/70 text-xs sm:text-sm font-light tracking-wide uppercase mb-2 sm:mb-3">
                              <FiDollarSign className="inline mr-1 sm:mr-2 text-yellow-300 text-xs sm:text-sm" />
                              Budget Range *
                            </label>
                            {formData.budget && (
                              <span className="text-yellow-300 text-[10px] xs:text-xs sm:text-sm font-light">
                                {budgetRanges.find(b => b.value === formData.budget)?.label}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {budgetRanges.map((range) => (
                              <button
                                key={range.value}
                                type="button"
                                onClick={() => handleSelect("budget", range.value)}
                                className={`p-3 sm:p-4 md:p-6 border text-left transition-all duration-200 group xx-lg ${
                                  formData.budget === range.value
                                    ? "border-yellow-300 bg-yellow-300/10"
                                    : "border-white/10 bg-black hover:border-white/20"
                                } ${errors.budget ? "border-red-500/50" : ""}`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className={`text-xs sm:text-sm font-light tracking-wide transition-colors duration-200 truncate ${
                                      formData.budget === range.value ? "text-yellow-300" : "text-white"
                                    }`}>
                                      {range.label}
                                    </div>
                                    <div className="text-white/40 text-[10px] xs:text-xs mt-1 sm:mt-2 font-light">
                                      {range.description}
                                    </div>
                                  </div>
                                  <div className={`w-0.5 sm:w-1 h-6 sm:h-8 ml-2 transition-all duration-200 ${
                                    formData.budget === range.value ? "bg-yellow-300" : "bg-white/10"
                                  }`} />
                                </div>
                              </button>
                            ))}
                          </div>
                          {errors.budget && (
                            <p className="text-red-400/70 text-[10px] xs:text-xs mt-1">{errors.budget}</p>
                          )}
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="block text-white/70 text-xs sm:text-sm font-light tracking-wide uppercase mb-2 sm:mb-3">
                              <FiCalendar className="inline mr-1 sm:mr-2 text-yellow-300 text-xs sm:text-sm" />
                              Preferred Timeline *
                            </label>
                            {formData.timeline && (
                              <span className="text-yellow-300 text-[10px] xs:text-xs sm:text-sm font-light">
                                {timelines.find(t => t.value === formData.timeline)?.label}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                            {timelines.map((time) => (
                              <button
                                key={time.value}
                                type="button"
                                onClick={() => handleSelect("timeline", time.value)}
                                className={`p-3 sm:p-4 md:p-6 border transition-all duration-200 text-center group xx-lg ${
                                  formData.timeline === time.value
                                    ? "border-yellow-300 bg-yellow-300/10"
                                    : "border-white/10 bg-black hover:border-white/20"
                                } ${errors.timeline ? "border-red-500/50" : ""}`}
                              >
                                <div className={`text-xs sm:text-sm font-light tracking-wide transition-colors duration-200 ${
                                  formData.timeline === time.value ? "text-yellow-300" : "text-white"
                                }`}>
                                  {time.label}
                                </div>
                                <div className="text-white/40 text-[10px] xs:text-xs mt-1 sm:mt-2 font-light">
                                  {time.description}
                                </div>
                              </button>
                            ))}
                          </div>
                          {errors.timeline && (
                            <p className="text-red-400/70 text-[10px] xs:text-xs mt-1">{errors.timeline}</p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Project Description & Review - Mobile Optimized */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        {isSubmitted ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-6 sm:py-8 md:py-12"
                          >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 border border-green-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-6 xx-full">
                              <FiCheck className="text-green-300 text-xl sm:text-2xl" />
                            </div>
                            <h3 className="text-base sm:text-lg md:text-xl font-light text-white mb-3 sm:mb-4 tracking-tight">
                              Quote Request Sent Successfully!
                            </h3>
                            <div className="w-12 h-px sm:w-16 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent mx-auto my-3 sm:my-6"></div>
                            <p className="text-white/60 text-xs sm:text-sm font-light tracking-wide mb-4 sm:mb-6 max-w-md mx-auto px-2">
                              We've received your project details. Our team will review your requirements and send you a personalized quote within 24 hours.
                            </p>
                            <p className="text-white/40 text-[10px] xs:text-xs font-light tracking-widest uppercase">
                              Check your email for confirmation
                            </p>
                          </motion.div>
                        ) : (
                          <>
                            <div className="space-y-2 sm:space-y-3">
                              <label className="block text-white/70 text-xs sm:text-sm font-light tracking-wide uppercase mb-2 sm:mb-3">
                                Project Description *
                              </label>
                              <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={5}
                                className={`w-full bg-black border px-3 py-2 sm:px-4 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-yellow-300 transition-all duration-300 font-light tracking-wide resize-none xx-lg ${
                                  errors.description ? "border-red-500/50" : "border-white/10"
                                }`}
                                placeholder="Please describe your project in detail. Include your goals, target audience, specific features needed, design preferences, and any other important information that will help us understand your vision."
                              />
                              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 xs:gap-0">
                                {errors.description ? (
                                  <p className="text-red-400/70 text-[10px] xs:text-xs">{errors.description}</p>
                                ) : (
                                  <p className="text-white/40 text-[10px] xs:text-xs font-light">
                                    The more details you provide, the more accurate our quote will be.
                                  </p>
                                )}
                                <p className={`text-[10px] xs:text-xs ${
                                  formData.description.length < 20 
                                    ? "text-red-400/70" 
                                    : "text-white/30"
                                }`}>
                                  {formData.description.length}/500
                                </p>
                              </div>
                            </div>

                            {/* Summary Card - Mobile Optimized */}
                            <div className="border border-white/10 p-3 sm:p-4 md:p-6 bg-black/50 xx-lg">
                              <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6">
                                <div className="w-1 h-3 sm:h-4 bg-yellow-300"></div>
                                <h4 className="text-white text-xs sm:text-sm font-light tracking-widest uppercase">
                                  Project Summary
                                </h4>
                              </div>
                              
                              <div className="space-y-2 sm:space-y-3">
                                {(formData.name || formData.email || formData.company) && (
                                  <div>
                                    <h5 className="text-white/50 text-[10px] xs:text-xs font-light tracking-widest uppercase mb-1.5 sm:mb-2">
                                      Contact Information
                                    </h5>
                                    <div className="space-y-1.5">
                                      {formData.name && (
                                        <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                                          <span className="text-white/60 text-xs sm:text-sm font-light">Name</span>
                                          <span className="text-white text-xs sm:text-sm font-light truncate max-w-[120px] sm:max-w-none">{formData.name}</span>
                                        </div>
                                      )}
                                      {formData.email && (
                                        <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                                          <span className="text-white/60 text-xs sm:text-sm font-light">Email</span>
                                          <span className="text-white text-xs sm:text-sm font-light truncate max-w-[120px] sm:max-w-none">{formData.email}</span>
                                        </div>
                                      )}
                                      {formData.company && (
                                        <div className="flex justify-between items-center py-1.5">
                                          <span className="text-white/60 text-xs sm:text-sm font-light">Company</span>
                                          <span className="text-white text-xs sm:text-sm font-light truncate max-w-[120px] sm:max-w-none">{formData.company}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {(formData.projectType || formData.budget || formData.timeline) && (
                                  <div>
                                    <h5 className="text-white/50 text-[10px] xs:text-xs font-light tracking-widest uppercase mb-1.5 sm:mb-2">
                                      Project Details
                                    </h5>
                                    <div className="space-y-1.5">
                                      {formData.projectType && (
                                        <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                                          <span className="text-white/60 text-xs sm:text-sm font-light">Project Type</span>
                                          <span className="text-yellow-300 text-xs sm:text-sm font-light truncate max-w-[100px] sm:max-w-none">{formData.projectType}</span>
                                        </div>
                                      )}
                                      {formData.budget && (
                                        <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                                          <span className="text-white/60 text-xs sm:text-sm font-light">Budget Range</span>
                                          <span className="text-yellow-300 text-xs sm:text-sm font-light">
                                            {budgetRanges.find(b => b.value === formData.budget)?.label}
                                          </span>
                                        </div>
                                      )}
                                      {formData.timeline && (
                                        <div className="flex justify-between items-center py-1.5">
                                          <span className="text-white/60 text-xs sm:text-sm font-light">Timeline</span>
                                          <span className="text-yellow-300 text-xs sm:text-sm font-light">
                                            {timelines.find(t => t.value === formData.timeline)?.label}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {errors.submit && (
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 border border-red-500/30 bg-red-500/10 xx-lg">
                      <p className="text-red-400/70 text-xs sm:text-sm">{errors.submit}</p>
                    </div>
                  )}
                </form>
              </div>

              {/* Footer - Compact ve Responsive */}
              {!isSubmitted && (
                <div className="border-t border-white/10 p-3 sm:p-4 md:p-6 flex-shrink-0">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all duration-200 font-light text-[10px] xs:text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center xx-lg"
                          disabled={isSubmitting}
                        >
                          <FiArrowLeft className="text-[10px] xs:text-xs sm:text-sm" />
                          <span>Back</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <div className="text-white/30 text-[10px] xs:text-xs font-light tracking-widest uppercase text-center sm:text-left">
                        Step {currentStep} of 3 • {["Details", "Scope", "Review"][currentStep - 1]}
                      </div>
                      
                      <div className="w-full sm:w-auto">
                        {currentStep < 3 ? (
                          <button
                            type="button"
                            onClick={handleNext}
                            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white text-black hover:bg-yellow-300 transition-all duration-200 font-light text-[10px] xs:text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-1.5 sm:gap-2 group w-full xx-lg"
                            disabled={isSubmitting}
                          >
                            <span>Continue</span>
                            <FiArrowRight className="group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform duration-200 text-[10px] xs:text-xs sm:text-sm" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white text-black hover:bg-yellow-300 transition-all duration-200 font-light text-[10px] xs:text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-1.5 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full xx-lg"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-black border-t-transparent animate-spin xx-full"></div>
                                <span>Processing...</span>
                              </>
                            ) : (
                              "Submit Quote"
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}