'use client'

import { useBookingContext } from '@/context/BookingContext';
import { displayCurrency } from '@/utils/displayCurrency';
import { IoBookSharp } from 'react-icons/io5';

interface BOOKINGS {
    _id: string;
    userId: string;
    carId: string;
    carName: string;
    carImg: string;
    price: number;  
    startDate: string;
    endDate: string;
    status: string;
    statusHistory: string[];  
}

const page = () => {

    const {bookings, updateBookingStatus} = useBookingContext();

    const statusColors: any = {
        pending: 'text-yellow-500 bg-yellow-100 animate-pulse',
        confirmed: 'text-green-500 bg-green-100',
        in_progress: 'text-blue-500 bg-blue-100',
        completed: 'text-indigo-500 bg-indigo-100',
        cancelled: 'text-red-500 bg-red-100',
        rejected: 'text-gray-500 bg-gray-100'
      };

    return (
        <div className="p-3 bg-white dark:bg-zinc-800 rounded-lg sm:my-5 my-2 sm:mx-5 mx-2 w-full h-[calc(100vh-40px)] overflow-auto">
          <h2 className="text-2xl font-bold flex items-center md:gap-3 gap-1"> <IoBookSharp/> Booking Management</h2>
          
          <div className="w-full">
            <table className="w-full table-responsiveII md:mt-5 mt-14">
              <thead>
                <tr className="bg-gray-100 dark:bg-zinc-900 rounded-xl font-bold">
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Car</th>
                  <th className="p-3 text-left">Dates</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Payment</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking: any) => (
                  <tr key={booking._id} className="border-b">
                    <td label-as='User' className="p-3 font-semibold">{booking.userId.name}</td>
                    <td label-as='car' className="p-3">{booking.carName}</td>
                    <td label-as='Date' className="p-3">
                      {new Date(booking.startDate).toLocaleDateString()} - 
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td label-as='Price' className="p-3">{displayCurrency(booking.price)}</td>

                    <td className='p-3'>
                    {booking.paymentStatus === "Paid" ? (
                  <span className="text-green-200 font-bold">Paid✅</span>
                ) : (
                  <span className="text-red-200 font-bold">Not Paid❌</span>
                )}
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-1 rounded font-semibold ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>

                    <td className="p-3">
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                        className="p-2 border rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default page