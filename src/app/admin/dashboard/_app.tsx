import { ThemeProvider } from '@/Theme/theme-provider'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function _app({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
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
        </div>
    )
}
