import {createSlice} from '@reduxjs/toolkit';
import toast from "react-hot-toast";
import {getAllTeams, getSingleTeam} from "./teamThunk.js";

const initialTeamsState = {
  allTeams: null,
  status: 'idle'
}

const customerSlice = createSlice({
  name: 'teams',
  initialState: initialTeamsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeams.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getAllTeams.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.allTeams = payload;
      })
      .addCase(getAllTeams.rejected, (state, {error}) => {
        state.status = 'rejected';
        toast.error(error.message)
      })

    builder
      .addCase(getSingleTeam.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getSingleTeam.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.currentTeam = payload;
      })
      .addCase(getSingleTeam.rejected, (state, {error}) => {
        state.status = 'rejected';
        toast.error(error.message)
      })
  },
})

export const selectAllTeams = (state) => state.teams.allTeams;
export const {} = customerSlice.actions
export default customerSlice.reducer
