"use client"

import { useState, useEffect } from "react"
import CountUp from "@/components/CountUp"

const PreLoader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [countDone, setCountDone] = useState<boolean>(false)
  const [fadeText, setFadeText] = useState<boolean>(false)
  const [fadeScreen, setFadeScreen] = useState<boolean>(false)

  useEffect(() => {
    if (countDone) {
      const fadeTextTimer = setTimeout(() => setFadeText(true), 3000)
      const fadeScreenTimer = setTimeout(() => setFadeScreen(true), 2000)
      const hideTimer = setTimeout(() => setLoading(false), 3000)

      return () => {
        clearTimeout(fadeTextTimer)
        clearTimeout(fadeScreenTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [countDone])

  if (!loading) return null

  return (
    <div
      className={`w-screen h-screen fixed flex items-center justify-center bg-black z-[10000] overflow-hidden transition-opacity duration-1000 ${
        fadeScreen ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Teks CountUp */}
      <div
        className={`absolute text-white text-6xl font-bold transition-all duration-1000 ${
          fadeText ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
        }`}
      >
        <CountUp
          from={0}
          to={100}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
          onEnd={() => setCountDone(true)}
        />
      </div>
    </div>
  )
}

export default PreLoader
