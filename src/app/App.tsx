'use client';

import { BookingProvider } from '@/context/BookingContext';
import { UserProvider } from '@/context/UserContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { store } from '@/Redux/store';
import { Provider } from 'react-redux'

const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserProvider>
                 <BookingProvider>
            <WishlistProvider>
        <Provider store={store}>
            {children}
        </Provider>
          </WishlistProvider>
                </BookingProvider>
        </UserProvider>
    )
}

export default App