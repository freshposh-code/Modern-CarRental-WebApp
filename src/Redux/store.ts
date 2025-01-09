import { configureStore } from "@reduxjs/toolkit";
import { LoadingSlice } from "./features/LoadingSlice";
import forgotPasswordReducer from './features/forgotPasswordSlice';
import resetPasswordReducer from './features/resetPasswordSlice';
import { createWrapper } from "next-redux-wrapper";

const rootReducer = {
    loadingSlice: LoadingSlice.reducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
};

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
    });
};

export const store = makeStore();

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
