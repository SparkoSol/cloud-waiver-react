import {createAsyncThunk} from "@reduxjs/toolkit";
import {getRequest} from "../cwAPI";

export const getSingleWaiver = createAsyncThunk('/waivers/getSingleWaiver', async (payload, thunkAPI) => {
  try {
    const {data} = await getRequest(`/waivers/${payload}`)
    return data
  } catch (e) {
    thunkAPI.dispatch(getSingleWaiver.rejected(e.response.data.message));
  }
});

export const getPublicWaiver = createAsyncThunk('/waivers/getPublicWaiver', async (payload, thunkAPI) => {
  try {
    const {data} = await getRequest(`/waivers/${payload}/public`)
    return data
  } catch (e) {
    thunkAPI.dispatch(getPublicWaiver.rejected(e.response.data.message));
  }
});
export const getAllWaiver = createAsyncThunk('/waivers', async (payload, thunkAPI) => {
  try {
    const {data} = await getRequest(`/waivers?statuses=published&statuses=published`)
    return data
  } catch (e) {
    thunkAPI.dispatch(getPublicWaiver.rejected(e.response.data.message));
  }
});