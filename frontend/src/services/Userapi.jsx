import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: "https://e-commerce-backend-k2a0.onrender.com",credentials:"include" }),
  endpoints: (builder) => ({
    Register: builder.mutation({
      query: (data) => ({
        url: "/api/user/register",
        method: "POST",
        body: data,
      }),
    }),

     Login: builder.mutation({
      query: (data) => ({
        url: "/api/user/login",
        method: "POST",
        body: data,
      }),
    }),
     
    // Add more endpoints as needed
  }),
});

export const {useRegisterMutation,useLoginMutation  } = userApi;
