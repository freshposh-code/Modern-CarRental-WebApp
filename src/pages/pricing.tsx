import Navbar from '@/components/Client/Navbar'
import PricingCars from '@/components/Client/PricingCars';
import { period, periodII } from '@/utils/Data';
import { CgArrowsExchangeV } from "react-icons/cg";

const pricing = () => {
  return (
    <>
    <Navbar />
    <section className='flex-col flex sm:flex-row justify-center items-center sm:gap-10 gap-6 md:py-16 py-6 sm:mt-10 mt-12 text-white max-w-full p-4 overflow-x-hidden'>

      <div className="abstract-img p-4 rounded-xl sm:w-[42.5rem] w-full transformS duration-200">
        <h1 className='font-bold lg:text-3xl text-lg capitalize max-w-[350px] lg:leading-10 leading-6'>The best platform for car rental</h1>
        <p className='py-4 max-w-[300px] font-medium sm:text-base text-sm'>Ease of doing a car rental safely and reliably. Of course at alow price.</p>
        <button className='bg-blue-600 lg:px-6 px-4 lg:py-3 py-2 font-medium rounded-md sm:text-base text-sm'>Rental car</button>
        <div>
          <img src='/priceImg1.png' alt='car-img' className='w-[32rem] pl-36 object-contain' />
        </div>
      </div>

      <div className="abstract-imgII p-4 rounded-xl sm:w-[42.5rem] w-full transformS duration-200 relative">
      <h1 className='font-bold lg:text-3xl text-lg max-w-[350px] lg:leading-10 leading-6'>Easy way to rent a car at low price.</h1>
        <p className='py-4 max-w-[280px] font-medium sm:text-base text-sm'>Providing cheap car rental services and safe and comfortable facilities.</p>
        <button className='bg-blue-500 lg:px-6 px-4 lg:py-3 py-2 font-medium rounded-md sm:text-base text-sm'>Rental car</button>
        <div>
        <img src='/priceImg1.png' alt='car-img' width={500} height={500} className='w-[32rem] pl-36 object-contain' />
        </div>
      </div>
    </section>

    <section className='lg:px-16 px-6 flex xl:flex-row flex-col gap-4 justify-between items-center'>
      <div className='bg-white dark:bg-zinc-800 md:py-4 py-2 md:px-10 px-2 rounded-xl flex flex-row md:flex-col'>
        <div>
          <span className='flex items-center gap-2 py-3'>
          <input type="radio" />
          <p className='font-bold md:text-base text-sm'>Pick-Up</p>
          </span>
          <div className="flex md:gap-10 gap-4">
          {period.map((item) => ( 
        <div>
          <p className='font-bold md:text-base text-sm'>{item.booking}</p>
          <select className='bg-white dark:bg-zinc-800 md:text-sm text-xs'>
            <option>{item.select}</option>
          </select>
        </div>
          ))}
          </div>
         </div>
      </div>

      <span className='bg-blue-600 text-2xl p-4 rounded-xl text-white'>
        <CgArrowsExchangeV />
      </span>

      <div className='bg-white dark:bg-zinc-800 w-fit md:py-4 py-2 md:px-10 px-2 rounded-xl'>
        <div>
          <span className='flex items-center gap-2 py-3'>
          <input type="radio" />
          <p className='font-bold md:text-base text-sm'>Drop-Off</p>
          </span>
          <div className="flex md:gap-10 gap-4">
          {periodII.map((item) => ( 
        <div>
          <p className='font-bold md:text-base text-sm'>{item.booking}</p>
          <select className='bg-white dark:bg-zinc-800 md:text-sm text-xs'>
            <option>{item.select}</option>
          </select>
        </div>
          ))}
          </div>
         </div>
      </div>

    </section>

    <section className='md:py-16 py-6 md:px-16 px-6'>
      <PricingCars title='Reserved Cars' category='reserved' />
    </section>
    </>
  )
}

export default pricing