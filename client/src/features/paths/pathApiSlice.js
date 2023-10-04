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
  }),
});

export const {
  useCreatePathMutation,
  useFetchPathMutation,
} = pathApiSlice;
