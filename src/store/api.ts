import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7186";


export const api= createApi({
    baseQuery:fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include"
    }),
    tagTypes:["User"],
    endpoints: (builder) => ({
        
    }),

})
