import apiSlice from '../../app/api/apiSlice';

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
    tokenRefresh: builder.mutation({
      query: (token) => ({
        url: 'api/v1/users/token_refresh',
        method: 'GET',
        body: { token },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApiSlice;
