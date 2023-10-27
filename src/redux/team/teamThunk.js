import {getRequest, patchRequest} from "../cwAPI.js";
import {createAsyncThunk} from "@reduxjs/toolkit";
import toast from 'react-hot-toast'

export const getAllTeams = createAsyncThunk('/team/getAllTeams', async (payload, thunkAPI) => {
  try {
    const {data} = await getRequest(`/teams`);
    return data
  } catch (e) {
    throw(e.response.data.message);
  }
})

export const getSingleTeam = createAsyncThunk('/team/getSingleTeam', async (payload) => {
  try {
    const {data} = await getRequest(`/teams/${payload}`);
    return data
  } catch (e) {
    throw(e.response.data.message);
  }
})

export const removeMember = createAsyncThunk('/team/removeMember', async (payload) => {
  try {
    const {teamId, memberId, index} = payload;
    await patchRequest(`/teams/${teamId}/member/${memberId}/remove`);
    return index
  } catch (e) {
    toast.error(e.response.data.message)
    throw(e.response.data.message);
  }
})

export const addMember = createAsyncThunk('/team/addMember', async (payload) => {
  try {
    const {teamId, body} = payload;
    const {data} = await patchRequest(`/teams/${teamId}/member/add`, body);
    return data
  } catch (e) {
    toast.error(e.response.data.message)
    throw(e.response.data.message);
  }
})

export const updateTeam = createAsyncThunk('/team/updateTeam', async (payload) => {
  try {
    const {teamId, body} = payload;
    const {data} = await patchRequest(`/teams/${teamId}`, body);
    return data
  } catch (e) {
    toast.error(e.response.data.message)
    throw(e.response.data.message);
  }
})