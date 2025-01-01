import { journey } from '@/utils/Data';
import Image from 'next/image';
import Link from 'next/link';
import { MdArrowRightAlt } from "react-icons/md";

const Journey = ({title, desc}:{title:string; desc:string}) => {
  return (
   <section className='md:py-20 py-6 md:mt-0 mt-9'>
      <div className='flex justify-between items-center sm:flex-row flex-col md:gap-0 gap-2'>
            <h1 className='lg:text-5xl md:text-3xl text-xl font-medium lg:max-w-[450px] w-full'>{title}</h1>

            <p className='lg:max-w-[380px] w-full lg:text-base md:text-[12px] text-[11px]'>{desc}</p>
        </div>

        <div className="overflow-scroll scrollbar-none">
        <div className='mt-7 grid grid-cols-3 lg:gap-8 gap-3 sm:w-full w-[550px]'>
        {journey.map((item) => (      
            <div key={item.date} className='rounded-lg'>
                <Image src={item.img} alt='GTcar' width={500} height={500} className='md:h-[210px] h-[130px] object-cover rounded-t-lg' />

                <div className='py-3 px-3 bg-white dark:bg-zinc-800'>
                    <h2 className='text-blue-600 font-medium md:text-base text-[10px]'>{item.date}</h2>

                    <h1 className='xl:text-3xl lg:text-xl md:text-sm text-xs md:py-2 py-1 font-semibold max-w-[300px]'>{item.desc}</h1>
                    <p className='lg:text-base md:text-xs text-[9px]'>{item.text}</p>

                    <Link href='/'>
                    <p className='flex items-center gap-2 md:mt-8 mt-5 font-medium text-blue-600 md:text-base text-[10px] cursor-pointer'>{item.link} <MdArrowRightAlt/></p>
                    </Link>
                </div>
            </div>
        ))}
        </div>
     </div>
   </section>
  )
}

export default Journey