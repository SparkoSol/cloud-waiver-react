import {postRequest} from "../cwAPI.js";
import {createAsyncThunk} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const createWaiver = createAsyncThunk('/waivers/createWaiver', async (payload, thunkAPI) => {
  try {
    const {data} = await postRequest(`/waivers`, {name: payload});
    return data
  } catch (e) {
    toast.error(e.response.data.message);
    throw(e.response.data.message);
  }
})