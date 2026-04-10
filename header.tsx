"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Check if device has mouse
    const hasPointer = window.matchMedia("(pointer: fine)").matches
    if (!hasPointer) return

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      })
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .magnetic-button'
      )
      
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true))
        el.addEventListener("mouseleave", () => setIsHovering(false))
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    
    // Add hover listeners after a short delay to ensure DOM is ready
    const timeout = setTimeout(addHoverListeners, 500)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(timeout)
    }
  }, [])

  // Update cursor size on hover state change
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    if (isHovering) {
      gsap.to(cursor, {
        scale: 2,
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      })
    } else {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [isHovering])

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-primary/50 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 hidden md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-primary pointer-events-none z-[9999] hidden md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  )
}
