import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import rsaEncrypt from '../../utils/encrypt';

// 'http://39.107.142.104:3030/api/user/login';
// 'http://39.107.142.104:3030/api/user/regist';
// 'http://39.107.142.104:3030/api/user/changeUsername';
// 'http://39.107.142.104:3030/api/user/changePassword';

const userApi = 'http://39.107.142.104:3030/api/user/';

// 异步登录请求
export const signIn = createAsyncThunk(
  'user/signIn',
  async (paramaters, thunkAPI) => {
    const { data } = await axios.post(userApi + 'login', {
      username: rsaEncrypt(paramaters.username),
      password: rsaEncrypt(paramaters.password)
    });
    return data;
  }
);
// 异步注册请求
export const signUp = createAsyncThunk(
  'user/signUp',
  async (paramaters, thunkAPI) => {
    const { data } = await axios.post(userApi + 'regist', {
      username: rsaEncrypt(paramaters.username),
      password: rsaEncrypt(paramaters.password)
    });
    return data;
  }
);

export const changeUsername = createAsyncThunk(
  'user/changeUsername',
  async (paramaters, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    const oldUsername = thunkAPI.getState().user.username;

    const { data } = await axios.post(
      userApi + 'changeUsername',
      {
        oldUsername: rsaEncrypt(oldUsername),
        newUsername: rsaEncrypt(paramaters)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (paramaters, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    const { data } = await axios.post(
      userApi + 'changePassword',
      {
        oldPassword: rsaEncrypt(paramaters.oldPassword),
        newPassword: rsaEncrypt(paramaters.newPassword)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    username: null,
    error: null,
    token: null,
    uid: null
  },
  reducers: {
    logOut: (state) => {
      state.uid = null;
      state.username = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
    clearErr: (state) => {
      state.error = null;
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
        state.token = action.payload.data.token;
        state.uid = action.payload.data.uid;
        state.username = action.payload.data.username;
        state.loading = false;
        state.error = null;
      } else {
        state.error = action.payload.message;
        state.loading = false;
      }
    },
    [signIn.rejected.type]: (state, action) => {
      // console.log(action.payload);
      state.error = '服务器未响应';
      state.loading = false;
    },
    [signUp.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signUp.fulfilled.type]: (state, action) => {
      if (action.payload.errno === 0) {
        // console.log(action.payload);
        state.token = action.payload.data.token;
        state.uid = action.payload.data.uid;
        state.username = action.payload.data.username;
        state.loading = false;
        state.error = null;
      } else {
        state.error = action.payload.message;
        state.loading = false;
      }
    },
    [signUp.rejected.type]: (state, action) => {
      state.error = '服务器未响应';
      state.loading = false;
    },
    [changeUsername.pending.type]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [changeUsername.fulfilled.type]: (state, action) => {
      if (action.payload.errno === 0) {
        state.loading = false;
        state.error = action.payload.message;
        state.username = action.payload.newUsername;
      } else {
        state.loading = false;
        state.error = action.payload.message;
      }
    },
    [changeUsername.rejected.type]: (state, action) => {
      state.error = '服务器未响应';
      state.loading = false;
    },
    [changePassword.pending.type]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [changePassword.fulfilled.type]: (state, action) => {
      if (action.payload.errno === 0) {
        state.loading = false;
        state.error = action.payload.message;
        state.username = null;
        state.token = null;
        state.uid = null;
      } else {
        state.loading = false;
        state.error = action.payload.message;
      }
    },
    [changePassword.rejected.type]: (state, action) => {
      state.error = '服务器未响应';
      state.loading = false;
    }
  }
});

export const { logOut, clearErr } = userSlice.actions;
export default userSlice.reducer;
