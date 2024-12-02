import { journey } from '@/utils/Data';
import Image from 'next/image';
import { MdArrowRightAlt } from "react-icons/md";

const Journey = ({title, desc}:{title:string; desc:string}) => {
  return (
   <section className='md:py-20 py-6 md:mt-0 mt-9'>
      <div className='flex justify-between items-center sm:flex-row flex-col md:gap-0 gap-2'>
            <h1 className='lg:text-5xl md:text-3xl text-xl font-medium lg:max-w-[450px] w-full'>{title}</h1>

            <p className='lg:max-w-[380px] w-full lg:text-base md:text-[12px] text-[11px]'>{desc}</p>
        </div>
        <div className='w-full mt-7 flex gap-24 justify-center md:overflow-hidden overflow-scroll scrollbar-none'>
        {journey.map((item) => (      
            <div key={item.date} className='shadow-xl dark:shadow-white/15 dark:shadow-md rounded-lg'>
                <Image src={item.img} alt='GTcar' width={500} height={500} className='w-[400px] md:h-[210px] h-[130px] object-cover rounded-t-lg' />

                <div className='py-3 px-3'>
                    <h2 className='text-blue-700 md:text-base text-xs'>{item.date}</h2>

                    <h1 className='md:text-3xl text-xl md:py-2 py-1 font-semibold max-w-[300px]'>{item.desc}</h1>
                    <p className='md:text-base text-xs'>{item.text}</p>

                    <p className='flex items-center gap-2 md:mt-8 mt-5 text-blue-700 md:text-base text-xs cursor-pointer'>{item.link} <MdArrowRightAlt/></p>
                </div>
            </div>
        ))}
        </div>
   </section>
  )
}

export default Journey