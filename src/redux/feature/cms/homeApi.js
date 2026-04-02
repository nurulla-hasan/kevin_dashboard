import { baseApi } from "../../api/baseApi";

const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCmsHomeData: builder.query({
      query: () => ({
        url: "/cms/home",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["home"],
    }),

    updateCmsHomeData: builder.mutation({
      query: (body) => ({
        url: "/cms/home",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["home"],
    }),
  }),
});

export const {
  useGetCmsHomeDataQuery,
  useUpdateCmsHomeDataMutation,
} = homeApi;