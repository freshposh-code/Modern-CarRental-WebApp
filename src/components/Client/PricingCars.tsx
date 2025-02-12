'use client'

import { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { SiConstruct3 } from "react-icons/si";
import { HiUsers } from "react-icons/hi2";
import { displayCurrency } from '@/utils/displayCurrency';
import { AnimatedModalDemo } from './ModalDemo';
import { FcLike } from "react-icons/fc";
import { useWishlist } from '@/context/WishlistContext';

export interface CategoryData {
  _id: string;
capacity: string;
carImage: string[];
carName: string;
carType: string;
category: string;
description: string;
passengers : string;
price: number
transmission: string;
}

type Item = {
  _id: string;
  carName: string;
  carImage: string[];
  price: number;
};

const PricingCars = ({title , category}: {title: string; category: string; item?: Item;}) => {
  const [data, setData] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(8).fill(null);
  const { likedItems, toggleWishlist } = useWishlist();
  const [visibleCount, setVisibleCount] = useState(8);

  const fetchCategory = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/vaultCategory?category=${encodeURIComponent(category)}`, {
        method: 'GET',
        credentials: 'include',
        headers: {'content-type' : 'application/json'},
      })

      const dataApi = await response.json();

       setData(dataApi?.data || [])

      console.log('Popular category', dataApi?.data);
    } catch (error) {
      console.error('Error fetching category', error);
      setData([]);
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [category]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <section className='md:py-9 py-6'>
            <div>
            <h1 className='lg:text-4xl md:text-3xl text-xl font-medium text-start'>{title}</h1>
        </div>
         
        {loading ? (
        <div className='py-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 place-items-center animate-pulse'>
        {loadingList.map((_, index) => (
           <div key={index} className='md:px-2 px-1 my-3'>
           <div className='bg-gray-300 dark:bg-gray-400 lg:w-80 md:w-72 xm:w-40 w-32 p-3 rounded-md'>
         <div className="flex justify-between items-center">
           <div className='md:px-14 px-8 md:py-3 py-2 bg-gray-400 dark:bg-gray-500 rounded-full'/>
         <div className="md:p-3 p-2 rounded-full bg-gray-400 dark:bg-gray-500"/>
         </div>
         <div className='px-9 md:py-2 py-1 my-2 bg-gray-400 dark:bg-gray-500 w-fit rounded-full'/>
         <span>
           <div className='bg-gray-400 dark:bg-gray-500 md:w-40 w-24 h-20 mt-8 m-auto' />
         </span>
           <div className='flex justify-between items-center gap-1 py-5'>
             <div className="md:px-10 xm:px-5 px-4 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
             <div className="md:px-10 xm:px-5 px-4 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
             <div className="md:px-10 xm:px-5 px-4 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
           </div>
         <div className="flex items-center justify-between">
          <div className="md:px-14 px-7 md:py-2 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
           <span>
           <div className="md:px-10 px-5 md:py-5 py-2 rounded-full bg-gray-400 dark:bg-gray-500"/>
           </span>
         </div>
         </div>
         </div>
        ))}
          </div>

        ) : (
          data.length > 0 ? (
          <div className='py-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 place-items-center relative'>
         {data.slice(0, visibleCount).map((item, index) => (
            <div key={index} className='md:px-2 px-1 md:my-3 my-2'>
            <div className={`bg-white dark:bg-zinc-800 lg:w-80 md:w-72 xm:w-40 w-32 p-3 rounded-md`}>
          <div className="flex justify-between items-center">
            <h1 className='font-bold lg:text-lg md:text-sm xm:text-sm text-xs line-clamp-1'>{item?.carName}</h1>
            <span onClick={() => toggleWishlist(item)}  className='cursor-pointer text-black bg-zinc-200 rounded-full p-1'>
              {
             likedItems[item._id] ? <FcLike/> : <CiHeart />
              }
            </span>
          </div>
          <span className='lg:text-base md:text-xs text-xs text-slate-500 dark:text-slate-400 font-semibold'>{item?.carType}</span>
          <span>
            <img className='w-64 h-20 object-contain m-auto mt-8' src={item?.carImage[0]} alt="cars" />
          </span>
          <div className='flex items-center justify-between py-5 lg:text-base md:text-sm text-[9px] text-slate-500 dark:text-slate-400 font-semibold'>
            <div className='flex items-center xm:gap-1 gap-0'>
              <BsFillFuelPumpFill />
              <span>{item?.capacity}</span>
            </div>
            <div className='flex items-center xm:gap-1 gap-0'>
              <SiConstruct3 />
              <span>{item?.transmission}</span>
            </div>
            <div className='flex items-center xm:gap-1 gap-0'>
              <HiUsers />
              <span>{item?.passengers}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className='font-bold lg:text-base md:text-sm text-[8px]'>{displayCurrency(item?.price)}<span className='font-normal'>/day</span></h1>
            <span>
            <AnimatedModalDemo data={item} carItems={{ _id: item._id, carName: item.carName, carImage: item.carImage, startDate: "", endDate: "", price: item.price.toString() }} />
            </span>
          </div>
          </div>
          </div>
          ))}
          
          {visibleCount < data.length && (
             <div className='text-center absolute right-0 left-0 bottom-0 -m-7'>
               <button onClick={handleShowMore} className='px-4 py-2 bg-black dark:bg-white hover:bg-white hover:text-black border-2 dark:hover:bg-black dark:hover:text-white duration-150 text-white dark:text-black rounded-full md:text-base text-xs'>
                 See More Cars
               </button>
             </div>
           )}
       </div>
          ) : (
            <div className='py-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 place-items-center animate-pulse'>
            {loadingList.map((_, index) => (
               <div key={index} className='md:px-2 px-1 my-3'>
               <div className='bg-gray-300 dark:bg-gray-400 lg:w-80 md:w-72 xm:w-40 w-32 p-3 rounded-md'>
             <div className="flex justify-between items-center">
               <div className='md:px-14 px-8 md:py-3 py-2 bg-gray-400 dark:bg-gray-500 rounded-full'/>
             <div className="md:p-3 p-2 rounded-full bg-gray-400 dark:bg-gray-500"/>
             </div>
             <div className='px-9 md:py-2 py-1 my-2 bg-gray-400 dark:bg-gray-500 w-fit rounded-full'/>
             <span>
               <div className='bg-gray-400 dark:bg-gray-500 md:w-48 w-24 h-20 mt-8 m-auto' />
             </span>
               <div className='flex justify-between items-center gap-1 py-5'>
              <div className="md:px-10 xm:px-5 px-4 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
             <div className="md:px-10 xm:px-5 px-4 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
             <div className="md:px-10 xm:px-5 px-4 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
               </div>
             <div className="flex items-center justify-between">
             <div className="md:px-14 px-7 md:py-2 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
               <span>
                    <div className="md:px-10 px-5 md:py-5 py-2 rounded-full bg-gray-400 dark:bg-gray-500"/>
               </span>
             </div>
             </div>
             </div>
            ))}
              </div>
          )
       )}
    </section>
  )
}

export default PricingCars