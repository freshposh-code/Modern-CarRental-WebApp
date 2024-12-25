import Navbar from '@/components/Navbar';
import { abousUs } from '@/utils/Data';
import Image from 'next/image'
import { FaPhoneAlt } from "react-icons/fa";

const aboutUs = () => {
  return (
    <>
    <Navbar />
       {/*  SECTION I */}
    <section className='md:px-16 px-6'>
    <div className='flex lg:flex-row flex-col w-full items-center justify-between md:py-16 py-6'>
         <div>
          <h1 className='lg:text-7xl md:text-4xl text-2xl font-bold lg:max-w-[870px] w-full lg:py-7 py-3'>Search and find your best car rental with ease way</h1>
          <p className='lg:text-base xm:text-sm text-[10px] lg:max-w-[430px] w-full text-neutral-400 font-semibold'>Drive performance and cross functional collaboration with ease-to-use dashboards, data visualization, and automated insights in one click</p>

          <div className="flex items-center gap-7 lg:py-7 py-3 cursor-pointer">
          <button className='bg-blue-700 flex items-center gap-2 text-white md:px-6 px-2 md:py-3 py-2 md:text-base text-xs'>Booking now <FaPhoneAlt /></button>
          <p className='border-b-2 border-neutral-600 font-bold md:text-base text-xs'>See all cars</p>
          </div>        
         </div>

         <div>
          <Image src='/iris.png' alt='pngIamge' width={1000} height={1000} className='max-w-full' />
         </div>
    </div>

     {/*  SECTION II */}
    <div className='md:py-16 py-6'>
      <div className='text-center'>
        <p className='text-neutral-400 font-semibold sm:text-sm text-xs'>Welcome to our website</p>

        <h1 className='font-bold lg:text-4xl text-xl lg:py-2 py-1'>RIVENT</h1>

        <div className="border-b-2 border-neutral-500 md:w-12 w-6 m-auto lg:mt-3 mt-1" />
        <div className="border-b-4 border-blue-700 md:w-28 w-14 m-auto py-[2px]" />

        <p className='md:mt-7 mt-4 lg:text-sm text-xs lg:max-w-[1000px] w-full m-auto text-neutral-400 font-medium'>Rivent is the most enticing creative modern and multipurpose auto dealer Premium Website. Suitable for any car dealer website, business or corporate website. The website has been created especially for automotive dealers, car resellers, car service stations mechanic workshop and auto motor retailers.</p>
      </div>
    </div>
    
       {/*  SECTION III */}
    <div className="flex flex-wrap justify-around items-center text-center gap-3">
      {abousUs.map((item) => (
        <div className=''>
          <div className='text-center bg-zinc-200 rounded-full lg:p-4 p-3 md:text-3xl sm:text-2xl text-base w-fit m-auto text-black'>{item.icon}</div>
          <h1 className='font-bold md:text-lg sm:text-base text-sm lg:my-3 my-1'>{item.head}</h1>
          <div className="border-2 border-blue-700 sm:w-7 w-4 m-auto" />
          <p className='text-neutral-400 xl:text-sm lg:text-xs text-[9px] text-center lg:max-w-[300px] max-w-[120px] lg:my-3 my-1'>{item.desc}</p>
        </div>
      ))}
    </div>

 </section>
        {/* SECTION IV */}
       <div className="md:py-16 py-6">
        <div className="flex justify-between items-center">
          <Image src='/Pleft.png' alt='sideVew' width={1000} height={1000} className='object-contain lg:w-[450px] w-[200px] lg:h-48 h-32 xs:flex hidden' />
          <div className='flex justify-center flex-col text-center items-center m-auto'>
            <Image src='/person.png' width={500} height={500} alt='person' className='object-contain lg:size-24 size-12 rounded-full bg-blue-300 py-1' />
            <p className='text-neutral-400 font-semibold lg:text-sm text-xs'>Have any question?</p>
            <p className='text-blue-600 font-bold lg:text-2xl xs:text-xl text-sm'>(007) 123 456 7890</p>
          </div>
          <Image src='/Pright.png' alt='sideVew' width={1000} height={1000} className='object-contain lg:w-[450px] w-[200px] lg:h-44 h-32 xs:flex hidden' />
        </div>
       </div>
    </>
  )
}

export default aboutUs