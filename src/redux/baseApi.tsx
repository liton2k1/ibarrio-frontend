import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
    }),

    tagTypes: ['Guide', 'Post', 'Auth'], // add tags for cache invalidation
    endpoints: () => ({}), // initial empty endpoints to be injected later
});
