import {createSlice} from '@reduxjs/toolkit';
import toast from "react-hot-toast";

const initialTemplateState = {
  allCustomers: null,
  status: 'idle'
}

const templateSlice = createSlice({
  name: 'customers',
  initialState: initialTemplateState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTem.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getAllCustomers.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.allCustomers = payload;
      })
      .addCase(getAllCustomers.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })
  },
})

export const selectAllCustomers = (state) => state.customers.allCustomers;

export const {} = templateSlice.actions
export default templateSlice.reducer
