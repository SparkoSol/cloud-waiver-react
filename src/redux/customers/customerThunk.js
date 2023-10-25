import {getRequest, patchRequest} from "../cwAPI.js";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllCustomers = createAsyncThunk('/customers/getAllCustomers', async (payload, thunkAPI) => {
  try {
    const {data} = await getRequest(`/customers`);
    return data
  } catch (e) {
    thunkAPI.dispatch(getAllCustomers.rejected(e.response.data.message));
  }
})

export const updateCustomer = createAsyncThunk('/customers/updateCustomer', async (payload, thunkAPI) => {
  try {
    const {data} = await patchRequest(`/customers/${payload._id}`, payload.body);
    return data
  } catch (e) {
    thunkAPI.dispatch(updateCustomer.rejected(e.response.data.message[0]));
    throw(e.response.data.message[0])
  }
})

export const getCustomer = createAsyncThunk('/customers/updateCustomer', async (payload, thunkAPI) => {
  try {
    const {data} = await getRequest(`/customers/${payload}`);
    return data
  } catch (e) {
    thunkAPI.dispatch(updateCustomer.rejected(e.response.data.message[0]));
    throw(e.response.data.message[0])
  }
})