import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResetPasswordState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string;
}

const initialState: ResetPasswordState = {
  loading: false,
  success: false,
  error: null,
  message: '',
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetPasswordRequest(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    resetPasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = true;
      state.message = action.payload;
    },
    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
