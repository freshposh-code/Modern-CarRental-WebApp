'use client'

import { AuroraBackground } from '@/components/ui/aurora-background'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordFailure, forgotPasswordRequest, forgotPasswordSuccess } from '@/Redux/features/forgotPasswordSlice';

export default function forgotPassword() {
    const [email, setEmail] = useState('');
    const forgotPasswordState = useSelector((state:any) => state.forgotPassword);
    const dispatch = useDispatch();

    const handleForgotPassword = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(forgotPasswordRequest());

        try {
            const response = await fetch('/api/forgetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(forgotPasswordSuccess(data.message));
            } else {
                dispatch(forgotPasswordFailure(data.message));
            }
        } catch (error:any) {
            dispatch(forgotPasswordFailure(error.message));
        }
    };

    return (
        <AuroraBackground>
            <div className='flex flex-col justify-center min-h-[100vh] items-center text-black-100 dark:text-white-200 relative'>
            <h1 className='font-bold text-2xl absolute top-5 text-black dark:text-zinc-300'>Forgot Password?</h1>
                <p className='sm:text-xl text-sm font-bold'>Please enter your email address below.</p>
                <p className='sm:text-base text-xs font-semibold'>We'll send you a link to reset your password.</p>
                    <form className='flex flex-col w-full max-w-xl py-2' onSubmit={handleForgotPassword}>
                <BackgroundGradient>
                    <input
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className='outline-none w-full rounded-3xl py-2 px-3 sm:text-sm text-xs'
                    />
                </BackgroundGradient>
                    <button className='bg-blue-600 w-fit m-auto px-5 py-2 my-3 text-white font-bold rounded-md hover:bg-blue-400 lg:text-base text-sm' type="submit">Submit</button>
                    </form>
                {forgotPasswordState && forgotPasswordState.loading && <p>Loading... Please wait</p>}
                {forgotPasswordState && forgotPasswordState.success && <p className='text-green-700 font-bold text-lg'>{forgotPasswordState.message}</p>}
                {forgotPasswordState && forgotPasswordState.error && <p className='text-red-700 font-bold text-lg'>{forgotPasswordState.error}</p>}
            </div>
        </AuroraBackground>
    )
}
