'use client'

import { GetBookings, useBookingContext } from "@/context/BookingContext";
import ShowBookings from "@/components/Client/ShowBookings";
import { IoCarSportSharp } from "react-icons/io5";
import { useState } from "react";

export default function BookingButton() {
    const { setClickBookings, clickBookings, data, countBookings } = useBookingContext();
    const [selectedItem, setSelectedItem] = useState<GetBookings | null>(null);

    return (
        <>

        <div className={`absolute bottom-0 right-3 cursor-pointer z-[2000] ${clickBookings ? 'hidden' : 'flex'}`}>
                <div 
                    className="bg-blue-600/65 text-white size-12 rounded-full text-2xl flex justify-center items-center active:scale-110 transition-all duration-150 relative" 
                    onClick={() => setClickBookings((prev:any) => !prev)}
                >
                    <IoCarSportSharp />
                </div>
                <span className="absolute top-1 left-1 bg-zinc-100 dark:bg-zinc-900 dark:text-white text-black size-4 text-[12px] text-center font-extrabold rounded-full">{countBookings}</span>
            </div>

            <div
            className={`fixed inset-0 z-50 transition-transform duration-500 ease-in-out ${
                clickBookings ? "opacity-100 visible translate-y-0 duration-500"
            : "opacity-0 invisible translate-y-8 duration-500"
              }`}>
                {clickBookings && (
                    <ShowBookings  
                        setState={() => setClickBookings(false)} 
                        data={data}  
                        countBookings={countBookings} 
                        item={selectedItem || undefined} 
                        setSelectedItem={setSelectedItem}
                    />
                )}
            </div>
        </>
    );
}