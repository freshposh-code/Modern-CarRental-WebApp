"use client";

import { motion } from "framer-motion";
import React, { FormEvent, useEffect, useState } from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock, CiUser } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setLoading } from "@/Redux/features/LoadingSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { signIn, useSession } from 'next-auth/react';
import Loader from "@/components/Client/Loader";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignIn = () => {
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
    console.log(data)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(setLoading(true));

        try {
            if (data.password.length < 8) {
                toast.error("Password must be at least 8 characters long");
                dispatch(setLoading(false));
                return;
            }

            if (data.password !== data.confirmPassword) {
                toast.error("Passwords do not match");
                dispatch(setLoading(false));
                return;
            }

            const response = await fetch("/api/userSignUp", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData: { message: string; success?: boolean; error?: boolean } =
                await response.json();

            dispatch(setLoading(false));

            if (response.ok) {
                router.push('/login')
                toast.success(responseData.message || "Account created successfully!");
            } else {
                toast.error(responseData.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            dispatch(setLoading(false));
            toast.error("An unexpected error occurred, please try again.");
        }
    };

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
                <div className='flex items-center gap-2 absolute top-5 left-5'>
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
                    <form className="flex justify-center items-center bg-zinc-50 dark:bg-zinc-800 dark:text-slate-100 rounded-[22px] p-3 relative" onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full sm:min-w-[370px] max-w-[] sm:mt-14 mt-4">
                            <div>
                                <Image className="absolute -top-20" src='/GTpng.png' alt="GTpng" width={1000} height={1000} />
                            </div>
                            <label className="font-medium">Name</label>
                            <div className="flex items-center bg-slate-200 dark:bg-zinc-600 my-[6px] rounded-[22px]">
                                <CiUser className="text-[32px] pl-3" />
                                <input className="outline-none w-full bg-transparent p-3" type="text" name="name" value={data.name} onChange={handleOnChange} placeholder="Your name" required />
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
                            <label className="font-medium">Confirm password</label>
                            <div className="flex items-center bg-slate-200 dark:bg-zinc-600 my-1 rounded-[22px] cursor-pointer">
                                <CiLock className="text-[32px] pl-3" />
                                <input className="outline-none w-full bg-transparent p-3" type={confirmPassswordIcon ? "text" : "password"} name="confirmPassword" value={data.confirmPassword} onChange={handleOnChange} placeholder="confirmPassword" required />
                                <span onClick={() => setConfirmPassswordIcon((prev) => !prev)}>
                                    {
                                        confirmPassswordIcon ?
                                            <FaEyeSlash className="text-[32px] pr-3" /> : <FaEye className="text-[32px] pr-3" />
                                    }
                                </span>
                            </div>
                            <button className="bg-blue-600 font-bold text-slate-50 w-full rounded-[22px] py-3 my-2">Sign Up</button>

                            <div className="flex items-center justify-center">
                                <div className="border-b-2 border-black-200 dark:border-white-200 w-32" />
                                <p className="text-center font-bold dark:text-slate-100">Or</p>
                                <div className="border-b-2 border-black-200 dark:border-white-200 w-32" />
                            </div>

                            <span className="border-2 dark:border-slate-200 w-full flex justify-center items-center py-1 my-2 rounded-[22px] gap-1 cursor-pointer" onClick={() => signIn('google')}>
                                <FcGoogle className="text-4xl cursor-pointer" />
                                <p className="text-blue-600 dark:text-blue-500 font-bold">Sign up using Google</p>
                            </span>

                            <p className="text-center text-sm my-2 font-semibold dark:text-slate-100">Already member?
                                <Link className="hover:text-blue-700 dark:hover:text-blue-500" href='/login'> Login</Link>
                            </p>
                        </div>
                    </form>
                </BackgroundGradient>
            </motion.div >
        </AuroraBackground>
    );
}

export default SignIn;
