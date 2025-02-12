'use client'

import { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { SiConstruct3 } from "react-icons/si";
import { HiUsers } from "react-icons/hi2";
import { displayCurrency } from '@/utils/displayCurrency';
import { AnimatedModalDemo } from './ModalDemo';
import { FcLike } from "react-icons/fc";
import { toast } from 'react-toastify';
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

 export type BookingItem = {
  _id: string;
  carName: string;
  carImage: string[];
  startDate: string;
  endDate: string;
  price: string;
};

const PopularSection = ({title , desc, category, carItems}: {title: string; desc: string; category: string; item?: Item; carItems?: BookingItem}) => {
  console.log("PopularSection carItems:", carItems);
  const [data, setData] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(12).fill(null);
  const { likedItems, toggleWishlist } = useWishlist();

  const colors = ['bg-violet-100 dark:bg-violet-400', 'bg-blue-100 dark:bg-blue-400', 'bg-red-100 dark:bg-red-400', 'bg-gray-300 dark:bg-gray-400', 'bg-purple-300 dark:bg-purple-400', 'bg-zinc-200 dark:bg-zinc-400', 'bg-orange-100 dark:bg-orange-400', 'bg-sky-100 dark:bg-neutral-400', 'bg-indigo-100 dark:bg-indigo-400', 'bg-amber-100 dark:bg-amber-400', 'bg-white dark:bg-gray-400',];

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

  return (
    <section className='md:py-16 py-6'>
           <div className='flex justify-between items-center sm:flex-row flex-col md:gap-0 gap-2'>
            <h1 className='lg:text-5xl md:text-3xl text-xl font-medium lg:max-w-[450px] w-full'>{title}</h1>

            <p className='lg:max-w-[380px] w-full lg:text-base md:text-[12px] text-[11px]'>{desc}</p>
        </div>
         
        {loading ? (
        <div className='flex py-6 overflow-scroll scrollbar-none animate-pulse'>
        {loadingList.map((_, index) => (
           <div key={index} className='md:px-2 px-1 flex'>
           <div className='bg-gray-300 dark:bg-gray-400 md:w-80 w-44 p-3 rounded-md'>
         <div className="flex justify-between items-center">
           <div className='md:px-14 px-8 md:py-3 py-2 bg-gray-400 dark:bg-gray-500 rounded-full'/>
         <div className="md:p-3 p-2 rounded-full bg-gray-400 dark:bg-gray-500"/>
         </div>
         <div className='px-9 md:py-2 py-1 my-2 bg-gray-400 dark:bg-gray-500 w-fit rounded-full'/>
         <span>
           <div className='bg-gray-400 dark:bg-gray-500 md:w-48 w-24 h-20 mt-8 m-auto' />
         </span>
           <div className='flex justify-between items-center gap-1 py-5'>
             <div className="md:px-10 px-5 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
             <div className="md:px-10 px-5 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
             <div className="md:px-10 px-5 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
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
          <div className='flex py-6 overflow-scroll scrollbar-none'>
          {data?.map((item, index) => (
            <div key={index} className='md:px-2 px-1'>
            <div className={`${colors[index % colors.length]} md:w-80 w-44 p-3 rounded-md`}>
          <div className="flex justify-between items-center">
            <h1 className='font-bold md:text-lg text-sm'>{item?.carName}</h1>
            <span onClick={() => toggleWishlist(item)}  className='cursor-pointer text-black bg-white rounded-full p-1'>
              {
             likedItems[item._id] ? <FcLike/> : <CiHeart />
              }
            </span>
          </div>
          <span className='md:text-base text-xs text-slate-500 font-semibold'>{item?.carType}</span>
          <span>
            <img className='w-48 h-20 object-contain m-auto mt-8' src={item?.carImage[0]} alt="cars" />
          </span>
          <div className='flex items-center justify-between py-5 md:text-base text-xs text-slate-500 dark:text-slate-700 font-semibold'>
            <div className='flex items-center gap-1'>
              <BsFillFuelPumpFill />
              <span>{item?.capacity}</span>
            </div>
            <div className='flex items-center gap-1'>
              <SiConstruct3 />
              <span>{item?.transmission}</span>
            </div>
            <div className='flex items-center gap-1'>
              <HiUsers />
              <span>{item?.passengers}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className='font-bold md:text-base text-[10px]'>{displayCurrency(item?.price)}<span className='font-normal'>/day</span></h1>
            <span>
            <AnimatedModalDemo data={item}  carItems={{ _id: item._id, carName: item.carName, carImage: item.carImage, startDate: "", endDate: "", price: item.price.toString() }}  />
            </span>
          </div>
          </div>
          </div>
          ))}
        </div>
          ) : (
            <div className='flex py-6 overflow-scroll scrollbar-none animate-pulse'>
            {loadingList.map((_, index) => (
               <div key={index} className='md:px-2 px-1 flex'>
               <div className='bg-gray-300 dark:bg-gray-400 md:w-80 w-44 p-3 rounded-md'>
             <div className="flex justify-between items-center">
               <div className='md:px-14 px-8 md:py-3 py-2 bg-gray-400 dark:bg-gray-500 rounded-full'/>
             <div className="md:p-3 p-2 rounded-full bg-gray-400 dark:bg-gray-500"/>
             </div>
             <div className='px-9 md:py-2 py-1 my-2 bg-gray-400 dark:bg-gray-500 w-fit rounded-full'/>
             <span>
               <div className='bg-gray-400 dark:bg-gray-500 md:w-48 w-24 h-20 mt-8 m-auto' />
             </span>
               <div className='flex justify-between items-center gap-1 py-5'>
              <div className="md:px-10 px-5 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
             <div className="md:px-10 px-5 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
             <div className="md:px-10 px-5 md:py-3 py-1 bg-gray-400 dark:bg-gray-500 rounded-full"/>
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

export default PopularSection