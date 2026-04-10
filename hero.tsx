"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shapes = containerRef.current?.querySelectorAll(".floating-shape")
      
      shapes?.forEach((shape, i) => {
        gsap.set(shape, {
          x: gsap.utils.random(-20, 20),
          y: gsap.utils.random(-20, 20),
        })

        gsap.to(shape, {
          y: "+=30",
          x: "+=15",
          rotation: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(3, 5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="floating-shape absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-secondary/40 blur-2xl" />
      <div className="floating-shape absolute top-[60%] left-[10%] w-24 h-24 rounded-full bg-accent/10 blur-xl" />
      <div className="floating-shape absolute top-[20%] right-[10%] w-40 h-40 rounded-full bg-secondary/30 blur-2xl" />
      <div className="floating-shape absolute bottom-[20%] right-[5%] w-28 h-28 rounded-full bg-accent/15 blur-xl" />
      <div className="floating-shape absolute top-[40%] left-[50%] w-20 h-20 rounded-full bg-secondary/20 blur-lg" />
    </div>
  )
}
