import { baseApi } from "./baseApi";

interface Guide {
 
    title: string;
    description: string;
    url:string;
    steps: Array<{
        caption: string;
        instruction: string;
        photo?: string;
    }>;
}

export const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createGuide: build.mutation<Guide, FormData>({
            query: (guideData) => ({
                url: "/guide",
                method: "POST",
                body: guideData,
            }),
            invalidatesTags: ["Guide"],
        }),
    }),
});


export const { useCreateGuideMutation } = usersApi;
