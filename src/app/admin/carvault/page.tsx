'use client'

import { useState } from "react";
import { IoCarSportSharp } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadCar from "@/components/AdminPanel/UploadCar";
import VaultCard from "@/components/AdminPanel/VaultCard";

const Page = () => {
  const [upload, setUpload] = useState(false)
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
      <VaultCard />
      </div>
   </div>
      {
        upload && <UploadCar onClose={() => setUpload(false)} />
      }
      </>
  )
}

export default Page