import {createSlice} from '@reduxjs/toolkit';
import toast from "react-hot-toast";
import {addMember, getAllTeams, getSingleTeam, removeMember} from "./teamThunk.js";

const initialTeamsState = {
  allTeams: null,
  currentTeam: null,
  allowedPermissions: [],
  status: 'idle'
}

const teamSlice = createSlice({
  name: 'teams',
  initialState: initialTeamsState,
  reducers: {
    userPermissions: (state, {payload}) => {
      state.allowedPermissions = payload;
    },
  },
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

    builder
      .addCase(removeMember.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(removeMember.fulfilled, (state, {payload}) => {
        state.currentTeam.members.splice(payload, 1);
        toast.success('Member Removed Successfully')
        state.status = 'fulfilled';
      })
      .addCase(removeMember.rejected, (state, {error}) => {
        state.status = 'rejected';
      })

    builder
      .addCase(addMember.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addMember.fulfilled, (state, {payload}) => {
        toast.success('Member Added Successfully')
        state.status = 'fulfilled';
      })
      .addCase(addMember.rejected, (state, {error}) => {
        state.status = 'rejected';
      })
  },
})

export const selectAllTeams = (state) => state.teams.allTeams;
export const selectCurrentTeam = (state) => state.teams.currentTeam;
export const currentTeamStatus = (state) => state.teams.status;
export const allPermissions = (state) => state.teams.allowedPermissions;
export const {userPermissions} = teamSlice.actions
export default teamSlice.reducer
