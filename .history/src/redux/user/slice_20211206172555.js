import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const signIn = createAsyncThunk(
  '/login',
  async (paramaters, thunkAPI) => {
    const { data } = await axios.post(``, {
      username: paramaters.username,
      password: paramaters.password
    });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    token: null
  },
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: {}
});

export default userSlice;
