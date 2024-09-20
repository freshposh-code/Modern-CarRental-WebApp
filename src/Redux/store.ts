import { configureStore } from "@reduxjs/toolkit";
import { LoadingSlice } from "./features/LoadingSlice";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = {
    loadingSlice: LoadingSlice.reducer,
};

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
    });
};

// Define types for RootState and AppDispatch
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
