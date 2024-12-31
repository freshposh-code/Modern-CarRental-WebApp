import { displaylogo } from '@/utils/Data'
import Image from 'next/image'
import React from 'react'

const DisplayLogo = () => {
  return (
    <>
    <section className='flex flex-wrap justify-between items-center gap-5'>
        {displaylogo.map((item) => (
          <div key={item.logo}>
            <Image src={item.logo} alt='logo' width={500} height={500} className="md:size-40 size-28 object-contain m-auto" />
          </div>
        ))}
    </section>
    </>
  )
}

export default DisplayLogo