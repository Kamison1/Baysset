"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with clip-path
      gsap.fromTo(
        imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      )

      // Image parallax
      gsap.to(imageInnerRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Content reveal with stagger
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll(".reveal-item")
        gsap.fromTo(
          elements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Tags with bounce in
      if (tagsRef.current) {
        gsap.fromTo(
          tagsRef.current.children,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: tagsRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Continuous hover effect on tags
      if (tagsRef.current) {
        const tags = tagsRef.current.children
        Array.from(tags).forEach((tag) => {
          tag.addEventListener("mouseenter", () => {
            gsap.to(tag, { scale: 1.1, duration: 0.3, ease: "power2.out" })
          })
          tag.addEventListener("mouseleave", () => {
            gsap.to(tag, { scale: 1, duration: 0.3, ease: "power2.out" })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            ref={imageRef}
            className="relative aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden"
          >
            <div ref={imageInnerRef} className="absolute inset-0 scale-125">
              <Image
                src="/images/about-counselor.jpg"
                alt="Dr. Sarah Mitchell, Lead Therapist"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute inset-4 border-2 border-white/20 rounded-2xl pointer-events-none" />
          </div>

          <div ref={contentRef}>
            <span className="reveal-item text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
              About Us
            </span>
            <h2 className="reveal-item font-serif text-4xl md:text-5xl font-semibold text-foreground mb-8">
              Meet Your Therapist
            </h2>
            <div className="space-y-5 text-muted-foreground text-lg">
              <p className="reveal-item">
                I&apos;m Dr. Sarah Mitchell, founder of Baysset Counseling. With
                over 15 years of experience in clinical psychology, I&apos;ve
                dedicated my career to helping individuals and couples find
                clarity, peace, and resilience.
              </p>
              <p className="reveal-item">
                My approach combines evidence-based techniques with genuine
                compassion, creating a safe space where you can explore your
                thoughts and emotions without judgment.
              </p>
              <p className="reveal-item">
                I hold a Ph.D. in Clinical Psychology from Stanford University
                and am licensed in California. I specialize in anxiety
                disorders, depression, relationship issues, and life
                transitions.
              </p>
            </div>

            <div ref={tagsRef} className="mt-10 flex flex-wrap gap-4">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-5 py-2.5 rounded-full text-sm font-medium text-foreground cursor-default border border-primary/20">
                Ph.D. Clinical Psychology
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-5 py-2.5 rounded-full text-sm font-medium text-foreground cursor-default border border-primary/20">
                Licensed Therapist
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-5 py-2.5 rounded-full text-sm font-medium text-foreground cursor-default border border-primary/20">
                15+ Years Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
