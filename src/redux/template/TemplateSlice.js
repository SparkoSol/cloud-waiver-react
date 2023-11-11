import {createSlice} from '@reduxjs/toolkit';

const initialTemplateState = {
  allCustomers: null,
  status: 'idle'
}

const templateSlice = createSlice({
  name: 'customers',
  initialState: initialTemplateState,
  reducers: {},
  extraReducers: (builder) => {

  },
})

export const selectAllCustomers = (state) => state.customers.allCustomers;

export const {} = templateSlice.actions
export default templateSlice.reducer
