'use client'

import { useWishlist } from '@/context/WishlistContext';
import { displayCurrency } from '@/utils/displayCurrency';
import { useEffect, useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { MdCancel } from 'react-icons/md';

interface WishlistItem {
  _id: string;
  carName: string;
  carImage: string[];
  price: number;
};

const Wishlist = ({ callFunc, userId }: { callFunc: () => void; userId: string }) => {
  const [data, setData] = useState<WishlistItem[]>([]);
   const { removeFromWishlist, fetchWishlist } = useWishlist();

   useEffect(() => {
    const loadWishlist = async () => {
      const fetchedData = await fetchWishlist(userId);
      setData(fetchedData);
    };

    if (userId) loadWishlist();
  }, [userId, fetchWishlist]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if(e.target === e.currentTarget) {
      callFunc()
    }
  }

  return (
    <section className={`fixed blur-theme w-full h-full inset-0`} onClick={handleOverlayClick}>
      <div className="bg-white dark:bg-black xl:w-[25%] w-full h-screen absolute right-0 text-2xl overflow-auto rounded-l-[2rem]">
        <div className="flex justify-between items-center m-5">
          <h1 className="font-semibold text-lg">Wishlist</h1>
          <MdCancel className="bg-blue-700 rounded-full text-white cursor-pointer hover:scale-90" onClick={callFunc} />
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 place-content-center m-3">
            {data.map((item) => (
              <div key={item._id} className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-lg">
                <div className="flex justify-between items-center">
                  <h1 className="lg:text-sm text-xs font-bold">{item.carName}</h1>
                  <span onClick={() => removeFromWishlist(item._id)} className="text-sm cursor-pointer bg-gray-300 p-1 rounded-full">
                    <FcLike />
                  </span>
                </div>
                <span>
                  <img src={item.carImage[0]} alt="carImage" className="sm:w-24 w-20 h-20 m-auto flex justify-center object-contain" />
                </span>
                <p className="text-xs font-medium">{displayCurrency(item.price)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center my-72 md:text-lg text-base text-blue-800 dark:text-blue-700 font-bold">Add to your wishlist.</p>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
