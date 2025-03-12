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
import { FaRegHeart } from "react-icons/fa";
import Wishlist from './Wishlist';
import { useWishlist } from '@/context/WishlistContext';

export default function Navbar() {
    const { user, setUser } = useUserContext();
    const [open, setOpen] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const { data: session } = useSession();
    const { wishlistCount } = useWishlist();

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
            <nav className='flex justify-between items-center px-3 sm:py-0 py-4'>
                <Link href='/' className='flex items-center gap-2 z-[1000]'>
                    <div className="border-4 border-blue-700 sm:size-12 size-8 rounded-full" />
                    <h1 className='font-extrabold sm:text-3xl text-2xl'>Rivent</h1>
                </Link>

                <div className='lg:flex hidden gap-14 items-center'>
                    {navbar.map((items) => (
                        <div key={items.name}>
                          {items?.link ? (
                  <Link href={items.link}>
                        <li className="font-bold text-lg cursor-pointer hover:border-b-[3px] border-blue-600 duration-200">
                          {items.name}
                          </li>
                   </Link>
             ) : (
                 <li className="font-bold text-lg cursor-pointer text-gray-500">
                   {items.name}
                   </li>
             )}
                        </div>
                    ))}


                    <div className={`flex ${session?.user?.role === ROLE.ADMIN || user?.role === ROLE.ADMIN ? "gap-10" : "gap-10"} items-center`}>
                        <div>
                        <ModeToggle />
                        </div>

                        <div className="relative">
                        <div className="cursor-pointer text-2xl bg-white dark:bg-black p-2 rounded-full active:scale-110 transition-all duration-150" onClick={() => setOpenWishlist(true)}>
                        <FaRegHeart/>
                        </div>
                        {wishlistCount > 0 && (
                         <span className='bg-blue-700 text-white size-5 text-sm rounded-full flex items-center justify-center font-bold absolute -top-2 left-6'>{wishlistCount}</span>
                            )}
                         </div>

                         {(session?.user?.role === ROLE.ADMIN || user?.role === ROLE.ADMIN) &&
                        <Link href='/admin/dashboard'><span className='cursor-pointer'><MdAdminPanelSettings className='bg-white dark:bg-black p-2 text-[40px] rounded-full active:scale-110 transition-all duration-150' /></span>
                        </Link>
                    }
                    </div>

                    {(user || session) ? (
                        <button className='bg-black dark:bg-zinc-50 dark:text-black-100 text-white rounded-[33px] py-3 px-5 font-bold text-lg active:scale-110 transition-all duration-150' onClick={() => {logout(); signOut({ callbackUrl: '/login'});}}>Logout</button>

                    )
                        :
                        (
                            <Link href='/login'>
                                <button className='bg-black dark:bg-zinc-50 dark:text-black-100 text-white rounded-[33px] py-3 px-5 font-bold text-lg active:scale-110 transition-all duration-150'>Get Started</button>
                            </Link>
                        )
                    }

                </div>

                <div className="lg:hidden flex cursor-pointer text-xl bg-white dark:bg-black rounded-full p-1 z-[2000] absolute md:right-24 right-16" onClick={() => setOpenWishlist(true)}>
                    <FaRegHeart/>
                    </div>
                    {wishlistCount > 0 && (
                         <span className='bg-blue-700 text-white size-5 rounded-full lg:hidden flex items-center justify-center font-bold absolute md:right-20 right-14 md:top-5 top-1 text-xs z-[2000]'>{wishlistCount}</span>
                            )}

                <div className='lg:hidden flex text-2xl cursor-pointer' onClick={() => setOpen((prev) => !prev)}>
                    <div className='flex items-center gap-5 z-[2000]'>
                        {
                            open ? <AiOutlineClose /> : <RiMenu3Fill />
                        }
                    </div>


                    {/* *MOBILE NAV MENU */}
                    <div className={`${open ? 'left-0' : 'left-[-100%]'} lg:hidden flex flex-col gap-14 items-center justify-center absolute bg-white/75 inset-0 dark:bg-black/75 z-20 w-full h-screen duration-500`}>
                        {navbar.map((items) => (
                            <div key={items.name}>
                                <Link href={items.link}>
                                <li className='font-bold text-lg cursor-pointer'>{items.name}</li>
                                </Link>
                            </div>
                        ))}

                        <div className={`flex ${session?.user?.role === ROLE.ADMIN || user?.role === ROLE.ADMIN ? "gap-10" : "gap-0"} items-center`}>
                            <ModeToggle />

                            <Link href='/admin/dashboard'>
                                {(session?.user?.role === ROLE.ADMIN || user?.role === ROLE.ADMIN) &&
                                    <span className='text-3xl cursor-pointer active:scale-110 transition-all duration-150'><MdAdminPanelSettings /></span>}
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
               
            <div
            className={`fixed inset-0 z-[2000] transition-all duration-500 ease-in-out ${
                openWishlist ? "opacity-100 visible translate-x-0 duration-500"
            : "opacity-0 invisible lg:translate-x-16 duration-500"
              }`}>
            {
                openWishlist && <Wishlist callFunc={() => setOpenWishlist(false)} userId='user' />
            }
            </div>

        </section>
    )
}
