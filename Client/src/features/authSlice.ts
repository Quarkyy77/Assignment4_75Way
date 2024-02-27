import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
export interface AuthState {
  name: string | null;
  userAuthToken: string | null;
  userRefreshToken: string | null;
  roles: string | null;
}

const initialState: AuthState = {
  name: null,
  roles: null,
  userAuthToken: null,
  userRefreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        name: string;
        userAuthToken: string;
        userRefreshToken: string;
        roles: string;
      }>
    ) => {
      state.name = action.payload.name;
      state.userAuthToken = action.payload.userAuthToken;
      state.userRefreshToken = action.payload.userRefreshToken;
      state.roles = action.payload.roles;
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.name,
          userAuthToken: action.payload.userAuthToken,
          userRefreshToken: action.payload.userRefreshToken,
          role: action.payload.roles,
        })
      );
    },
    logout: (state) => {
      localStorage.clear();
      state.name = null;
      state.userAuthToken = null;
      state.userRefreshToken = null;
      state.roles = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
