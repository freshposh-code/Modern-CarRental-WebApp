'use client'

import { AdminSidebar } from '@/components/AdminPanel/AdminSidebar';
import Loader from '@/components/Client/Loader';
import { useAppSelector } from '@/Redux/hooks';
import {  useUserContext } from '@/context/UserContext';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function App({ children }: { children: React.ReactNode }) {
    const isLoading = useAppSelector(store => store.loadingSlice);
    const { user } = useUserContext();
    const { data: session } = useSession();

    useEffect(() => {
      const userRole = session?.user?.role || user?.role;
  
      if (userRole !== 'ADMIN') {
          toast.error("ACCESS DENIED!");
          window.location.href = '/';
      }
  }, [session, user]);
  
  
    return (
        <>
              <div className="bg-gray-300 dark:bg-zinc-700 flex">
              <AdminSidebar />
             {children}
               </div>
              {isLoading && <Loader />}
    </>
    )
    
}


export default App;