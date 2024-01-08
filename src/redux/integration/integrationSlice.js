import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  googleDriveState: false,
  dropBoxActiveState: false,
  constantContactActiveState: false,
  mailchimpActiveState: false,
}

const integrationSlice = createSlice({
  name: "integration",
  initialState,
  reducers: {
    toggleDriveState: (state, action) => {
      state.googleDriveState = action.payload
    },
    toggleDropBoxState: (state, action) => {
      state.dropBoxActiveState = action.payload
    },
    toggleConstantContact: (state, action) => {
      state.constantContactActiveState = action.payload
    },
    toggleMailchimp: (state, action) => {
      state.mailchimpActiveState = action.payload
    }
  }
})

export const {
  toggleDriveState,
  toggleDropBoxState,
  toggleConstantContact,
  toggleMailchimp
} = integrationSlice.actions
export default integrationSlice.reducer