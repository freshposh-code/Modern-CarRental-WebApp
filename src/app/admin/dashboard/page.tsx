'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import moment from 'moment'
import { MdOutlineModeEdit } from "react-icons/md";
import EditUserRole from '@/components/AdminPanel/EditUserRole';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/Redux/features/LoadingSlice';
import { FaUsers } from "react-icons/fa";

const page = () => {

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}
    const [users, setUsers] = useState<User[]>([])
    const [openAction, setOpenAction] = useState(false)
    const [updateUserRole, setUpdateUserRole] = useState({
        _id: "",
        email: "",
        name: "",
        role: "",
    })
    const dispatch = useDispatch()

    const fetchAllUsers = async () => {
        dispatch(setLoading(true))

        try {
            const fetchUser = await fetch('/api/allUsers',{
                method: 'GET',
                credentials: 'include',
            })
            const userResponse = await fetchUser.json()
            console.log('allUsers', userResponse)

            if(userResponse.success) {
                setUsers(userResponse.data)
                dispatch(setLoading(false))
            }

            if(userResponse.error) {
              console.log(userResponse.message)
              toast.error('Something went wrong!')
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchAllUsers()
    }, [])
    
    return (
        <>
        <div className='sm:my-5 my-2 sm:mx-5 mx-2 w-full bg-neutral-100 dark:bg-zinc-800 h-[calc(100vh-40px)] rounded-xl overflow-y-auto'>
            <span className='flex m-3 items-center gap-3'>
                <FaUsers className='text-3xl' />
            <h1 className='text-xl font-semibold'>REGISTERED USERS</h1>
            </span>
          <table className='w-full table-responsive text-left md:mt-5 mt-14'>
            <thead>
                <tr className='dark:bg-zinc-800 border-b border-[#505050]'>
                <th>SRN.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Actions</th>
                </tr>
            </thead>

          <tbody>
               {users?.map((el, index) => (
             <tr className='border-b border-[#505050]' key={el?._id}>
                <td label-as="SRN.">{index + 1}</td>
                <td label-as="Name">{el?.name}</td>
                <td label-as="Email">{el?.email}</td>
                <td label-as="Role">{el?.role}</td>
                <td label-as="Created Date">{moment(el?.createdAt).format('LL')}</td>
                <td label-as="Actions">
                    <div onClick={() => {
                     setOpenAction(true); setUpdateUserRole(el);
                    }}>
                        <div className='flex lg:justify-normal justify-end'>
                        <MdOutlineModeEdit className='bg-green-500 text-black dark:text-white size-6 rounded-full cursor-pointer'/>
                        </div>
                    </div>
                </td>
            </tr>
               ))}
            </tbody>
          </table>
        </div>

        <div>
            {openAction && <EditUserRole 
            onClose={() => setOpenAction(false)}
            callFunc={fetchAllUsers}
             _id={updateUserRole._id}
              name={updateUserRole.name}
               email={updateUserRole.email}
                role={updateUserRole.role}/>}
        </div>
        </>
    )
}

export default page