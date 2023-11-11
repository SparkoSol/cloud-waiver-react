// import {getRequest} from "../cwAPI.js";
// import {createAsyncThunk} from "@reduxjs/toolkit";
//
// export const getAllCustomers = createAsyncThunk('/customers/getAllCustomers', async (payload, thunkAPI) => {
//   try {
//     const {data} = await getRequest(`/customers`);
//     return data
//   } catch (e) {
//     thunkAPI.dispatch(getAllCustomers.rejected(e.response.data.message));
//   }
// })