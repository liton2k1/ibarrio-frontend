/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

export interface Step {
    _id?: string;
    caption: string;
    photo: string;
}

export interface Guide {
    [x: string]: any;
    _id: string;
    title: string;
    address: string;
    steps: Step[];
    publicId: string;
    privateId: string;
    createdAt?: string;
    updatedAt?: string;
}

interface GuideResponse {
    success: boolean;
    message: string;
    data: Guide;
}

interface GuidesResponse {
    success: boolean;
    message: string;
    data: Guide[];
}

export const guideApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createGuide: build.mutation<GuideResponse, FormData>({
            query: (guideData) => ({
                url: "/guide",
                method: "POST",
                body: guideData,
                headers: {}, // let browser set Content-Type for FormData
            }),
        }),

        // Get all guides
        getAllGuides: build.query<GuidesResponse, void>({
            query: () => ({
                url: "/guide",
                method: "GET",
            }),
            providesTags: ["Guide"],
        }),

        // Get guide by publicId (for public viewing)
        getGuideByPublicId: build.query<GuideResponse, string>({
            query: (publicId) => ({
                url: `/guide/public/${publicId}`,
                method: "GET",
            }),
            providesTags: ["Guide"],
        }),

        // Get guide by privateId (for editing)
        getGuideByPrivateId: build.query<GuideResponse, string>({
            query: (privateId) => ({
                url: `/guide/private/${privateId}`,
                method: "GET",
            }),
            providesTags: ["Guide"],
        }),

        // Update guide by privateId
        updateGuide: build.mutation<
            GuideResponse,
            { privateId: string; data: FormData | any }
        >({
            query: ({ privateId, data }) => ({
                url: `/guide/${privateId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Guide"],
        }),

        // Delete guide by privateId
        deleteGuide: build.mutation<{ success: boolean; id: string }, string>({
            query: (privateId) => ({
                url: `/guide/${privateId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Guide"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateGuideMutation,
    useGetAllGuidesQuery,
    useGetGuideByPublicIdQuery,
    useGetGuideByPrivateIdQuery,
    useUpdateGuideMutation,
    useDeleteGuideMutation,
} = guideApi;