import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// What problem? The prompt "what problem" does not specify any actionable requirement or change.
// The original code functions as a standard RTK Query service for adding a product.

export const productApi = createApi({
  reducerPath: 'productApi',
    tagTypes: ["Product","aaa"],

  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (formData) => ({
        url: '/api/product/addproduct',
        method: 'POST',
        body: formData,

        
      }),
      invalidatesTags:["Product"]
    }),

    getProduct: builder.query({
      query: () => ({
        url: '/api/product/getproduct',
        method: 'GET',

      }),
      providesTags:["Product"]
    }),

    Addinfo: builder.mutation({
      query: (data) => ({
        url: '/api/cart/addcart',
        method: 'POST',
        body: data
      }),
      invalidatesTags:["aaa"]
    }),



    Getinfo:builder.query({
      query:()=>({
        url:"/api/cart/getcart",
        method:"GET",

      }),
      providesTags:["aaa"]
    }),

    Removeproduct: builder.mutation({
      query: (_id) => ({
        url: '/api/product/deleteproduct',
        method: 'DELETE',
        body: _id,
      }),
        invalidatesTags:["Product"]

    }),


    Getallcart:builder.query({
      query:()=>({
        url:"/api/cart/getallcart",
        method:"GET",

      }),
      providesTags:["aaa"]
    }),

    Managecart:builder.mutation({
      query:(data)=>({
        url:"/api/cart/managecart",
        method:"PUT",
        body:data

      }),
      invalidatesTags:["aaa"]
    }),
    // You can add more endpoints here as needed
  })
});

export const { useAddProductMutation,useGetProductQuery,useManagecartMutation ,useGetallcartQuery,useAddinfoMutation,useGetinfoQuery,useRemoveproductMutation} = productApi;
