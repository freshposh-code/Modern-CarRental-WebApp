import { AdminSidebar } from '@/components/AdminPanel/AdminSidebar';
import Loader from '@/components/Loader';
import { useAppSelector } from '@/Redux/hooks';
import { wrapper } from '@/Redux/store';
import { ThemeProvider } from '@/Theme/theme-provider'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App({ children }: { children: React.ReactNode }) {
    // const isLoading = useAppSelector(store => store.loadingSlice);
  
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
              <div className="bg-gray-300 flex h-screen">
              <AdminSidebar />
             {children}
               </div>
            </ThemeProvider>
            <ToastContainer
                position="top-center"
                toastStyle={{
                    backgroundColor: '#868686',
                    color: '#fff',
                    borderRadius: '22px',
                    fontSize: '14px',
                }}
            />
             {/* {isLoading && <Loader />} */}
    </>
    )
    
}


export default (App);