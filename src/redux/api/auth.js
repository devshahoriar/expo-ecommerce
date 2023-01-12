import { loginUser } from '../slice/user'
import api from './api'

export const auth = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (b) => ({
    login: b.mutation({
      query: (data) => ({
        url: 'auth/local',
        method: 'POST',
        body: data,
      }),
    }),
    register: b.mutation({
      query: (data) => ({
        url: '/auth/local/register',
        method: 'POST',
        body: data,
      }),
    }),
    revalidate: b.query({
      query: (jwt) => ({
        url: '/users/me',
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }),
      onQueryStarted: async (args, api) => {
        try {
          const c = await api.queryFulfilled

          if (c.data.username) {
            api.dispatch(
              loginUser({
                jwt: args,
                name: c.data.username,
                email: c.data.email,
                id: c.data.id,
              })
            )
          } else {
            api.dispatch(
              loginUser({
                jwt: '',
                name: '',
                email: '',
              })
            )
          }
        } catch (error) {}
      },
    }),
  }),
})

export const { useLoginMutation,useRegisterMutation } = auth
