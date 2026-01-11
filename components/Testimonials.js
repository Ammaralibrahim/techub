"use client"

import { motion } from "framer-motion"
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageSquare } from "react-icons/fi"
import { useState, useEffect } from "react"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO, Luxe Fashion Group",
      content: "TechHub Studio transformed our online presence completely. The website they delivered exceeded all expectations and our online sales increased by 280% in the first quarter.",
      rating: 5,
      company: "Luxe Fashion Group"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Founder, FinTech Innovations",
      content: "Working with TechHub Studio was a game-changer. Their attention to detail and technical expertise resulted in a platform that perfectly serves our 50,000+ active users.",
      rating: 5,
      company: "FinTech Innovations"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Marketing Director, HealthPlus",
      content: "The healthcare portal developed by TechHub Studio has revolutionized our patient management system. The intuitive interface and robust features have received overwhelming positive feedback.",
      rating: 5,
      company: "HealthPlus"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "CTO, Blockchain Ventures",
      content: "Exceptional work on our blockchain platform. The team delivered a secure, scalable solution that exceeded our technical requirements. Highly recommended.",
      rating: 5,
      company: "Blockchain Ventures"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Head of Digital, EduTech Solutions",
      content: "The educational platform they built for us has seen incredible adoption rates. The user experience is flawless and the performance is outstanding.",
      rating: 5,
      company: "EduTech Solutions"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section id="testimonials" className="relative min-h-screen py-12 sm:py-20 md:py-32 px-4 sm:px-6 overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "30px 30px"
        }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-4 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border border-white/5 xx-full"></div>
        <div className="absolute bottom-1/4 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 border border-white/5 xx-full"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border-t border-l border-white/10"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border-b border-r border-white/10"></div>
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
              Client Testimonials
            </span>
            <div className="w-4 sm:w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mb-4 sm:mb-6 md:mb-8">
            <span className="text-white">What Our</span>
            <br />
            <span className="relative inline-block mt-1 sm:mt-2 md:mt-0">
              {/* White box background */}
              <span className="absolute inset-0 bg-white -rotate-1"></span>
              {/* Text */}
              <span className="relative block text-black px-3 sm:px-4 md:px-6 py-1 sm:py-2 font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Clients Say
              </span>
            </span>
          </h2>
          
          <div className="w-12 sm:w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-4 sm:my-6 md:my-8"></div>
          
          <p className="text-white/60 text-xs sm:text-sm md:text-lg lg:text-xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto font-light tracking-wide leading-relaxed px-2">
            Hear from brands that have transformed their digital presence and achieved 
            remarkable results through our partnership.
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="relative mb-8 sm:mb-12 md:mb-16 lg:mb-24">
          {/* Navigation Arrows - Mobile optimized */}
          <button
            onClick={prevTestimonial}
            className="absolute -left-2 sm:-left-4 md:-left-6 lg:-left-8 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 border border-white/10 xx-full flex items-center justify-center text-white/70 hover:text-yellow-300 hover:border-yellow-300/30 transition-all duration-300 bg-black/50 backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="text-sm sm:text-base md:text-xl lg:text-2xl" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-8 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 border border-white/10 xx-full flex items-center justify-center text-white/70 hover:text-yellow-300 hover:border-yellow-300/30 transition-all duration-300 bg-black/50 backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="text-sm sm:text-base md:text-xl lg:text-2xl" />
          </button>

          {/* Main Testimonial */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Decorative Message Icon */}
            <div className="absolute -top-4 -left-2 sm:-top-6 sm:-left-4 md:-top-8 md:-left-6 lg:-top-12 lg:-left-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl text-yellow-300/10">
              <FiMessageSquare />
            </div>

            <div className="relative bg-gradient-to-br from-yellow-300/5 via-black/50 to-black xx-xl sm:xx-2xl lg:xx-3xl border border-white/10 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 max-w-6xl mx-auto">
              {/* Top Border Accent */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent"></div>

              <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {/* Client Info */}
                <div className="lg:col-span-1">
                  <div className="flex flex-col items-center lg:items-start space-y-4 sm:space-y-6">
                    {/* Client Initials Circle */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 xx-full bg-gradient-to-br from-yellow-300/10 to-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white">
                        {testimonials[currentIndex].name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>

                    <div className="text-center lg:text-left">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white mb-1 sm:mb-2">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm md:text-base font-light mb-2 sm:mb-3">
                        {testimonials[currentIndex].role}
                      </p>
                      <div className="inline-flex items-center px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/5 xx-full border border-white/10">
                        <span className="text-yellow-300 text-xs sm:text-sm md:text-base font-light">
                          {testimonials[currentIndex].company}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className="text-yellow-300 fill-current text-sm sm:text-base md:text-lg lg:text-xl" 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    {/* Message Icon */}
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-300/30 mb-3 sm:mb-4 md:mb-6">
                      <FiMessageSquare />
                    </div>

                    <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed sm:leading-loose md:leading-loose mb-4 sm:mb-6 md:mb-8 lg:mb-12">
                      {testimonials[currentIndex].content}
                    </p>

                    {/* Progress Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5 sm:gap-2">
                        {testimonials.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setCurrentIndex(idx)
                              setIsAutoPlaying(false)
                            }}
                            className={`h-1.5 sm:h-2 xx-full transition-all duration-300 ${
                              idx === currentIndex 
                                ? "bg-yellow-300 w-6 sm:w-8 md:w-12" 
                                : "bg-white/30 hover:bg-white/50 w-1.5 sm:w-2 md:w-3"
                            }`}
                            aria-label={`View testimonial ${idx + 1}`}
                          />
                        ))}
                      </div>
                      <span className="text-white/40 text-xs sm:text-sm font-light">
                        {currentIndex + 1} / {testimonials.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-4 sm:mb-6 md:mb-8 text-center">More Client Stories</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {testimonials.filter((_, idx) => idx !== currentIndex).slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  setCurrentIndex(testimonials.findIndex(t => t.id === testimonial.id))
                  setIsAutoPlaying(false)
                }}
                className="group relative cursor-pointer"
              >
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 xx-lg sm:xx-xl md:xx-2xl p-4 sm:p-5 md:p-6 transition-all duration-500 group-hover:border-yellow-300/30 h-full">
                  {/* Client Initials */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 xx-full bg-gradient-to-br from-yellow-300/10 to-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-light">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>

                  {/* Message Icon */}
                  <div className="text-xl sm:text-2xl text-yellow-300/20 mb-2 sm:mb-3 md:mb-4">
                    <FiMessageSquare />
                  </div>

                  {/* Content */}
                  <p className="text-white/50 text-xs sm:text-sm mb-3 sm:mb-4 md:mb-6 leading-relaxed font-light line-clamp-3 sm:line-clamp-4">
                    {testimonial.content}
                  </p>

                  {/* Client Info */}
                  <div className="border-t border-white/10 pt-3 sm:pt-4 md:pt-6">
                    <h4 className="text-white text-sm sm:text-base md:text-lg font-light mb-0.5 sm:mb-1">{testimonial.name}</h4>
                    <p className="text-white/40 text-xs mb-2 sm:mb-3">{testimonial.role}</p>
                    <div className="flex gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className="text-yellow-300 fill-current text-xs sm:text-sm" 
                        />
                      ))}
                    </div>
                  </div>

                  {/* View Full Button */}
                  <div className="mt-4 sm:mt-6 text-center">
                    <span className="text-xs text-white/30 group-hover:text-yellow-300 uppercase tracking-widest transition-colors duration-300">
                      View Full Story
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-8 sm:pt-12 md:pt-16 border-t border-white/10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {[
              { value: "98%", label: "Client Retention" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "50+", label: "Happy Clients" },
              { value: "100%", label: "Project Success" }
            ].map((stat, index) => (
              <div key={index} className="relative">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-yellow-300 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-white/50 text-xs tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 md:mt-20"
        >
          <div className="inline-block bg-white text-black font-light py-3 sm:py-4 px-8 sm:px-10 md:px-12 text-xs sm:text-sm tracking-widest uppercase hover:bg-yellow-300 hover:text-white transition-all duration-300 cursor-pointer">
            Become Our Next Success Story
          </div>
        </motion.div>
      </div>

      {/* Add custom styles for line clamp */}
      <style jsx global>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}