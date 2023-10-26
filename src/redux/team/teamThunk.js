import {getRequest, patchRequest} from "../cwAPI.js";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAllTeams = createAsyncThunk('/customers/getAllTeams', async (payload, thunkAPI) => {
  try {
    const {data} = await getRequest(`/teams`);
    return data
  } catch (e) {
    throw(e.response.data.message);
  }
})

export const getMembers = createAsyncThunk('/customers/getMembers', async (payload) => {
  try {
    const {data} = await getRequest(`/teams/member/${payload}`);
    return data
  } catch (e) {
    throw(e.response.data.message);
  }
})

export const getSingleTeam = createAsyncThunk('/customers/getSingleTeam', async (payload) => {
  try {
    const {data} = await getRequest(`/teams/${payload}`);
    return data
  } catch (e) {
    throw(e.response.data.message);
  }
})