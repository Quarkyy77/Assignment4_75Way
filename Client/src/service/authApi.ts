import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "api/auth/login",
          method: "POST",
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: {
        Name: string;
        password: string;
        email: string;
        roles: string;
      }) => {
        return {
          url: "api/auth/register",
          method: "POST",
          body,
        };
      },
    }),

    UpdatePassword: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "api/user/updatePassword",
          method: "POST",
          body,
        };
      },
    }),
    ResetPassword: builder.mutation({
      query: (body: { password: string }) => {
        return {
          url: "api/user/reset-password/:token",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation,
} = authApi;
