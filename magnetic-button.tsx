"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Add hover animations to links
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll("a")
        links.forEach((link) => {
          const arrow = link.querySelector(".link-arrow")
          link.addEventListener("mouseenter", () => {
            gsap.to(link, { x: 8, duration: 0.3, ease: "power2.out" })
            if (arrow) gsap.to(arrow, { x: 4, y: -4, opacity: 1, duration: 0.3 })
          })
          link.addEventListener("mouseleave", () => {
            gsap.to(link, { x: 0, duration: 0.3, ease: "power2.out" })
            if (arrow) gsap.to(arrow, { x: 0, y: 0, opacity: 0, duration: 0.3 })
          })
        })
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-foreground text-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div ref={contentRef} className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="inline-block transition-transform hover:scale-105 duration-300">
              <Image
                src="/images/logo-with-text.png"
                alt="Baysset"
                width={140}
                height={90}
                className="h-20 w-auto"
              />
            </Link>
            <p className="mt-4 font-serif text-xl text-background/90">
              Built to Add Value
            </p>
            <p className="mt-4 text-background/60 leading-relaxed">
              Professional counseling services dedicated to helping you find
              peace, clarity, and resilience on your journey to well-being.
            </p>
          </div>

          <div ref={linksRef}>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <nav className="space-y-3">
              {[
                { href: "#services", label: "Services" },
                { href: "#about", label: "About" },
                { href: "#approach", label: "Approach" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-background/70 hover:text-background transition-colors group"
                >
                  {link.label}
                  <ArrowUpRight className="link-arrow w-4 h-4 opacity-0 transition-all" />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Contact</h4>
            <div className="space-y-3 text-background/70">
              <a href="tel:+15551234567" className="block hover:text-background transition-colors">
                (555) 123-4567
              </a>
              <a href="mailto:hello@baysset.com" className="block hover:text-background transition-colors">
                hello@baysset.com
              </a>
              <p className="pt-2">
                123 Wellness Ave, Suite 200<br />
                San Francisco, CA 94102
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            &copy; {new Date().getFullYear()} Baysset Counseling. All rights
            reserved.
          </p>
          <div className="flex gap-8 text-sm">
            <Link
              href="#"
              className="text-background/50 hover:text-background transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-background after:transition-all hover:after:w-full"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-background/50 hover:text-background transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-background after:transition-all hover:after:w-full"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
