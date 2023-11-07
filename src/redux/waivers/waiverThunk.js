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