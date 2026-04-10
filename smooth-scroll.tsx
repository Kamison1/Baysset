"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      tl.fromTo(
        overlayRef.current,
        { opacity: 0.9 },
        { opacity: 0.5, duration: 2 }
      )
        .fromTo(
          headingRef.current,
          { y: 100, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1.4 },
          "-=1.5"
        )
        .fromTo(
          paragraphRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          buttonsRef.current?.children || [],
          { y: 40, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 },
          "-=0.5"
        )

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Heading parallax - moves slower
      gsap.to(headingRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Text fade on scroll
      gsap.to([paragraphRef.current, buttonsRef.current], {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "20% top",
          end: "50% top",
          scrub: 1,
        },
      })

      // Continuous subtle floating animation for heading
      gsap.to(headingRef.current, {
        y: "+=8",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 z-0 scale-110">
        <Image
          src="/images/hero-therapy.jpg"
          alt="Peaceful therapy office"
          fill
          className="object-cover"
          priority
        />
        <div ref={overlayRef} className="absolute inset-0 bg-foreground/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1
          ref={headingRef}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 text-balance opacity-0"
        >
          Built to Add Value
        </h1>
        <p
          ref={paragraphRef}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 text-pretty opacity-0"
        >
          At Baysset, we provide compassionate counseling services to help you
          navigate life&apos;s challenges and discover your path to healing and
          growth.
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton strength={0.3}>
            <Button size="lg" asChild className="opacity-0 text-base px-8 py-6 rounded-full hover:scale-105 transition-transform">
              <Link href="#contact">Schedule a Consultation</Link>
            </Button>
          </MagneticButton>
          <MagneticButton strength={0.3}>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white opacity-0 text-base px-8 py-6 rounded-full hover:scale-105 transition-transform backdrop-blur-sm"
              asChild
            >
              <Link href="#services">Explore Services</Link>
            </Button>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
