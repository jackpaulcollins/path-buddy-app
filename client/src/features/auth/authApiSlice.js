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
    registerWithOauth: builder.mutation({
      query: ({ provider, token }) => ({
        url: 'api/v1/users/oauth/register',
        method: 'POST',
        body: { credentials: { provider, token } },
      }),
    }),
    refreshToken: builder.mutation({
      query: (token) => ({
        url: 'api/v1/tokens/refresh',
        method: 'GET',
        body: { token },
      }),
    }),
    verifyToken: builder.mutation({
      query: (token) => ({
        url: 'api/v1/tokens/verify',
        method: 'POST',
        body: token,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRegisterWithOauthMutation,
  useVerifyTokenMutation,
} = authApiSlice;
