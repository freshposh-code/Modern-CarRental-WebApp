'use client'

import DisplayLogo from "@/components/DisplayLogo";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div className="hero-gradient dark:bg-gradient-to-b from-[rgba(182,195,255,0.85)] via-[#5860a7] to-[#202754] contrast-200 lg:h-screen h-auto rounded-b-[35rem]">
          <Navbar />
          <HeroSection />
      </div>
      <div className="md:px-16 px-6 xl:mt-[10rem] mt-0">
          <DisplayLogo />
          </div>
    </>
  )
}
