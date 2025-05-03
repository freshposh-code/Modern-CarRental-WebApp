'use client'

import type { AppProps } from "next/app";
import "@/app/globals.css";
import { ThemeProvider } from "@/Theme/theme-provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "@/components/Client/Loader";
import { useAppSelector } from "@/Redux/hooks";
import { wrapper } from "@/Redux/store";
import SessionWrapper from "@/lib/SessionWrapper";
import Footer from "@/components/Client/Footer";
import { UserProvider } from "@/context/UserContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { BookingProvider } from "@/context/BookingContext";
import BookingButton from "@/components/Client/BookingButton";
import { useRouter } from "next/router";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const { props } = wrapper.useWrappedStore(pageProps);
    const isLoading = useAppSelector(store => store.loadingSlice);
    
    return (
        <>
            <UserProvider>
                <WishlistProvider>
                    <BookingProvider>
                        <AppContent 
                            Component={Component} 
                            props={props} 
                            session={session} 
                            isLoading={isLoading}
                        />
                    </BookingProvider>
                </WishlistProvider>
            </UserProvider>
        </>
    );
}


function AppContent({ Component, props, session, isLoading }: {
    Component: any;
    props: any;
    session: any;
    isLoading: boolean;
}) {
    const router = useRouter();
    const hideComponents = ["/login", "/signup"].includes(router.pathname);
    return (
        <>
            <div className="bg-zinc-100 dark:bg-zinc-900">
                <SessionWrapper session={session}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Component {...props} />
                    </ThemeProvider>

 <ToastContainer
    position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{
        width: 'auto',
        maxWidth: '350px' 
      }}
      toastStyle={{
        backgroundColor: '#868686',
        color: '#fff',
        borderRadius: '22px',
        padding: '10px 15px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
        width: 'fit-content',
        minWidth: '200px',  
        maxWidth: '300px'  
      }}
    />
                </SessionWrapper>
                {isLoading && <Loader />}
                {!hideComponents && <Footer />}
            </div>
          {!hideComponents && 
          
          <div className="sticky bottom-5">
          <BookingButton />
          </div>
          }
        </>
    );
}

export default wrapper.withRedux(App);