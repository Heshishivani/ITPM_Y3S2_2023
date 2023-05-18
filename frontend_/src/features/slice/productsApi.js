import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/products"}),
    endpoints: (bulider) => ({
        getAllProducts: bulider.query({
            query: () => "products",
        })
    })
})

export const { useGetAllProductsQuery } = productsApi
