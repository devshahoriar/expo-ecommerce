import api from './api'

const homeApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (b) => ({
    getSlide: b.query({
      query: () => ({ url: 'slide?populate=deep' }),
    }),
  }),
})

export const { useGetSlideQuery } = homeApi
