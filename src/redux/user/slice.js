import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import rsaEncrypt from '../../utils/encrypt';

// const testMockAPI = `https://www.fastmock.site/mock/ec3f45d4cf2bb5a3874fc0d304a8c735/todolist/api/login-test`;
const localTestApi = '/api/user/login';
const localTestApiSignUp = '/api/user/regist';
// 异步登录请求
export const signIn = createAsyncThunk(
  'user/signIn',
  async (paramaters, thunkAPI) => {
    const { data } = await axios.post(localTestApi, {
      username: rsaEncrypt(paramaters.username),
      password: rsaEncrypt(paramaters.password)
    });
    return data;
  }
);
// 异步登录请求
export const signUp = createAsyncThunk(
  'user/signUp',
  async (paramaters, thunkAPI) => {
    const { data } = await axios.post(localTestApiSignUp, {
      username: paramaters.username,
      password: paramaters.password
    });
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    token: null,
    uid: null
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
      state.error = null;
    },
    [signIn.fulfilled.type]: (state, action) => {
      if (action.payload.errno === 0) {
        state.token = action.payload.data.uid;
        state.uid = action.payload.data.uid;
        state.loading = false;
        state.error = null;
      } else {
        state.error = action.payload.message;
        state.loading = false;
      }
    },
    [signIn.rejected.type]: (state, action) => {
      // console.log(action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    [signUp.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signUp.fulfilled.type]: (state, action) => {
      if (action.payload.errno === 0) {
        state.token = action.payload.data.uid;
        state.uid = action.payload.data.uid;
        state.loading = false;
        state.error = null;
      } else {
        state.error = action.payload.message;
        state.loading = false;
      }
    },
    [signUp.rejected.type]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    }
  }
});

export default userSlice;
