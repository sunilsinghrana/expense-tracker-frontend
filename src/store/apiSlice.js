import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "https://expense-tracker-6nw4.onrender.com";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      query: () => "/api/categories",
      providesTags: ['categories']
    }),

    // get labels
    getLabels: builder.query({
      query: () => "/api/labels",
      providesTags: ['transaction']
    }),
    
    // add new transaction
    addTransaction: builder.mutation({
        query: (initialTransaction) => ({
            url: "/api/transaction",
            method: "POST",
            body: initialTransaction,
        }),
        invalidatesTags: ['transaction']
    }),
    
    // delete record
    deleteTransaction: builder.mutation({
        query: (recordId) => ({
            url: "/api/transaction",
            method: "DELETE",
            body: recordId,
        }),
        invalidatesTags: ['transaction']
    }),
  }),
});

export default apiSlice;
