import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserType {
  _id?: string;
  name?: string;
  email: string;
  role?: 'admin' | 'student' | string;
  status?: 'active' | 'pending' | string;
}

interface AuthState {
  loading: boolean | null;
  error: string | null;
  user: UserType | null;
}

const initialState: AuthState = {
  loading: null,
  error: null,
  user: null,
};

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    SetUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    Logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = null;
    },
  },
});

export default AuthSlice.reducer;
export const { SetUser, Logout } = AuthSlice.actions;
