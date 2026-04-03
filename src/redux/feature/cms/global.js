import { baseApi } from "../../api/baseApi";

const navFooterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCmsNavFooterData: builder.query({
      query: () => ({
        url: "/cms/global",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["global"],
    }),

    updateCmsNavFooterData: builder.mutation({
      query: (body) => ({
        url: "/cms/global",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["global"],
    }),
  }),
});

export const {
  useGetCmsNavFooterDataQuery,
  useUpdateCmsNavFooterDataMutation,
} = navFooterApi;