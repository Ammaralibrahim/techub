"use client"

import { motion } from "framer-motion"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Services from "@/components/Services"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="overflow-hidden"
      >
        <Hero />
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <About />
        </motion.section>
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <Projects />
        </motion.section>
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <Services />
        </motion.section>
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <Testimonials />
        </motion.section>
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <Contact />
        </motion.section>
        <Footer />
      </motion.div>
    </>
  )
}