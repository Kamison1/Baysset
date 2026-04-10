"use client"

import { useEffect, useRef } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FloatingShapes } from "@/components/floating-shapes"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const approaches = [
  {
    title: "Cognitive Behavioral Therapy (CBT)",
    description:
      "CBT helps you identify and change negative thought patterns that contribute to emotional distress. By understanding the connection between thoughts, feelings, and behaviors, you can develop healthier ways of thinking and responding to life's challenges.",
    number: "01",
  },
  {
    title: "Person-Centered Therapy",
    description:
      "This approach creates a supportive, non-judgmental environment where you can explore your feelings freely. I believe you have the inner resources to find your own solutions, and my role is to facilitate your self-discovery and personal growth.",
    number: "02",
  },
  {
    title: "Mindfulness-Based Approaches",
    description:
      "Incorporating mindfulness techniques helps you stay present and develop awareness of your thoughts and emotions without becoming overwhelmed. This can reduce anxiety, improve focus, and enhance overall emotional well-being.",
    number: "03",
  },
  {
    title: "Solution-Focused Brief Therapy",
    description:
      "Rather than dwelling on problems, this approach focuses on identifying your strengths and resources to create practical solutions. We work together to set achievable goals and develop concrete steps toward positive change.",
    number: "04",
  },
  {
    title: "Attachment-Based Therapy",
    description:
      "Understanding your attachment style can provide insights into your relationships and emotional patterns. This approach helps you develop more secure ways of connecting with others and yourself.",
    number: "05",
  },
]

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Accordion items stagger animation
      if (accordionRef.current) {
        const items = accordionRef.current.querySelectorAll("[data-state]")
        gsap.fromTo(
          items,
          { x: -60, opacity: 0, rotateX: -10 },
          {
            x: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: accordionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        )

        // Add hover effect to items
        items.forEach((item) => {
          item.addEventListener("mouseenter", () => {
            gsap.to(item, { x: 10, duration: 0.3, ease: "power2.out" })
          })
          item.addEventListener("mouseleave", () => {
            gsap.to(item, { x: 0, duration: 0.3, ease: "power2.out" })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="approach" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <FloatingShapes />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div ref={headingRef} className="text-center mb-16 opacity-0">
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
              Our Method
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
              My Therapeutic Approach
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I draw from multiple evidence-based modalities to create a
              personalized treatment plan that addresses your unique needs and
              goals.
            </p>
          </div>

          <div ref={accordionRef}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {approaches.map((approach, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/50 rounded-2xl bg-card/50 backdrop-blur-sm px-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30 data-[state=open]:shadow-xl data-[state=open]:border-primary/50"
                >
                  <AccordionTrigger className="text-left py-6 hover:no-underline group">
                    <div className="flex items-center gap-4">
                      <span className="text-primary/40 font-mono text-sm group-hover:text-primary transition-colors">
                        {approach.number}
                      </span>
                      <span className="font-serif text-lg md:text-xl group-hover:text-primary transition-colors">
                        {approach.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pl-12">
                    {approach.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
