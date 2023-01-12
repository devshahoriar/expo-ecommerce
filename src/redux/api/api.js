import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverUrl } from '../../data/constant'
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl + '/api/',
  }),
  endpoints: (b) => ({}),
})

export default api
