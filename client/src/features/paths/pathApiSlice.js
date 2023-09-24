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
  }),
});

export const {
  useCreatePathMutation,
} = pathApiSlice;
