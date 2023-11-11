// import {createSlice} from '@reduxjs/toolkit';
// import toast from "react-hot-toast";
// import {getAllCustomers} from "./customerThunk.js";
//
// const initialCustomerState = {
//   allCustomers: null,
//   status: 'idle'
// }
//
// const customerSlice = createSlice({
//   name: 'customers',
//   initialState: initialCustomerState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllCustomers.pending, (state) => {
//         state.status = 'pending';
//       })
//       .addCase(getAllCustomers.fulfilled, (state, {payload}) => {
//         state.status = 'fulfilled';
//         state.allCustomers = payload;
//       })
//       .addCase(getAllCustomers.rejected, (state, {error}) => {
//         state.status = 'failed';
//         toast.error(error.message)
//       })
//   },
// })
//
// export const selectAllCustomers = (state) => state.customers.allCustomers;
//
// export default customerSlice.reducer
