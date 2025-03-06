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

        <div className={`sticky bottom-5 top-5 m-4 float-right cursor-pointer z-[2000] ${clickBookings ? 'hidden' : 'flex'}`}>
                <div 
                    className="bg-blue-600/65 text-white size-12 rounded-full text-2xl flex justify-center items-center" 
                    onClick={() => setClickBookings((prev:any) => !prev)}
                >
                    <IoCarSportSharp />
                </div>
            </div>

            <div>
                {clickBookings && (
                    <ShowBookings 
                        state={clickBookings} 
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