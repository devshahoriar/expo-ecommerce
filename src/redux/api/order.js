import api from './api'

const order = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (b) => ({
    getOrder: b.query({
      query: ({ id, jwt }) => ({
        url: `/orders?filters[user_id][$eq]=${id}&sort[0]=createdAt:desc`,
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }),
    }),
    makeOrder: b.mutation({
      query: ({ data, jwt }) => ({
        url: '/orders',
        body: { data: data },
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }),
    }),
  }),
})

export const { useGetOrderQuery, useMakeOrderMutation } = order
