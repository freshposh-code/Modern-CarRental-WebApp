'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useRouter } from 'next/router';
import { resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess } from '@/Redux/features/resetPasswordSlice';
import { BackgroundGradient } from '@/components/ui/background-gradient';

const resetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const dispatch = useDispatch();
    const resetPasswordState = useSelector((state:any) => state.resetPassword);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [confirmPasswordOpen, setConfirmPasswordOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const { token } = router.query;
        if (token && typeof token === 'string') {
            setToken(token);
        }
    }, [router.query]);

    const handleResetPassword = async (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            dispatch(resetPasswordFailure("Passwords do not match"));
            return;
        }

        dispatch(resetPasswordRequest());

        try {
            const response = await fetch('/api/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(resetPasswordSuccess(data.message));
            } else {
                dispatch(resetPasswordFailure(data.message));
            }
        } catch (error:any) {
            dispatch(resetPasswordFailure(error.message));
        }
    };

    return (
        <section>
            <div className='flex flex-col justify-center min-h-[100vh] items-center'>
                 <h1 className='font-bold text-2xl absolute top-5 text-black dark:text-zinc-300'>Reset Password</h1>
                <form onSubmit={handleResetPassword} className='flex flex-col max-w-xl w-full my-3 p-2'>
                    <div className="py-2">
                    <BackgroundGradient className='flex justify-between items-center border bg-white rounded-3xl'>
                        <input
                            type={passwordOpen ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            className='outline-none px-3 w-full bg-transparent'
                        />
                        <div className='cursor-pointer text-xl p-2' onClick={() => setPasswordOpen(prev => !prev)}>
                         {passwordOpen ? <FaEyeSlash /> : <FaEye /> }
                        </div>
                    </BackgroundGradient>
                    </div>

                    <BackgroundGradient>
                        <div className='flex justify-between items-center w-full border bg-white rounded-3xl'>
                        <input
                            type={confirmPasswordOpen ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            className='outline-none px-3 bg-transparent'
                        />
                        <div className='cursor-pointer text-xl p-2' onClick={() => setConfirmPasswordOpen(prev => !prev)}>
                            {confirmPasswordOpen ? <FaEyeSlash /> : <FaEye /> }
                        </div>
                        </div>
                    </BackgroundGradient>

                    <button className='bg-blue-600 w-fit m-auto px-5 py-2 text-white font-bold rounded-md hover:bg-blue-400 my-2' type="submit">Submit</button>
                </form>
                {resetPasswordState && resetPasswordState.loading && <p>Loading... Please wait</p>}
                {resetPasswordState && resetPasswordState.success && <p className='text-green-700 font-bold text-lg'>{resetPasswordState.message}</p>}
                {resetPasswordState && resetPasswordState.error && <p className='text-red-700 font-bold text-lg'>{resetPasswordState.error}</p>}
            </div>
        </section>
    );
};

export default resetPassword;