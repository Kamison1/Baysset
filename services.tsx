"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // Header animation on load
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.3 }
      )

      gsap.fromTo(
        logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power4.out", delay: 0.5 }
      )

      if (navItemsRef.current) {
        gsap.fromTo(
          navItemsRef.current.children,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.6,
          }
        )
      }

      // Add magnetic effect to nav links
      if (navItemsRef.current) {
        const links = navItemsRef.current.querySelectorAll("a")
        links.forEach((link) => {
          link.addEventListener("mouseenter", () => {
            gsap.to(link, { scale: 1.05, duration: 0.3, ease: "power2.out" })
          })
          link.addEventListener("mouseleave", () => {
            gsap.to(link, { scale: 1, duration: 0.3, ease: "power2.out" })
          })
        })
      }
    })

    // Scroll effect for header background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      ctx.revert()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        ".mobile-nav-item",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power3.out" }
      )
    }
  }, [isMenuOpen])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg py-2"
          : "bg-transparent py-4"
      } opacity-0`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link ref={logoRef} href="/" className="flex items-center group">
            <Image
              src="/images/logo-mark.png"
              alt="Baysset"
              width={40}
              height={40}
              className={`h-8 w-auto md:h-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                isScrolled ? "invert" : "invert"
              }`}
            />
            <span className={`ml-2 font-serif text-xl md:text-2xl font-semibold transition-colors duration-300 ${
              isScrolled ? "text-primary" : "text-white"
            }`}>
              Baysset
            </span>
          </Link>

          <nav ref={navItemsRef} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-colors group ${
                  isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`} />
              </Link>
            ))}
            <MagneticButton strength={0.3}>
              <Button asChild className="rounded-full px-6 hover:scale-105 transition-transform">
                <Link href="#contact">Book a Session</Link>
              </Button>
            </MagneticButton>
          </nav>

          <button
            className={`md:hidden p-2 transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-border/20 bg-background/95 backdrop-blur-lg -mx-4 px-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-item text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all font-medium py-3 px-4 rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="w-full mt-4 rounded-full">
                <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                  Book a Session
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
