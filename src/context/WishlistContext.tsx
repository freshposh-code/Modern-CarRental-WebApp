// context/WishlistContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Item = {
    _id: string;
    carName: string;
    carImage: string[];
    price: number;
  };

interface WishlistContextType {
  likedItems: { [key: string]: boolean };
  toggleWishlist: (item: Item) => Promise<void>;
  removeFromWishlist: (itemId: string) => Promise<void>;
  fetchWishlist: (userId: string) => Promise<Item[]>;
  wishlistCount: number; 
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const wishlistCount = Object.keys(likedItems).length;

  useEffect(() => {
    const storedLikedItems = localStorage.getItem("likedItems");
    if (storedLikedItems) {
      setLikedItems(JSON.parse(storedLikedItems));
    }
  }, []);

  const toggleWishlist = async (item:Item) => {

    try {
      const storedUserId = localStorage.getItem("userId");
      const storageKey = getUniqueStorageKey(storedUserId);
  
      const response = await fetch(`/api/userWishlist`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carName: item.carName,
          carImage: item.carImage,
          price: item.price,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const updatedItems = { ...likedItems };
      
        if (data.action === "added") {
          updatedItems[item._id] = true;
          toast.success(`${item?.carName} added to wishlist`);
        } else if (data.action === "removed") {
          delete updatedItems[item._id];
          toast.success(`${item?.carName} removed from wishlist`);
        }
      
        setLikedItems(updatedItems);
        localStorage.setItem(storageKey, JSON.stringify(updatedItems));

      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error toggling wishlist item:", error);
      toast.error("Failed to update wishlist");
    }
  };

  const getUniqueStorageKey = (userId:any) => {
    return userId ? `wishlist_${userId}` : `wishlist_guest`;
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); 
    const storageKey = getUniqueStorageKey(storedUserId);
  
    const storedWishlist = localStorage.getItem(storageKey);
    if (storedWishlist) {
      setLikedItems(JSON.parse(storedWishlist));
    } else {
      setLikedItems({});
    }
  }, []);

  const fetchWishlist = async (userId: string): Promise<Item[]> => {
    try {
      const response = await fetch('/api/usersWishlist', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
      });

      const dataApi = await response.json();
      console.log("Response from wishlist API:", dataApi);

      if (response.ok) {
        return dataApi?.wishlist || [];
      } else {
        toast.error(dataApi.message || "Failed to fetch wishlist");
        return [];
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Something went wrong");
      return [];
    }
  };

const removeFromWishlist = async (itemId: string) => {
  try {
    const response = await fetch(`/api/deleteWishlist?id=${itemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      const updatedItems = { ...likedItems };
      delete updatedItems[itemId];
      setLikedItems(updatedItems);

      // Update localStorage
      const storedUserId = localStorage.getItem("userId");
      const storageKey = getUniqueStorageKey(storedUserId);
      localStorage.setItem(storageKey, JSON.stringify(updatedItems));

      toast.success(data.message || 'Item removed from wishlist');
    } else {
      toast.error(data.message || 'Error removing item');
    }
  } catch (error) {
    console.error('Error removing wishlist item', error);
    toast.error('Failed to remove item from wishlist');
  }
};


  return (
    <WishlistContext.Provider value={{ likedItems, toggleWishlist, removeFromWishlist, fetchWishlist, wishlistCount  }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider.');
  }
  return context;
};
