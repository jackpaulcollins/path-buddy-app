import apiSlice from '../../app/api/apiSlice';

export const pathApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPath: builder.mutation({
      query: (path) => ({
        url: '/api/v1/paths',
        method: 'POST',
        body: path,
      }),
    }),
    fetchPath: builder.mutation({
      query: (currentUserId) => ({
        url: `/api/v1/paths/${currentUserId}`,
        method: 'GET',
      }),
    }),
    validOnDate: builder.mutation({
      query: (data) => ({
        url: `/api/v1/valid_on_date?id=${data.id}&date=${data.date}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreatePathMutation,
  useFetchPathMutation,
  useValidOnDateMutation,
} = pathApiSlice;
