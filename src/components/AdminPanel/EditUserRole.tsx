'use client'

import ROLE from '@/common/role';
import { setLoading } from '@/Redux/features/LoadingSlice';
import React, { ChangeEvent, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface roleEdit {
    _id: string;
    name: string;
    email: string;
    role: string
    onClose: () => void;
    callFunc: () => void;
}

const EditUserRole = ({onClose, callFunc, _id, name, email, role}: roleEdit) => {
    const [userRole, setUserRole] = useState(role);
    const dispatch  = useDispatch()

    const handleOnChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setUserRole(e.target.value);
    };

    const updateUserRole = async () => {
        try {
            dispatch(setLoading(true))

            const updateRole = await fetch('/api/updateUserRole', {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "content-type" : "application/json",
                    "userId": _id,
                },
                body: JSON.stringify({
                    userId: _id,
                    role:  userRole,
                })
            })

            const userApi = await updateRole.json();
            dispatch(setLoading(false))

            if(userApi.success) {
                callFunc()
                onClose()
                toast.success(userApi.message)
            }

            if(userApi.error) {
                toast.error(userApi.message)
            }
        } catch (error) {
            console.log(error || "Something went wrong")
        }
    }


  return (
    <section className='w-screen min-h-screen bg-white/50 dark:bg-black/50 flex justify-center items-center inset-0 absolute font-serif'>
      <div className='bg-white-100/75 dark:bg-black-200 shadow-md p-4 w-full max-w-sm rounded-md'>

   <button className='block ml-auto text-xl' onClick={onClose}>
   <IoMdClose />
   </button>

   <h1 className='pb-4 text-base'>Change User Role</h1>

 <p>Name : {name}</p>
    <p>Email : {email}</p>

<div className='flex items-center justify-between my-4'>
    <p>Role :</p>
    <select className='border px-4 py-1 cursor-pointer' value={userRole} onChange={handleOnChangeSelect}>
        {
            Object.values(ROLE).map(el => {
                return (
                    <option value={el} key={el}>{el}</option>
                )
            })
        }
    </select>
</div>

<button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-blue-700 text-white hover:bg-blue-600' onClick={updateUserRole}>Change Role</button>
</div>
    </section>
  )
}

export default EditUserRole