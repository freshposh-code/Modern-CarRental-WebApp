'use client'

import { setLoading } from "@/Redux/features/LoadingSlice";
import { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useFlutterWave from "../utils/useFlutterwave";
import { useUserContext } from "./UserContext";

export type Item = {
  _id: string;
  carName: string;
  carImage: string[];
  startDate: string;
  endDate: string;
  price: string;
};

export type GetBookings = {
  _id: string;
  userId: string;
  name: string;
  carId: string;
  carName: string;
  carImg: string;
  price: number;  
  startDate: string;
  endDate: string;
  status: string;
  statusHistory: string[];  
}

 interface BookingContext {
  handleBooking: (data: Item) => Promise<void>;
  bookingData: Item | null; 
  setBookingData: (data: Item | null) => void;
  data: GetBookings[];
  clickBookings: boolean;
  setClickBookings: React.Dispatch<SetStateAction<boolean>>;
  countBookings: number;
  deleteBookings: (data: GetBookings) => Promise<void>;
  bookings: GetBookings[];
  updateBookingStatus: any;
  totalBookingsPrice: number;
  // handlePayment: (userEmail: string) => void;
}

const UserBookingContext = createContext<BookingContext | undefined>(undefined);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [bookingData, setBookingData] = useState<Item | null>(null);
    const [data, setData] = useState<GetBookings[]>([]);
    const [bookings, setBookings] = useState<GetBookings[]>([]);
    const [clickBookings, setClickBookings] = useState(false);
    const countBookings = data.length;
    const dispatch = useDispatch();

    const {user} = useUserContext();

    const { initiateFlutterWavePayment } = useFlutterWave();

    const transactionRef = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

  const handleBooking = async (data: Item) => {
    try {

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          carId: data._id,
          carName: data.carName,
          carImg: data.carImage[0],
          startDate: new Date(data.startDate).getTime(),
          endDate: new Date(data.endDate).getTime(),
          price: Number(data.price),
          transactionRef: transactionRef,
        }),
      });

      const dataApi = await res.json();
      console.log("Response from API:", dataApi);

      if (res.ok) {
        getBookings();
        toast.success("Car booked successfully!");

        setBookings((prev) => [...prev, dataApi.booking]);


        initiateFlutterWavePayment({
          amount: dataApi.booking.price,
          email: user?.email || "",
          tx_ref: transactionRef,
          onSuccess: () => {
            toast.success("Payment successful!");
          },
          onclose: () => {
            toast.warning("Payment modal closed.");
          },
        });
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error("Error in handleBooking:", error);
      toast.error("Something went wrong.");
    }
  };

  const getBookings = async () => {
    try {
      const response = await fetch('/api/getBookings', {
        method: 'GET',
        credentials: 'include',
      });
  
      const dataApi = await response.json();
  
      if(response.ok) {
        setData(dataApi.bookings || []);
      }
      else {
        console.error(dataApi.message)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBookings()
  }, []);

  const deleteBookings = async (BookingId: GetBookings) => {
    try {
      dispatch(setLoading(true));

      const deleteModal = await fetch(`/api/deleteBookings/${BookingId?._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
   
      const dataApi = await deleteModal.json();
      dispatch(setLoading(false));

      if(dataApi.success) {
        getBookings();
        toast.success(dataApi.message)
      }
      else{
        toast.error(dataApi.message)
      }

    } catch (error:any) {
      dispatch(setLoading(false));
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
  const getAllBookings = async () => {

    try {
      const fetchBookings = await fetch('/api/allBookings' ,{
        method:'GET',
        credentials: 'include',
      });

      const dataApi = await fetchBookings.json();

      dispatch(setLoading(false));
      
      if(dataApi.success) {
        setBookings(dataApi.bookings || []);
        console.log('allBookingsdata', dataApi.bookings)
      }

    } catch (error) {
      console.error(error);
    }
  }
  
    getAllBookings();
  }, [])

  const updateBookingStatus = async (bookingId:any, newStatus:any) => {
    try {
      const response = await fetch('/api/updateBooking', {
        method: 'PATCH',
        body: JSON.stringify({ 
          bookingId, 
          newStatus 
        })
      });

      const data = await response.json();

      if (data.success) {
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking._id === bookingId 
              ? { ...booking, status: newStatus }
              : booking
            )
        );
        toast.success("Booking status updated");
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Failed to update booking status");
    }
  };

  const totalBookingsPrice = data.reduce((total, booking) => total + Number(booking.price), 0);
  
  
  return (
    <UserBookingContext.Provider value={{ handleBooking , bookingData, setBookingData, data, clickBookings, setClickBookings, countBookings, deleteBookings, bookings, updateBookingStatus, totalBookingsPrice}}>
      {children}
    </UserBookingContext.Provider>
  );
}

export const useBookingContext:any = () => {
  const context = useContext(UserBookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider.");
  }
  return context;
};
