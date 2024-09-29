"use client";

import { motion } from "framer-motion";
import React, { FormEvent, useEffect, useState } from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setLoading } from "@/Redux/features/LoadingSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Loader from "@/components/Loader";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const login = () => {
    const [passswordIcon, setPassswordIcon] = useState(false)
    const [confirmPassswordIcon, setConfirmPassswordIcon] = useState(false)

    const [data, setData] = useState<FormData>({
        name: '',
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const dispatch = useDispatch()
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setLoading(true))

        try {
            const response = await fetch('/api/userSignIn', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const userResponse: { message?: String, error?: String, success?: String } = await response.json()

            dispatch(setLoading(false))

            if (response.ok) {
                toast.success(userResponse.message || "Signed in successfully")
                router.push('/')
            }
            else {
                toast.error(userResponse.message || "Something went wrong!")
            }

        } catch (error) {
            console.log(error)
            dispatch(setLoading(false))
            toast.error("An unexpected error occurred, please try again.")
        }
    }

    const { data: session } = useSession();
  
    useEffect(() => {
      if (session) {
        router.push('/'); 
      }
    }, [session, router]);

    if (session) {
        return <Loader />;
      }

    return (
        <AuroraBackground>
            <Link href='/'>
                <div className='flex items-center gap-2 absolute sm:top-5 top-3 sm:left-5 left-3'>
                    <div className="border-4 border-blue-700 sm:size-12 size-8 rounded-full" />
                    <h1 className='font-extrabold sm:text-3xl text-2xl text-black-100 dark:text-slate-100'>Rivent</h1>
                </div>
            </Link>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="z-20"
            >
                <BackgroundGradient>
                    <form className="flex justify-center items-center bg-zinc-100 dark:bg-zinc-800 dark:text-slate-100 rounded-[22px] p-3 relative" onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full sm:min-w-[370px] max-w-[] sm:mt-14 mt-4">
                            <div>
                                <Image className="absolute -top-20" src='/GTpng.png' alt="GTpng" width={1000} height={1000} />
                            </div>
                            <label className="font-medium">Email</label>
                            <div className="flex items-center bg-slate-200 dark:bg-zinc-600 my-1 rounded-[22px]">
                                <MdOutlineMailOutline className="text-[32px] pl-3" />
                                <input className="outline-none w-full bg-transparent p-3" type="email" name="email" value={data.email} onChange={handleOnChange} placeholder="Email address" required />
                            </div>
                            <label className="font-medium">Password</label>
                            <div className="flex items-center bg-slate-200 dark:bg-zinc-600 my-1 rounded-[22px] cursor-pointer">
                                <CiLock className="text-[32px] pl-3" />
                                <input className="outline-none w-full bg-transparent p-3" type={passswordIcon ? "text" : "password"} name="password" value={data.password} onChange={handleOnChange} placeholder="Password" required />
                                <span onClick={() => setPassswordIcon((prev) => !prev)}>
                                    {
                                        passswordIcon ?
                                            <FaEyeSlash className="text-[32px] pr-3" /> : <FaEye className="text-[32px] pr-3" />
                                    }
                                </span>
                            </div>
                            <button className="bg-blue-600 font-bold text-slate-50 w-full rounded-[22px] py-3 my-2">Login In</button>

                            <Link href='/forgotPassword'>
                                <p className="text-xs text-red-400 text-right font-bold">forgot password?</p>
                            </Link>

                            <div className="flex items-center justify-center">
                                <div className="border-b-2 border-black-200 dark:border-white-200 w-32" />
                                <p className="text-center font-bold dark:text-slate-100">Or</p>
                                <div className="border-b-2 border-black-200 dark:border-white-200 w-32" />
                            </div>

                            <span className="border-2 dark:border-slate-200 w-full flex justify-center items-center py-1 my-2 rounded-[22px] gap-1 cursor-pointer" onClick={() => signIn('google')}>
                                <FcGoogle className="text-4xl cursor-pointer" />
                                <p className="text-blue-600 dark:text-blue-500 font-bold">Sign In using Google</p>
                            </span>

                            <p className="text-center text-sm my-2 font-semibold dark:text-slate-100">Don't have an account?
                                <Link className="hover:text-blue-700 dark:hover:text-blue-500" href='/signup'> SignUp</Link>
                            </p>
                        </div>
                    </form>
                </BackgroundGradient>
            </motion.div >
        </AuroraBackground>
        // xZ0curD5dOOJlC4q
    );
}

export default login;