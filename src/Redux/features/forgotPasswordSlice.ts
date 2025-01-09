import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForgotPasswordState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string;
}

const initialState: ForgotPasswordState = {
  loading: false,
  success: false,
  error: null,
  message: '',
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    forgotPasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = true;
      state.message = action.payload;
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
