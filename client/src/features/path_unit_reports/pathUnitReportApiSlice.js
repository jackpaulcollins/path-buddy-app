import apiSlice from '../../app/api/apiSlice';

export const pathUnitReportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPathUnitReport: builder.mutation({
      query: (pathUnitReport) => ({
        url: '/api/v1/path_unit_reports',
        method: 'POST',
        body: pathUnitReport,
      }),
    }),
    getPathUnitReport: builder.mutation({
      query: (query) => ({
        url: `/api/v1/path_unit_reports?id=${query.id}&date=${query.date}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreatePathUnitReportMutation,
  useGetPathUnitReportMutation,
} = pathUnitReportApiSlice;
