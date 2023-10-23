import {createAsyncThunk} from '@reduxjs/toolkit'
import {getRequest, postRequest} from '../cwAPI'

export const login = createAsyncThunk('user/login', async (payload, thunkAPI) => {
  try {
    const {data: tokens} = await postRequest('/auth/sign-in', payload)
    localStorage.setItem('cw-access-token', tokens?.access_token);
    localStorage.setItem('cw-refresh-token', tokens?.refresh_token);
    const {data: user} = await getRequest('/auth/profile', payload);
    if (user.verified) {
      window.location.href = `http://${tokens.domain}.techtrival.com/dashboard?token=${tokens.access_token}`
      return user
    } else {
      await postRequest('/persons/resend-verification-email', {
        email:user.username, id:user._id, name:user.first_name
      });
      return 'The Verification Email sent to your email, kindly check your inbox and verify';
    }
  } catch (e) {
    thunkAPI.dispatch(login.rejected(e.response.data.message));
  }
})

export const registerUser = createAsyncThunk('/user/register', async (payload, thunkAPI) => {
  try {
    return await postRequest('/auth/sign-up', payload)
  } catch (e) {
    thunkAPI.dispatch(login.rejected(e.response.data.message));
  }
})

export const resetPassword = createAsyncThunk('user/reset-password', async (payload, thunkAPI) => {
  try {
    const {data} = await postRequest('/persons/reset-password', payload);
    return data
  } catch (e) {
    thunkAPI.dispatch(login.rejected(e.response.data.message));
  }
})

export const forgetPassword = createAsyncThunk('user/forgetPassword', async (payload, thunkAPI) => {
  try {
    const {data} = await postRequest('/persons/forgot-password', payload);
    return data
  } catch (e) {
    thunkAPI.dispatch(login.rejected(e.response.data.message));
  }
})

export const verifyUser = createAsyncThunk('user/verifyUser', async (payload, thunkAPI) => {
  try {
    const {data} = await postRequest('/persons/verify-account', payload);
    return data
  } catch (e) {
    thunkAPI.dispatch(verifyUser.rejected(e.response.data.message));
  }
})