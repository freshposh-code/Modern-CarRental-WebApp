import { GetBookings, useBookingContext } from "@/context/BookingContext";
import { useUserContext } from "@/context/UserContext";
import { displayCurrency } from "@/utils/displayCurrency";
import useFlutterWave from "@/utils/useFlutterwave";
import { useSession } from "next-auth/react";
import React, { SetStateAction } from "react";
import { MdCancel } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";


const ShowBookings = ({ setState, data, countBookings, item, setSelectedItem}: { setState: React.Dispatch<SetStateAction<false>>; data: GetBookings[]; countBookings: number; item?: GetBookings; setSelectedItem: React.Dispatch<React.SetStateAction<GetBookings | null>>;}) => {

  const { deleteBookings, totalBookingsPrice } = useBookingContext();

  const handleBookingClick = () => {
    deleteBookings(item);
  };

  const handleSelectBooking = (_id: GetBookings) => {
    setSelectedItem(_id);
  };
  

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setState(false);
    }
};

  const statusColors: any = {
    pending: 'text-white bg-gray-600 animate-pulse',
    confirmed: 'text-green-500 bg-green-100',
    in_progress: 'text-blue-500 bg-blue-100',
    completed: 'text-indigo-500 bg-indigo-100',
    cancelled: 'text-red-500 bg-red-100'
  };

    const { initiateFlutterWavePayment } = useFlutterWave();
  
    const { user } = useUserContext();
  
    // const currentRate = 1500;
  
    // const calTotalBookingPrice = totalBookingsPrice * currentRate;

    const transactionRef = `BOOK-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    const { data: session } = useSession();

  const handlePayment = () => {
    if (!user?.email) {
      toast.error("User email is required for payment.");
      return;
    }

    const userEmail = session?.user?.email || user?.email;
  
    if (!userEmail) {
      toast.error("User email is required for payment.");
      return;
    }

    initiateFlutterWavePayment({
      email: userEmail,
      tx_ref: transactionRef,
      amount: totalBookingsPrice,
      onSuccess: () => {
        toast.success("Payment Successful!");
      },
      onclose: () => {
        toast.warning("Payment modal closed.");
      },
    });
  };

  return (
    <div 
    className={`fixed inset-0 z-50`}
    >
      <div 
         onClick={handleOverlayClick}
          className={`absolute inset-0 bg-black/45`}
 />
      
      <div
        className={`absolute bottom-0 right-0 w-full lg:w-[25%] h-[52%] lg:h-full 
          bg-white/95 dark:bg-black/85
          rounded-t-[2rem] md:rounded-tr-none md:rounded-l-[2rem]
          `}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Bookings ({countBookings})</h2>

          <div className="p-2 py-1 md:hidden flex">
              <p className="font-semibold text-sm">(Total: {displayCurrency(totalBookingsPrice)})</p>
          </div>

          <div
            onClick={() => setState(false)}><MdCancel /></div>
        </div>

        {data.length === 0 ? 
      (
        <div className="flex flex-col justify-center items-center min-h-full -mt-20">
        <h1 className="font-bold text-sm">No bookings yet!</h1>
        <p className="font-semibold text-xs">Start by selecting a car to rent.✅</p>
        </div>
      ) 
      :
      (
          <div className="place-content-center">
            <div className="lg:h-[32rem] md:h-[22rem] h-[18rem] grid sm:grid-cols-2 md:grid-cols-3 grid-cols-2 lg:grid-cols-2 overflow-auto scrollbar-none">
            {data.map((item) => (
                <div key={item._id} className="p-2" onClick={() => handleSelectBooking(item)}>
                    <div className="bg-white-200 dark:bg-zinc-800 p-2 rounded-t-3xl">
                        <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-xs line-clamp-1">{item?.carName}</h1>
                    <p className={`${statusColors[item.status]} font-bold rounded-full md:px-3 px-2 py-1 md:text-[10px] text-[9px]`}>{item?.status}</p>
                    </div>
                    <img src={item?.carImg} alt="car" className="w-24 h-28 object-contain m-auto" />
                    <div className="flex justify-between items-center">
                    <p className="text-xs font-medium"> {displayCurrency(item?.price)}</p>
                    <span className="text-xs text-red-500 bg-white p-[2px] rounded-full cursor-pointer active:scale-110" onClick={handleBookingClick}><MdDelete /></span>
                    </div>
                    </div>
                </div>
            ))}
            </div>
            <div className="p-2 py-1 md:flex hidden relative">
              <p className="absolute right-2 font-semibold">Bookings Total: {displayCurrency(totalBookingsPrice)}</p>
          </div>
            </div>
            
          )}

          {data.length > 0 &&
          <button
          onClick={handlePayment}
          className="absolute bottom-4 right-0 left-0 bg-blue-600 px-5 py-1 rounded-[33px] hover:bg-blue-500 text-white w-fit m-auto font-bold cursor-pointer duration-150">
          Complete Your Booking</button>
          }
      </div>
    </div>
  );
};

export default ShowBookings;