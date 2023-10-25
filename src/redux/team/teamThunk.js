import {getRequest} from "../cwAPI.js";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllTeams = createAsyncThunk('/customers/getAllTeams', async (payload, thunkAPI) => {
  try {
    const {data} = await getRequest(`/teams`);
    return data
  } catch (e) {
    thunkAPI.dispatch(getAllTeams.rejected(e.response.data.message));
  }
})