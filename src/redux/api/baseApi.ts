
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helpers/axiosBaseQuery";


// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL || "" }),
    endpoints: () => ({}),
    tagTypes: [],
});