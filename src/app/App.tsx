'use client';

import { UserProvider } from '@/context/UserContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { store } from '@/Redux/store';
import { Provider } from 'react-redux'

const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserProvider>
            <WishlistProvider>
        <Provider store={store}>
            {children}
        </Provider>
        </WishlistProvider>
        </UserProvider>
    )
}

export default App