/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

export interface Step {
    caption: string;
    photo: string;
}

export interface Guide {
    [x: string]: any;
    _id: string;
    title: string;
    address: string;
    steps: Step[];
    createdAt?: string;
    updatedAt?: string;
}

interface GuideResponse {
    success: boolean;
    message: string;
    data: Guide;
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
        getAllGuides: build.query<Guide[], void>({
            query: () => ({
                url: "/guide",
                method: "GET",
            }),
            providesTags: ["Guide"],
        }),

        // Get guide by ID
        getGuideById: build.query<Guide, string>({
            query: (id) => ({
                url: `/guide/${id}`,
                method: "GET",
            }),
            providesTags: ["Guide"],
        }),

        // Update guide
        updateGuide: build.mutation<
            Guide,
            { id: string; data: Partial<Omit<Guide, "id">> }
        >({
            query: ({ id, data }) => ({
                url: `/guide/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Guide"],
        }),


        // Delete guide
        deleteGuide: build.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `/guide/${id}`,
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
    useGetGuideByIdQuery,
    useUpdateGuideMutation,
    useDeleteGuideMutation,
} = guideApi;
