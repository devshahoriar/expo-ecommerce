import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import cartAddToStorage from '../../utils/cartAddTostroge'

const initialState = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const x = state.findIndex((p) => p.id === action.payload.id)
      if (x >= 0) {
        state[x].qun = state[x].qun + 1
      } else {
        action.payload.qun = 1
        state.push(action.payload)
      }
      cartAddToStorage(state)
    },
    removeFromCart: (state, action) => {
      state.splice(
        state.findIndex((_) => _.id === action.payload),
        1
      )
      cartAddToStorage(state)
    },
    incProduct: (state, action) => {
      const x = state.findIndex((p) => p.id === action.payload)
      if (x >= 0) {
        state[x].qun = state[x].qun + 1
      }
      cartAddToStorage(state)
    },
    decProduct: (state, action) => {
      const x = state.findIndex((p) => p.id === action.payload)
      if (x >= 0) {
        state[x].qun = state[x].qun - 1
      }
      cartAddToStorage(state)
    },
    addAll: (state, action) => {
      JSON.parse(action.payload)?.forEach((element) => {
        state.push(element)
      })
    },
    removeAll: (state) => {
      state.splice(0, state.length)
    },
  },
})

export default cartSlice.reducer
export const {
  addToCart,
  removeFromCart,
  incProduct,
  decProduct,
  addAll,
  removeAll,
} = cartSlice.actions
