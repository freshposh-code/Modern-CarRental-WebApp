'use client';

import { UserProvider } from '@/context/UserContext';
import { store } from '@/Redux/store';
import { Provider } from 'react-redux'

const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserProvider>
        <Provider store={store}>
            {children}
        </Provider>
        </UserProvider>
    )
}

export default App