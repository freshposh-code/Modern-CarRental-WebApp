'use client'

import { CarTypes, categories, fuelCapacities, manufacturers, passengers, transmission } from '@/utils/Data';
import React, { ChangeEvent, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { IoMdClose } from 'react-icons/io';
import uploadImage from '@/utils/helpers';
import { setLoading } from '@/Redux/features/LoadingSlice';
import { useDispatch } from 'react-redux';
import { json } from 'stream/consumers';
import { toast } from 'react-toastify';

interface upload {
    onClose: () => void;
    fetchCars: () => void;
}

interface FormData {
    carName: string,
    carType: string,
    category: string,
    carImage: string[],
    capacity: string,
    transmission: string,
    passengers: string,
    price: string,
    description: string,
}

const UploadCar = ({onClose, fetchCars}: upload) => {
  const [data, setData] = useState<FormData>({
    carName: '',
    carType: CarTypes[0]?.value || '',   
    category: categories[0]?.value || '',
    carImage: [],
    capacity: fuelCapacities[0]?.value || '', 
    transmission: transmission[0]?.value || '', 
    passengers: passengers[0]?.value || '', 
    price: '',
    description: '',
  });

  const handleUploadProduct = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const uploadImageCloudinary = await uploadImage(file);

        setData((prev) => ({
            ...prev,
            carImage: prev.carImage ? [...prev.carImage, uploadImageCloudinary.url] : [uploadImageCloudinary.url],
          }));
          

        console.log(uploadImageCloudinary);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleDeleteFile = (index: number) => {
        const newCarImage = [...data.carImage];
        newCarImage.splice(index, 1);
      
        setData((prev) => ({
          ...prev,
          carImage: newCarImage,
        }));
      };

      const dispatch = useDispatch()

      const handleSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
          dispatch(setLoading(true));

          const response = await fetch('/api/uploadVault', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'content-type' : 'application/json'
            },
            body: JSON.stringify(data)
          })

          const dataResponse = await response.json();
          dispatch(setLoading(false));

          if(dataResponse.success) {
            toast.success(dataResponse.message);
            fetchCars();
            onClose();
          }

          if(dataResponse.error) {
            toast.error(dataResponse.message)
          }
          
        } catch (error) {
          console.log(error);
        }
      }
      
    
  return (
    <section className='w-screen h-screen bg-white/50 dark:bg-black/50 absolute z-[2000]'>
        <div className='min-h-screen flex justify-center items-center'>
     <form className='flex flex-col w-full max-w-xl bg-neutral-100 dark:bg-zinc-950 overflow-auto h-[calc(100vh-48px)] p-3 rounded-xl' onSubmit={handleSubmit}>
        <div className="flex items-center my-3">
        <h1 className='font-semibold md:text-xl text-base'>Upload Car</h1>
     <button className='block ml-auto text-xl' onClick={onClose}>
        <IoMdClose />
        </button>
   </div>
       <label className='mt-3 font-semibold'>Car Name</label>
       <input className='border outline-none py-2 px-3' type="text" value={data.carName} id='carName' name='carName' placeholder='Enter car name' onChange={handleOnchange} required />

       <label className='mt-3 font-semibold'>Car type</label>
       <select className='border outline-none py-2 px-3' value={data.carType} name='carType' onChange={handleOnchange} required>
        {CarTypes.map((el, index) => (
        <option key={el.id + index} value={el.value}>{el?.type}</option>
        ))}
       </select>

       <label className='mt-3 font-semibold'>Car Category</label>
       <select className='border outline-none py-2 px-3' value={data.category} name='category' onChange={handleOnchange} required>
        {categories.map((el, index) => (
        <option key={el.id + index} value={el.value}>{el?.brand}</option>
        ))}
       </select>

       <label className='mt-3 font-semibold'>Upload Cars</label>
       <div className="w-full mx-auto bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg my-2">
       <FileUpload
        dataValue={data.carImage}
        handleOnChange={(e) => handleUploadProduct(e)}
        handleDelete={handleDeleteFile}
      />
    </div>

       <label className='mt-3 font-semibold'>Fuel Capacity</label>
        <select className='border outline-none py-2 px-3' value={data.capacity} name='capacity' onChange={handleOnchange} required>
        {fuelCapacities.map((el, index) => (
        <option key={el.id + index} value={el.value}>{el?.capacity}</option>
        ))}
       </select>

       <label className='mt-3 font-semibold'>Transmission</label>
       <select className='border outline-none py-2 px-3' value={data.transmission} name='transmission' onChange={handleOnchange} required>
        {transmission.map((el, index) => (
        <option key={el.id + index} value={el.value}>{el?.tran}</option>
        ))}
       </select>

       <label className='mt-3 font-semibold'>Passengers</label>
       <select className='border outline-none py-2 px-3' value={data.passengers} name='passengers' onChange={handleOnchange} required>
        {passengers.map((el, index) => (
        <option key={el.id + index} value={el.value}>{el?.number}</option>
        ))}
       </select>

       <label className='mt-3 font-semibold'>Rent price</label>
       <input className='border outline-none py-2 px-3' type="number" value={data.price} id='price' name='price' placeholder='Enter price' onChange={handleOnchange} required />

       <label className='mt-3 font-semibold'>Description</label>
       <div className='h-40'>
       <textarea rows={4} value={data.description} id='description' name='description' placeholder='Description' className='w-full outline-none py-2 px-3' onChange={handleOnchange} required></textarea>
       </div>

       <button className='bg-blue-700 hover:rounded-full duration-200 text-white py-3 md:text-xl text-base font-bold my-3'>Upload</button>
   </form>
</div>
    </section>
  )
}

export default UploadCar