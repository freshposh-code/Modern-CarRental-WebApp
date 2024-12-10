'use client'

import BestSection from "@/components/BestSection";
import DisplayLogo from "@/components/DisplayLogo";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Journey from "@/components/Journey";
import Navbar from "@/components/Navbar";
import PopularSection from "@/components/PopularSection";

export default function Home() {
  return (
    <>
      <div className="hero-gradient dark:bg-gradient-to-b from-[rgba(182,195,255,0.85)] via-[#5860a7] to-[#202754] contrast-200 lg:h-screen h-auto rounded-b-[35rem]">
          <Navbar />
          <HeroSection />
      </div>
      <div className="md:px-16 px-6 xl:mt-[10rem] mt-0">
          <DisplayLogo />

          <PopularSection category='popular' title='Our Popular Car' desc='Enjoy exclusive deals and the best prices for satisfying travel packages. We offer the best value for everyday adventure.' />

          <BestSection category='best' title='The Best Platform for Car Rental' desc='Enjoy exclusive deals and the best prices for satisfying travel packages. We offer the best value for everyday adventure.'/>

          <Journey title='Embark on a journey and Performance' desc='Enjoy exclusive deals and the best prices for satisfying travel packages. We offer the best value for everyday adventure.'/>
          </div>
        <Footer/>
    </>
  )
}
