import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const baseQuery = fetchBaseQuery({
    // baseUrl: "https://backend.yourtradesource.com/api/v1",
    baseUrl: "https://kevin-backend-tau.vercel.app/api/v1",
    // baseUrl: "http://10.10.20.13:5000/api/v1",
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState()).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }); 




export const baseApi = createApi({
    reducerPath:"baseApi",
    baseQuery:baseQuery,
    tagTypes:["user", "home", "global", "interior", "exterior", "lawn-garden", "specialized", "articles", "referral", "membership"],
    endpoints:()=>({})
})

