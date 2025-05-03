
import Image from 'next/image'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdOutlineCarRepair } from "react-icons/md";
import Navbar from '@/components/Client/Navbar';
import { CardHoverEffectDemo } from '@/components/Client/Services';
import { packages } from '@/utils/Data';


const service = () => {
  return (
    <>
       <Navbar />
    <section className='md:px-16 px-6 flex flex-col overflow-hidden'>
      <div className="flex lg:flex-row flex-col items-center justify-center mt-11">
      <div>
        <p className='text-neutral-400 lg:text-sm text-xs font-semibold py-2 flex items-center'> <MdOutlineCarRepair /> 
        We have talented engineers & mechanics</p>
        <h1 className='xl:text-7xl md:text-2xl text-xl font-bold lg:max-w-[1200px] w-full'>AUTO MAINTENANCE & REPAIR SERVICE</h1>
        <p className='text-neutral-400 lg:text-base xm:text-xs text-[10px] font-medium py-2'>Discover unparalleled services tailored to your unique needs</p>
        <p className='md:text-base xm:text-xs text-[10px] lg:max-w-[630px] w-full text-neutral-400 font-semibold'>We are committed to delivering excellence every step of the way. Let us help you achieve your goals with precision and care. Your satisfaction is our priority—let's create something extraordinary together!"</p>

       <div className="flex items-center gap-7 lg:py-7 py-3 cursor-pointer">
        <button className='bg-blue-600 flex items-center gap-2 text-white md:px-6 px-2 md:py-3 py-2 md:text-base text-xs rounded-lg'>Talk to Us <FaPhoneAlt /></button>
           <p className='border-b-2 border-neutral-600 font-bold md:text-base text-xs'>Explore Our Services</p>
       </div>   
      </div>
     <div className=''>
      <Image src='/taycan.png' alt='banner' width={1000} height={1000} className='max-w-full object-contain md:ml-40 ml-24' />
     </div>
     </div>

     {/* *OUR SERVICES */}
     <p className='border-2 border-neutral-300 w-fit m-auto md:px-4 px-2 md:py-2 py-1 text-neutral-400 md:text-sm text-xs uppercase'>We offer best repair service</p>
     <p className='lg:text-4xl text-2xl mt-3 font-bold text-center'>Our Services</p>
     <CardHoverEffectDemo />

     {/* *OUR PACKAGES */}
     <p className='border-2 border-neutral-300 w-fit m-auto md:px-4 px-2 md:py-2 py-1 text-neutral-400 md:text-sm text-xs uppercase'>All automate repair packages</p>
     <p className='lg:text-4xl text-2xl mt-3 font-bold text-center'>Our Packages</p>

     <div className='flex p-3 py-12 xl:px-40 px-0 gap-6 overflow-scroll scrollbar-none'>
     {packages.map((item) => (
      <div key={item.title} className='bg-white dark:bg-zinc-950 m-auto relative shadow-md dark:shadow-slate-50/15 rounded-md'>
        <div className="lg:max-w-full md:w-[330px] w-[290px]">
        <div className='flex'>
          <h1 className='text-blue-600 font-bold md:text-2xl text-lg p-4'>{item.title}</h1>
          <p className='bg-blue-600 text-white absolute top-0 right-5 md:px-5 px-3 lg:py-3 py-1 lg:text-xl text-sm'>{item.price}</p>
            </div>

          <ul className='md:pl-12 pl-9 py-2'>
            {item.installations.map((el) => (
              <div key={el.pkg}>
                <li className='list-disc lg:text-sm text-xs py-1 text-neutral-500 dark:text-neutral-300 font-medium'>{el.pkg}</li>
              </div>
            ))}
          </ul>
          </div>
      </div>
     ))}
     </div>
    </section>
    </>
  )
}

export default service