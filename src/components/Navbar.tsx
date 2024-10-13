'use client'

import Link from 'next/link'
import { MdAdminPanelSettings } from 'react-icons/md'
import { RiMenu3Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

// THEME EXPORT
import { ModeToggle } from '@/Theme/ThemeButton'

import { useUserContext } from '@/context/UserContext'
import ROLE from '@/common/role'
import { toast } from 'react-toastify'
import {  useState } from 'react'
import { signOut, useSession } from 'next-auth/react';
import { navbar } from '@/utils/Data';

export default function Navbar() {
    const { user, setUser } = useUserContext();
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();

    const logout = async () => {
        try {
            const response = await fetch('/api/userLogout')
            const userResponse = await response.json()
            
            if (response.ok) {
                setUser(null)
                window.location.href = '/login';
                toast.success(userResponse.message || "Logged out successfully")
            }
        } catch (error) {
            console.log("Error logging out", error);
        }
    };

    return (
        <section className='sm:p-[19px] p-0'>
            <nav className='flex justify-between items-center sm:px-0 px-3 sm:py-0 py-4'>
                <div className='flex items-center gap-2 z-[1000]'>
                    <div className="border-4 border-blue-700 sm:size-12 size-8 rounded-full" />
                    <h1 className='font-extrabold sm:text-3xl text-2xl'>Rivent</h1>
                </div>

                <div className='lg:flex hidden gap-14 items-center'>
                    {navbar.map((items) => (
                        <div key={items.name}>
                            <li className='font-bold text-lg cursor-pointer hover:border-b-[3px] border-[#4258ffe1] duration-200'>{items.name}</li>
                        </div>
                    ))}


                    <div className={`flex ${session?.user?.role === ROLE.ADMIN || user?.role === ROLE.ADMIN ? "gap-10" : "gap-0"} items-center`}>
                        <ModeToggle />

                         {(session?.user?.role === ROLE.ADMIN || user?.role === ROLE.ADMIN) &&
                        <Link href='/admin/dashboard'><span className='text-3xl cursor-pointer'><MdAdminPanelSettings /></span>
                        </Link>
                    }
                    </div>

                    {(user || session) ? (
                        <button className='bg-black dark:bg-zinc-50 dark:text-black-100 text-white rounded-[33px] py-3 px-5 font-bold text-lg' onClick={() => {logout(); signOut({ callbackUrl: '/login'});}}>Logout</button>

                    )
                        :
                        (
                            <Link href='/login'>
                                <button className='bg-black dark:bg-zinc-50 dark:text-black-100 text-white rounded-[33px] py-3 px-5 font-bold text-lg'>Get Started</button>
                            </Link>
                        )
                    }

                </div>
                <div className='lg:hidden flex text-2xl cursor-pointer' onClick={() => setOpen((prev) => !prev)}>
                    <span className='z-[2000]'>
                        {
                            open ? <AiOutlineClose /> : <RiMenu3Fill />
                        }
                    </span>

                    {/* *MOBILE NAV MENU */}
                    <div className={`${open ? 'left-0' : 'left-[-100%]'} lg:hidden flex flex-col gap-14 items-center justify-center absolute bg-white/75 inset-0 dark:bg-black/75 z-20 w-screen h-screen duration-500`}>
                        {navbar.map((items) => (
                            <div key={items.name}>
                                <li className='font-bold text-lg cursor-pointer'>{items.name}</li>
                            </div>
                        ))}

                        <div className={`flex ${session?.user?.role === ROLE.ADMIN || user?.role === ROLE.ADMIN ? "gap-10" : "gap-0"} items-center`}>
                            <ModeToggle />

                            <Link href='/admin/dashboard'>
                                {(session?.user?.role === ROLE.ADMIN || user?.role === ROLE.ADMIN) &&
                                    <span className='text-3xl cursor-pointer'><MdAdminPanelSettings /></span>}
                            </Link>
                        </div>

                        {(user || session) ? (
                            <button className='bg-black dark:bg-zinc-50 dark:text-black-100 text-white rounded-[33px] py-3 px-5 font-bold text-lg' onClick={() => {logout(); signOut({ callbackUrl: '/login'});}}>Logout</button>
                        )
                            :
                            (
                                <Link href='/login'>
                                    <button className='bg-black dark:bg-zinc-50 dark:text-black-100 text-white rounded-[33px] py-3 px-5 font-bold text-lg'>Get Started</button>
                                </Link>
                            )
                        }

                    </div>
                </div>
            </nav>

        </section>
    )
}
