import api from './api'

const productApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (b) => ({
    getRandom: b.query({
      query: () => ({
        url: 'products?populate=*&randomSort=true&pagination[limit]=8',
      }),
    }),
    getProdutsWithOfferPrice: b.query({
      query: () => 'products?populate=*&filters[offerPrice][$null]',
    }),
    getProductById: b.query({
      query: (id) => 'products/' + id + '?populate=*',
    }),
  }),
})

export const {
  useGetRandomQuery,
  useGetProdutsWithOfferPriceQuery,
  useGetProductByIdQuery,
} = productApi
