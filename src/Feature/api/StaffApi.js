import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { LIVE_STAFF_BASE_URL } from "../../Constants/ImgConstants";

export const StaffApi = createApi({
  reducerPath: "StaffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: LIVE_STAFF_BASE_URL,
  }),
  endpoints: (builder) => ({
    getStaffs: builder.query({
      providesTags: ["Staffs"],
      query: ({ userID, bussinessId, page }) =>
        `staff_svc/pv/staff/getStaffs?userId=${userID}&businessId=${bussinessId}&pageSize=12&pageNo=${page}`,
      invalidatesTags: ["Staffs"],
    }),
    addNewStaff: builder.mutation({
      query: (data) => ({
        url: "/staff_svc/pv/staff/addNewStaff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staffs"],
    }),
    getColumnNamesByServiceNameStaff: builder.query({
      providesTags: ["Staffs"],
      query: (id) =>
        `staff_svc/pv/columnnames/getColumnNamesByServiceName?id=${id}`,
      invalidatesTags: ["Staffs"],
    }),
    addNewColumnPreferenceStaff: builder.mutation({
      query: (data) => ({
        url: "staff_svc/pv/columnpreferences/addNewColumnPreference",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staffs"],
    }),
    searchStaffList: builder.mutation({
      query: ({ id, userId, text, firstName, lastName, email, number }) => ({
        url: "staff_svc/pv/staff/searchStaffDynamicallyNew",
        method: "POST",
       body: {
          userId,
          businessId: id,
          firstName: firstName ? firstName : null,
          lastName: lastName ? lastName : null,
          email: email ? email : null,
          mobile: number ? number : null,
          text: text ? text : null,
        },
      }),
      invalidatesTags: ["Staffs"],
    }),
  
  }),
});

export const {
  useGetStaffsQuery,
  useAddNewStaffMutation,
  useAddNewColumnPreferenceStaffMutation,
  useGetColumnNamesByServiceNameStaffQuery,
  useSearchStaffListMutation,
} = StaffApi;
