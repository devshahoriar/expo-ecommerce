import { configureStore } from '@reduxjs/toolkit'
import api from './api/api'
import cartReducher from './slice/cart'
import UserReducher from './slice/user'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: UserReducher,
    cart: cartReducher,
  },
  middleware: (gdfm) =>
    gdfm({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }).concat(api.middleware),
})
export default store
