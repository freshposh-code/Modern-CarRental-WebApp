'use client'

import type { AppProps } from "next/app";
import "@/app/globals.css";
import { ThemeProvider } from "@/Theme/theme-provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "@/components/Loader";
import { useAppSelector } from "@/Redux/hooks";
import { wrapper } from "@/Redux/store";
import SessionWrapper from "@/lib/SessionWrapper";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(pageProps);
    const isLoading = useAppSelector(store => store.loadingSlice);

    return (
        <>
        <UserProvider>
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
                toastStyle={{
                    backgroundColor: '#868686',
                    color: '#fff',
                    borderRadius: '22px',
                    fontSize: '14px',
                }}
            />
            </SessionWrapper>
            {isLoading && <Loader />}
            <Footer />
            </div>
            </UserProvider>
        </>
    );
}
export default wrapper.withRedux(App);
