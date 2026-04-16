import { baseApi } from "../../api/baseApi";

const cmsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Interior
    getInterior: builder.query({
      query: () => ({
        url: "/cms/interior",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["interior"],
    }),
    updateInterior: builder.mutation({
      query: (body) => ({
        url: "/cms/interior",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["interior"],
    }),

    // Exterior
    getExterior: builder.query({
      query: () => ({
        url: "/cms/exterior",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["exterior"],
    }),
    updateExterior: builder.mutation({
      query: (body) => ({
        url: "/cms/exterior",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["exterior"],
    }),

    // Lawn & Garden
    getLawnGarden: builder.query({
      query: () => ({
        url: "/cms/lawn-garden",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["lawn-garden"],
    }),
    updateLawnGarden: builder.mutation({
      query: (body) => ({
        url: "/cms/lawn-garden",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["lawn-garden"],
    }),

    // Specialized & Other Services
    getSpecialized: builder.query({
      query: () => ({
        url: "/cms/specialized",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["specialized"],
    }),
    updateSpecialized: builder.mutation({
      query: (body) => ({
        url: "/cms/specialized",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["specialized"],
    }),

    // Articles
    getArticles: builder.query({
      query: () => ({
        url: "/cms/articles",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["articles"],
    }),
    updateArticles: builder.mutation({
      query: (body) => ({
        url: "/cms/articles",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["articles"],
    }),

    // Referral
    getReferral: builder.query({
      query: () => ({
        url: "/cms/referral",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["referral"],
    }),
    updateReferral: builder.mutation({
      query: (body) => ({
        url: "/cms/referral",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["referral"],
    }),

    // Membership
    getMembership: builder.query({
      query: () => ({
        url: "/cms/membership",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["membership"],
    }),
    updateMembership: builder.mutation({
      query: (body) => ({
        url: "/cms/membership",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["membership"],
    }),

    // VIP Contractor
    getVipContractor: builder.query({
      query: () => ({
        url: "/cms/vip-contractor",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["vip-contractor"],
    }),
    updateVipContractor: builder.mutation({
      query: (body) => ({
        url: "/cms/vip-contractor",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["vip-contractor"],
    }),
  }),
});

export const {
  useGetInteriorQuery,
  useUpdateInteriorMutation,
  useGetExteriorQuery,
  useUpdateExteriorMutation,
  useGetLawnGardenQuery,
  useUpdateLawnGardenMutation,
  useGetSpecializedQuery,
  useUpdateSpecializedMutation,
  useGetArticlesQuery,
  useUpdateArticlesMutation,
  useGetReferralQuery,
  useUpdateReferralMutation,
  useGetMembershipQuery,
  useUpdateMembershipMutation,
  useGetVipContractorQuery,
  useUpdateVipContractorMutation,
} = cmsApi;
