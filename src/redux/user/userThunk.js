import {createAsyncThunk} from '@reduxjs/toolkit'
import {getRequest, patchRequest, postRequest} from '../cwAPI'

export const login = createAsyncThunk('user/login', async (payload, thunkAPI) => {
  try {
    const {data: tokens} = await postRequest('/auth/sign-in', payload)
    localStorage.setItem('cw-access-token', tokens?.access_token);
    localStorage.setItem('cw-refresh-token', tokens?.refresh_token);
    const {data: user} = await getRequest('/auth/profile');
    return user
  } catch (e) {
    thunkAPI.dispatch(login.rejected(e.response?.data.message));
  }
})

export const registerUser = createAsyncThunk('/user/register', async (payload, thunkAPI) => {
  try {
    return await postRequest('/auth/sign-up', payload)
  } catch (e) {
    throw(e.response.data.message);
  }
})

export const resetPassword = createAsyncThunk('user/reset-password', async (payload, thunkAPI) => {
  try {
    const {data} = await postRequest('/persons/reset-password', payload);
    return data
  } catch (e) {
    thunkAPI.dispatch(login.rejected(e.response?.data.message));
  }
})

export const forgetPassword = createAsyncThunk('user/forgetPassword', async (payload, thunkAPI) => {
  try {
    const {data} = await postRequest('/persons/forgot-password', payload);
    return data
  } catch (e) {
    thunkAPI.dispatch(login.rejected(e.response?.data.message));
  }
})

export const verifyUser = createAsyncThunk('user/verifyUser', async (payload, thunkAPI) => {
  try {
    const {data} = await postRequest('/persons/verify-account', payload);
    return data
  } catch (e) {
    thunkAPI.dispatch(verifyUser.rejected(e.response?.data.message));
  }
})

export const updateProfile = createAsyncThunk('user/updateProfile', async (payload, thunkAPI) => {
  try {
    const {data} = await patchRequest(`/persons/${payload._id}`, payload.body);
    return data
  } catch (e) {
    thunkAPI.dispatch(updateProfile.rejected(e.response?.data.message));
  }
})

export const userProfile = createAsyncThunk('user/userProfile', async (payload, thunkAPI) => {
  try {
    const {data} = await getRequest('/auth/profile', payload);
    return data;
  } catch (e) {
    thunkAPI.dispatch(updateProfile.rejected(e.response?.data.message));
  }
})

export const getMembers = createAsyncThunk('/user/getMembers', async (payload, thunkAPI) => {
  try {
    const {data} = await getRequest(`/teams/member/${payload}`);
    return data
  } catch (e) {
    thunkAPI.dispatch(getMembers.rejected(e.response?.data.message));
  }
})

export const updateProfilePicture = createAsyncThunk('/user/updateProfilePicture', async (payload, thunkAPI) => {
  try {
    const {data} = await postRequest('/upload', payload);
    return data
  } catch (e) {
    thunkAPI.dispatch(updateProfilePicture.rejected(e.response?.data.message));
  }
})

export const detachPaymentMethod = createAsyncThunk('/user/detachPaymentMethod', async (payload, thunkAPI) => {
  try {
    const {data} = await patchRequest('/payments/payment-methods/detach', payload);
    return data
  } catch (e) {
    thunkAPI.dispatch(detachPaymentMethod.rejected(e.response?.data.message));
  }
})

export const setDefaultMethod = createAsyncThunk('/user/setDefaultMethod', async (payload, thunkAPI) => {
  try {
    const {data} = await patchRequest('/payments/payment-methods/set-default', payload);
    return data
  } catch (e) {
    thunkAPI.dispatch(setDefaultMethod.rejected(e.response?.data.message));
  }
})

export const updatePaymentMethods = createAsyncThunk('/user/updatePaymentMethods', async (payload, thunkAPI) => {
  try {
    const {data} = await postRequest('/payments/payment-methods/attach', payload)
    return data
  } catch (e) {
    thunkAPI.dispatch(updatePaymentMethods.rejected(e.response?.data.message));
  }


  // try {
  //   const {data} = await axios.post('http://192.168.1.22:8000/update-payment-methods', payload);
  //   return data
  // } catch (e) {
  //   thunkAPI.dispatch(updatePaymentMethods.rejected(e.response?.data.message));
  // }
})

export const getAllInvoices = createAsyncThunk('/user/getAllInvoices', async (payload, thunkAPI) => {
  try {
    const {data, status} = await getRequest('/payments/invoices', payload);
    if (status === 200 && data === '') {
      return {data: []}
    }
    return data
  } catch (e) {
    thunkAPI.dispatch(getAllInvoices.rejected(e.response?.data.message));
  }
})

export const getAllMethods = createAsyncThunk('/user/getAllMethods', async (payload, thunkAPI) => {
  try {
    const {data, status} = await getRequest('/payments/payment-methods', payload)
    if (status === 200 && data === '') {
      return {data: []}
    }
    return data
  } catch (e) {
    thunkAPI.dispatch(getAllMethods.rejected(e.response?.data.message));
  }
})

export const createPlan = createAsyncThunk('/user/createPlan', async (payload, thunkAPI) => {
  try {
    let {data} = await postRequest('/payments/subscription/create', payload);
    return {
      data: {
        id: data.id,
        end: data.current_period_end,
        start: data.current_period_start
      },
      items: payload.prices
    }
  } catch (e) {
    thunkAPI.dispatch(createPlan.rejected(e.response?.data.message));
  }
})

export const updatePlan = createAsyncThunk('/user/updatePlan', async (payload, thunkAPI) => {
  try {
    let {data} = await postRequest('/payments/subscription/update', payload);
    return {
      data: {
        id: data.id,
        end: data.current_period_end,
        start: data.current_period_start
      },
      items: [payload.price]
    }
  } catch (e) {
    thunkAPI.dispatch(updatePlan.rejected(e.response?.data.message));
  }
})

