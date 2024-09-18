import type { AppProps } from "next/app";
import "@/app/globals.css"
import { ThemeProvider } from "@/Theme/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
