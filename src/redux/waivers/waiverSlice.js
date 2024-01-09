import {createSlice} from '@reduxjs/toolkit';
import {getAllWaiver, getPublicWaiver, getSingleWaiver} from "./waiverThunk";
import toast from 'react-hot-toast';

const initialWaiverState = {
  allWaivers: null,
  currentWaiver: null,
  publicWaiver: null,
  status: 'idle',
  selectedWaivers: []
}

const waiverSlice = createSlice({
  name: 'waivers',
  initialState: initialWaiverState,
  reducers: {
    addSelectedWaiver(state, {payload}) {
      state.selectedWaivers = payload
    },
    resetStatus(state) {
      state.status = 'idle';
    },
    updateFolder(state, {payload}) {
      const {index, folder} = payload;
      if (!state.allWaivers[index].hasOwnProperty('folder_name')) {
        state.allWaivers[index].folder_name = {};
      }
      state.allWaivers[index].folder_name = folder
    },
    resetCurrentWaiver(state) {
      state.currentWaiver = null;
    },
    updateWaiver(state, {payload}) {
      state.currentWaiver.name = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleWaiver.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getSingleWaiver.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.currentWaiver = payload;
      })
      .addCase(getSingleWaiver.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(getPublicWaiver.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getPublicWaiver.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.publicWaiver = payload;
      })
      .addCase(getPublicWaiver.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    // get all waives
    builder
      .addCase(getAllWaiver.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getAllWaiver.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.allWaivers = payload;
      })
      .addCase(getAllWaiver.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })
  },
})
export const selectSingleWaiver = state => state.waivers.currentWaiver;
export const selectPublicWaiver = state => state.waivers.publicWaiver;
export const selectWaiverStatus = state => state.waivers.status;
export const selectAllWaivers = state => state.waivers.allWaivers;
export const {resetStatus, updateFolder, addSelectedWaiver, updateWaiver} = waiverSlice.actions
export default waiverSlice.reducer
