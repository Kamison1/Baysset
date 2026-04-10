import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Approach } from "@/components/approach"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CursorFollower } from "@/components/cursor-follower"

export default function Home() {
  return (
    <main className="min-h-screen">
      <SmoothScroll />
      <CursorFollower />
      <Header />
      <Hero />
      <Services />
      <About />
      <Approach />
      <Contact />
      <Footer />
    </main>
  )
}
