import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const signIn = createAsyncThunk(
  'user/signIn',
  async (paramaters, thunkAPI) => {
    const { data } = await axios.get(
      `https://www.fastmock.site/mock/ec3f45d4cf2bb5a3874fc0d304a8c735/todolist/api/login-test`,
      {
        username: paramaters.username,
        password: paramaters.password
      }
    );
    document.cookie = `token=${data.token}`;
    return data.token;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    token: null,
    uid: '123'
  },
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: {
    // action creator that dispatches an 'user/signIn/pending' action
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export default userSlice;
