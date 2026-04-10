"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { FloatingShapes } from "@/components/floating-shapes"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@baysset.com",
    href: "mailto:hello@baysset.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "123 Wellness Ave, Suite 200, San Francisco, CA 94102",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri: 9am-6pm, Sat: 10am-2pm",
    href: null,
  },
]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

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

      // Form card animation with rotation
      gsap.fromTo(
        formRef.current,
        { x: -80, opacity: 0, rotateY: -10 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      // Info animation with stagger
      if (infoRef.current) {
        const items = infoRef.current.querySelectorAll(".contact-item")
        gsap.fromTo(
          items,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        )

        // Add hover animations to contact items
        items.forEach((item) => {
          const icon = item.querySelector(".icon-wrapper")
          item.addEventListener("mouseenter", () => {
            gsap.to(icon, { scale: 1.2, rotate: 10, duration: 0.3, ease: "back.out(2)" })
          })
          item.addEventListener("mouseleave", () => {
            gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 overflow-hidden relative">
      <FloatingShapes />
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={headingRef} className="text-center mb-16 md:mb-20 opacity-0">
          <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">
            Contact Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to take the first step? Reach out to schedule a free 15-minute
            consultation and see if we&apos;re the right fit for your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div ref={formRef} className="opacity-0" style={{ transformStyle: "preserve-3d" }}>
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
              <CardContent className="p-8 md:p-10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground">
                      Your message has been sent. I&apos;ll get back to you
                      within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2 group">
                        <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          required
                          className="h-12 transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          required
                          className="h-12 transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="h-12 transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone (optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="h-12 transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">How can I help you?</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell me a little about what brings you here..."
                        rows={5}
                        required
                        className="transition-all duration-300 focus:scale-[1.01] focus:shadow-md resize-none"
                      />
                    </div>
                    <MagneticButton strength={0.2} className="w-full">
                      <Button
                        type="submit"
                        className="w-full h-12 text-base rounded-full group"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </MagneticButton>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div ref={infoRef} className="space-y-8">
            <div className="contact-item">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Contact Information
              </h3>
              <p className="text-muted-foreground text-lg">
                Feel free to reach out through any of the following channels. I
                aim to respond to all inquiries within 24 hours.
              </p>
            </div>

            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="contact-item flex items-start gap-5 p-4 rounded-2xl transition-all duration-300 hover:bg-secondary cursor-pointer"
                >
                  <div className="icon-wrapper w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-lg">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-item pt-6 border-t border-border">
              <p className="text-muted-foreground">
                All sessions are confidential and conducted in a safe, supportive
                environment. Virtual sessions are also available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
