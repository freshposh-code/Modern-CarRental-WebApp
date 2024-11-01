'use client'

import { displayCurrency } from '@/utils/displayCurrency';
import Image from 'next/image';
import React, { useState } from 'react'
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';
import EditVaultCard from './EditVaultCard';
import DeleteModal from './DeleteModal';
import { Vaultdata } from '@/app/admin/carvault/page';

interface VaultCardProps {
    data: Vaultdata[];
    fetchCars: () => void;
}

const VaultCard: React.FC<VaultCardProps> = ({data, fetchCars}) => {
    const [openVault, setOpenVault] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<Vaultdata | null>(null);

    const handleOpenDeleteModal = (id: string) => {
        setSelectedItemId(id); 
        setOpenDel(true);  
      };
      
      const handleOpenEditModal = (item: Vaultdata) => {
        setSelectedItem(item); 
        setOpenVault(true);
    };
         
  return (
    <section>
        <div className="flex flex-wrap md:justify-normal justify-center gap-5">
            {data?.map((item, index) => (
                <div className='bg-gray-300 md:w-56 w-32 dark:bg-zinc-700 group'>
                    <div className="flex justify-between p-2 items-center relative cursor-pointer">
                    <h1 className='md:text-lg sm:text-sm text-xs font-bold'>{item.carName}</h1>
                    
                    <Image src="/vaultLogo.png" alt="logo" width={500} height={500} className='md:w-16 w-10 object-contain absolute right-0 opacity-100 group-hover:opacity-0 duration-200' />
                    <MdDelete className='bg-white text-red-600 dark:text-red-600 md:size-6 size-5 rounded-full opacity-0 group-hover:opacity-100 duration-200 z-[2000]' onClick={() => handleOpenDeleteModal(item._id)} key={item._id}/>
                    </div>

                    <div className='flex justify-center items-center'>
                        <img src={item.carImage[0]} alt='cars' width={1000} height={1000} className='md:size-52 size-44 object-contain' />
                    </div>

                    <div className="flex justify-between p-2 items-center">
                    <h1 className='md:text-sm text-xs font-semibold'>{displayCurrency(item.price)}/day</h1>

                    <MdOutlineModeEdit className='bg-green-500 text-black dark:text-white md:size-6 size-5 rounded-full cursor-pointer' onClick={() => handleOpenEditModal(item)} key={item._id}/>
                    </div>
                    {
                        openVault && <EditVaultCard onClose={() => setOpenVault(false)} callFunc={fetchCars} Data={selectedItem} id={selectedItem?._id}/>
                    }
                    <span>
                    {openDel && selectedItemId && <DeleteModal onClose={() => setOpenDel(false)} callFunc={fetchCars} Data={selectedItemId} />}
                     </span>
                </div>
            ))}
        </div> 

    </section>
  )
}

export default VaultCard