import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/v1/users/sign_in',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'api/v1/users/',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApiSlice;
