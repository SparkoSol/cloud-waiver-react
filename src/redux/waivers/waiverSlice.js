import {createSlice} from '@reduxjs/toolkit';
import {getSingleWaiver} from "./waiverThunk";
import {useSelector} from "react-redux";
import toast from 'react-hot-toast';

const initialWaiverState = {
  allWaivers: null,
  currentWaiver:null,
  status: 'idle'
}

const waiverSlice = createSlice({
  name: 'waivers',
  initialState: initialWaiverState,
  reducers: {},
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
  },
})

export const selectSingleWaiver = state=>state.waivers.currentWaiver;

export const {} = waiverSlice.actions
export default waiverSlice.reducer
