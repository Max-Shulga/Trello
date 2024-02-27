import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light',
}

const themeToggleSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
  },
})
export const { toggleTheme } = themeToggleSlice.actions
export default themeToggleSlice.reducer
