import {createSlice} from '@reduxjs/toolkit';
import toast from "react-hot-toast";
import {getAllTeams} from "./teamThunk.js";

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
        state.status = 'failed';
        toast.error(error.message)
      })
  },
})

export const selectAllTeams = (state) => state.teams.allTeams;
export const {} = customerSlice.actions
export default customerSlice.reducer
