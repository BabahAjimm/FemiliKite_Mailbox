"use client"

import { useEffect, useState } from "react"
import { Mail } from "lucide-react"

export function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-[#cc0000]/20 to-[#cc0000]/5 blur-3xl animate-pulse"></div>
      <div
        className="absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-[#0033cc]/20 to-[#0033cc]/5 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-[#cc0000]/10 to-[#0033cc]/10 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Floating elements */}
      <div className="absolute top-20 right-[10%] h-12 w-12 animate-bounce rounded-full border-4 border-[#cc0000]/20 delay-300"></div>
      <div className="absolute bottom-32 left-[15%] h-8 w-8 animate-ping rounded-full bg-[#0033cc]/10 delay-700"></div>
      <div className="absolute top-1/2 left-[5%] h-16 w-16 animate-pulse rounded-full border-4 border-[#cc0000]/10 delay-500"></div>

      {/* Email icons floating around */}
      <div className="absolute top-[15%] right-[20%] text-[#cc0000]/20 animate-float">
        <Mail size={32} />
      </div>
      <div
        className="absolute bottom-[25%] left-[30%] text-[#0033cc]/20 animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        <Mail size={24} />
      </div>
      <div
        className="absolute top-[40%] right-[35%] text-[#cc0000]/20 animate-float"
        style={{ animationDelay: "2.5s" }}
      >
        <Mail size={20} />
      </div>
    </div>
  )
}

export function AnimatedCTABackground() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div className="absolute top-[10%] left-[5%] h-20 w-20 rounded-full bg-white opacity-10 animate-float"></div>
      <div
        className="absolute top-[40%] right-[10%] h-32 w-32 rounded-full bg-white opacity-10 animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-[20%] left-[20%] h-16 w-16 rounded-full bg-white opacity-10 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  )
}
