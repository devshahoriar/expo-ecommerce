import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  jwt: '',
  name: '',
  email: '',
  id: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, { payload: data }) => {
      state.jwt = data.jwt
      state.name = data.name
      state.email = data.email
      state.id = data.id
    },
    logOutUser: (state) => {
      state.jwt = ''
      state.email = ''
      state.name = ''
      state.id = undefined
    },
  },
})

export default userSlice.reducer
export const { loginUser, logOutUser } = userSlice.actions
