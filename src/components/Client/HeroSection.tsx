import { TextGenerateEffect } from '../ui/text-generate-effect';
import { TypeEffect } from '../ui/typewriter-effect';
import { MdCalendarMonth, MdOutlineLocationOn } from 'react-icons/md';
import { PiMapPinSimpleAreaFill } from "react-icons/pi";
import Image from 'next/image';
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/motion';

export default function HeroSection() {
    const words = `The Best Platform for Car Rental`;

    const typeWord = `We open the door for you to explore the world in comfort and style. Being your trusted travel partner.`;

    return (
        <>
            <section>
                <div className='sm:mt-16 mt-20'>
                    <TextGenerateEffect words={words} />
                </div>
                <div>
                    <TypeEffect words={typeWord} />
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={fadeIn('down', 'tween', 0.70, 0.75)}
                    viewport={{once: true, amount: 0.25}}
                    className='bg-white dark:bg-zinc-900 w-fit flex xl:flex-row flex-col justify-center items-center m-auto my-7 gap-10 p-7 rounded-[50px]'>
                    <div className='flex items-center gap-4'>
                        <div>
                            <MdOutlineLocationOn className='text-2xl' />
                        </div>
                        <div>
                            <h1 className='font-bold sm:text-lg text-base'>Where</h1>
                            <p className='font-bold text-gray-500'>City or Destination</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div>
                            <MdCalendarMonth className='text-2xl' />
                        </div>
                        <div>
                            <h1 className='font-bold sm:text-lg text-base'>Pickup</h1>

                            <div className='flex gap-3 font-bold text-gray-500'>
                                <select className='dark:bg-zinc-800'>
                                    <option>Date</option>
                                </select>
                                <select className='dark:bg-zinc-800'>
                                    <option>Time</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div>
                            <MdCalendarMonth className='text-2xl' />
                        </div>
                        <div>
                            <h1 className='font-bold sm:text-lg text-base'>DropOff</h1>

                            <div className='flex gap-3 font-bold text-gray-500'>
                                <select className='dark:bg-zinc-800'>
                                    <option>Date</option>
                                </select>
                                <select className='dark:bg-zinc-800'>
                                    <option>Time</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <PiMapPinSimpleAreaFill className='text-6xl bg-blue-700 text-white p-4 rounded-full' />
                </motion.div>

                <motion.div
                 initial="hidden"
                 whileInView="show"
                 variants={fadeIn('up', 'tween', 0.70, 0.75)}
                 viewport={{once: true, amount: 0.25}}
                className="flex justify-center items-center md:-mt-[8.4rem] -mt-[3rem]">
                    <img src='/sideView.png' alt='carSideView' width={1000} height={1000} className="w-[1000px] object-contain" />
                </motion.div>
            </section>
        </>
    )
}

