'use client'

import { useEffect, useState } from "react";
import { IoCarSportSharp } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadCar from "@/components/AdminPanel/UploadCar";
import VaultCard from "@/components/AdminPanel/VaultCard";
import { useDispatch } from "react-redux";
import { setLoading } from "@/Redux/features/LoadingSlice";
import { toast } from "react-toastify";

export interface Vaultdata {
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

const Page = () => {
  const [upload, setUpload] = useState(false);

  const [data, setData] = useState<Vaultdata[]>([]);
  const dispatch = useDispatch()

  const fetchCars = async () => {
      try {
          dispatch(setLoading(true));
          const fetchData = await fetch('/api/getVault',{
           method: 'GET',
          credentials: 'include',
          })
          const dataApi = await fetchData.json();
          dispatch(setLoading(false));
          console.log('allCars', dataApi)

          if(dataApi.success) {
              setData(dataApi.data)
          }
          if(dataApi.error) {
              toast.error(dataApi.message)
          }
      } catch (error) {
          console.log(error)
      }
}
      useEffect(() => {
          fetchCars()
      }, [])
  return (
    <>
    <div className='sm:my-5 my-2 sm:mx-5 mx-2 w-full bg-neutral-100 dark:bg-zinc-800 h-[calc(100vh-40px)] rounded-xl overflow-y-auto'>
      <div className="flex justify-between m-3 items-center bg-gray-300 dark:bg-zinc-700 rounded-full">
        <span className="flex items-center md:gap-3 gap-1 m-3">
      <IoCarSportSharp className='md:text-3xl text-lg' />
      <h1 className='md:text-xl text-sm font-semibold'>VAULT</h1>
      </span>

        <span className="flex md:gap-3 gap-1 m-3 bg-blue-700 text-white rounded-3xl items-center cursor-pointer px-4 py-2" onClick={() => setUpload(true)}>
      <h1 className='md:text-xl text-sm font-semibold'>Upload</h1>
      <FaCloudUploadAlt />
      </span>
      </div>
      <div className="m-3">
      <VaultCard data={data} fetchCars={fetchCars} />
      </div>
   </div>
      {
        upload && <UploadCar onClose={() => setUpload(false)}  fetchCars={fetchCars} />
      }
      </>
  )
}

export default Page