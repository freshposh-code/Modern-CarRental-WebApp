'use client'

import { footerIcons, footerLinks, navbar } from '@/utils/Data'
import Link from 'next/link'
import { useState } from 'react'

const Footer = () => {
  const [selectIcon, setSelectIcon] = useState(0);

  const handleSelect = (index:any) => {
    setSelectIcon(index)
  }
  return (
    <footer className='bg-zinc-900 dark:bg-zinc-800 md:px-16 px-6 py-10 text-zinc-300 md:text-base text-xs'>
      <div className="flex justify-between lg:flex-row flex-col">
          <div className="flex flex-col item-center">
                    <h1 className='font-extrabold sm:text-3xl text-2xl flex items-center gap-2'> <div className="border-4 border-blue-700 sm:size-12 size-8 rounded-full" />Rivent</h1>

                    <div className='lg:flex hidden lg:mt-32 mt-10 lg:py-0 py-5 gap-3'>
                      {footerIcons.map((item, index) => (
                        <div onClick={() => handleSelect(index)}>
                        <div className={`border-2 border-neutral-100 rounded-full p-4 lg:text-xl text-sm ${index === selectIcon ? 'bg-white text-black' : ''}`}>{item.icon}</div>
                        </div>
                      ))}
                    </div>
                    </div>

                <div className='grid grid-cols-2 grid-rows-7 gap-4 lg:gap-x-44 gap-x-5 lg:py-0 py-5'>
                  {footerLinks.map((item) => (
                    <div key={item.link}>
                      <span>{item.link}</span>
                    </div>
                  ))}
                </div>

                <div className='lg:hidden flex lg:mt-32 mt-6 gap-3'>
                      {footerIcons.map((item, index) => (
                       <div onClick={() => handleSelect(index)} key={index}>
                       <div className={`border-2 border-neutral-100 rounded-full p-4 lg:text-xl text-sm ${index === selectIcon ? 'bg-white text-black' : ''}`}>{item.icon}</div>
                       </div>
                      ))}
                    </div>

                  <div>
                  <h1 className='font-semibold lg:py-0 py-3'>ESTABLISHED 2023</h1>

                  <div className='underline lg:py-7 py-3'>
                    <p>riventcarrentals.com</p>
                    <p>Privacy Policy</p>
                  </div>

                  <h1 className=''>Explore rivent, Let drive with Rivent.</h1>
                  </div>
              </div>

              <div className='flex justify-between lg:flex-row flex-col lg:mt-28 mt-10 gap-3'>
                <span>&copy; 2024 RIVENT ALL RIGHT RESERVED.</span>

                <div className='flex lg:gap-14 gap-4'>
                  {navbar.map((item) =>(
                    <div key={item.link}>
                      <Link href={item.link}>
                      <span className='hover:text-blue-600 duration-200'>{item.name}</span>
                      </Link>
                    </div>
                  ) )}
                </div>
              </div>
    </footer>
  )
}

export default Footer