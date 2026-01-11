"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { FiCheck, FiAlertCircle, FiInfo, FiX, FiAlertTriangle } from "react-icons/fi"
import { toastManager } from "@/lib/toast"

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts)
    return unsubscribe
  }, [])

  const getIcon = (type, icon) => {
    if (icon === 'check') return <FiCheck className="text-sm sm:text-base" />
    if (icon === 'alert') return <FiAlertCircle className="text-sm sm:text-base" />
    if (icon === 'info') return <FiInfo className="text-sm sm:text-base" />
    if (icon === 'warning') return <FiAlertTriangle className="text-sm sm:text-base" />
    
    const icons = {
      success: <FiCheck className="text-sm sm:text-base" />,
      error: <FiAlertCircle className="text-sm sm:text-base" />,
      info: <FiInfo className="text-sm sm:text-base" />,
      warning: <FiAlertTriangle className="text-sm sm:text-base" />
    }
    
    return icons[type] || <FiInfo className="text-sm sm:text-base" />
  }

  const getColors = (type) => {
    const colors = {
      success: {
        bg: 'bg-gradient-to-r from-green-500/10 to-green-600/5',
        border: 'border-green-500/30',
        text: 'text-green-300',
        accent: 'bg-green-500'
      },
      error: {
        bg: 'bg-gradient-to-r from-red-500/10 to-red-600/5',
        border: 'border-red-500/30',
        text: 'text-red-300',
        accent: 'bg-red-500'
      },
      info: {
        bg: 'bg-gradient-to-r from-blue-500/10 to-blue-600/5',
        border: 'border-blue-500/30',
        text: 'text-blue-300',
        accent: 'bg-blue-500'
      },
      warning: {
        bg: 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5',
        border: 'border-yellow-500/30',
        text: 'text-yellow-300',
        accent: 'bg-yellow-500'
      }
    }
    
    return colors[type] || colors.info
  }

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      {/* Bottom Right */}
      <div className="absolute bottom-6 right-6 space-y-3">
        <AnimatePresence>
          {toasts.filter(t => t.position === 'bottom-right').map((toast) => {
            const colors = getColors(toast.type)
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 300 
                }}
                className={`min-w-[300px] max-w-sm ${colors.bg} ${colors.border} border backdrop-blur-xl xx-lg p-4 pointer-events-auto`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${colors.bg} border ${colors.border} xx-full flex items-center justify-center flex-shrink-0`}>
                    <div className={colors.text}>
                      {getIcon(toast.type, toast.icon)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className={`${colors.text} text-sm font-light mb-1`}>
                          {toast.title || toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}
                        </p>
                        <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
                          {toast.message}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => toastManager.remove(toast.id)}
                        className="flex-shrink-0 text-white/30 hover:text-white transition-colors ml-2"
                        aria-label="Close notification"
                      >
                        <FiX className="text-sm" />
                      </button>
                    </div>
                    
                    {toast.duration !== Infinity && (
                      <motion.div
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ 
                          duration: toast.duration / 1000, 
                          ease: "linear" 
                        }}
                        className={`h-0.5 mt-3 ${colors.accent} xx-full`}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}