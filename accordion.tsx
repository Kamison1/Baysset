"use client"

import { useEffect, useRef } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, Users, Brain, Sparkles } from "lucide-react"
import { FloatingShapes } from "@/components/floating-shapes"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Heart,
    title: "Individual Therapy",
    description:
      "One-on-one sessions tailored to your unique needs, helping you work through personal challenges and develop coping strategies.",
  },
  {
    icon: Users,
    title: "Couples Counseling",
    description:
      "Strengthen your relationship through improved communication, conflict resolution, and deeper emotional connection.",
  },
  {
    icon: Brain,
    title: "Anxiety & Stress Management",
    description:
      "Learn effective techniques to manage anxiety, reduce stress, and regain control over your thoughts and emotions.",
  },
  {
    icon: Sparkles,
    title: "Personal Growth",
    description:
      "Discover your potential, set meaningful goals, and create lasting positive changes in your life.",
  },
]

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      })
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={cardRef} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  )
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation with split effect
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      // Cards stagger animation with rotation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 100, opacity: 0, rotateY: -15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Parallax movement on cards as you scroll
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        Array.from(cards).forEach((card, i) => {
          gsap.to(card, {
            y: (i % 2 === 0 ? -30 : 30),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <FloatingShapes />
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={headingRef} className="text-center mb-16 md:mb-20 opacity-0">
          <span className="text-accent font-medium text-sm uppercase tracking-widest mb-4 block">
            What We Offer
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We offer a range of therapeutic services designed to support your
            mental health and well-being at every stage of your journey.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <TiltCard key={service.title} className="opacity-0">
              <Card className="bg-card/80 backdrop-blur-sm border-border h-full transition-shadow duration-300 hover:shadow-2xl">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-accent/30 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
