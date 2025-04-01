'use client'

import BestSection from "@/components/Client/BestSection";
import BookingButton from "@/components/Client/BookingButton";
import DisplayLogo from "@/components/Client/DisplayLogo";
import Footer from "@/components/Client/Footer";
import HeroSection from "@/components/Client/HeroSection";
import Journey from "@/components/Client/Journey";
import Loader from "@/components/Client/Loader";
import Navbar from "@/components/Client/Navbar";
import PopularSection from "@/components/Client/PopularSection";
import { useAppSelector } from "@/Redux/hooks";

export default function Home() {
      const isLoading = useAppSelector(store => store.loadingSlice);
  return (
    <>
      <div className="hero-gradient dark:bg-gradient-to-b from-[rgba(182,195,255,0.85)] via-[#5860a7] to-[#202754] contrast-200 lg:h-screen h-auto rounded-b-[35rem] ">
          <Navbar />
          <HeroSection />

      </div>
      <div className="md:px-16 px-6 xl:mt-[10rem] mt-0 relative">
          <DisplayLogo />

          <PopularSection category='popular' title='Our Popular Car' desc='Enjoy exclusive deals and the best prices for satisfying travel packages. We offer the best value for everyday adventure.' />

          <BestSection category='best' title='The Best Platform for Car Rental' desc='Enjoy exclusive deals and the best prices for satisfying travel packages. We offer the best value for everyday adventure.'/>

          <Journey title='Embark on a journey and Performance' desc='Enjoy exclusive deals and the best prices for satisfying travel packages. We offer the best value for everyday adventure.'/>
          </div>
          <div className="mt-16">
        <Footer/>
        </div>
        <div className="sticky bottom-5">
        <BookingButton />
        </div>
        {isLoading && <Loader />}
    </>
  )
}
