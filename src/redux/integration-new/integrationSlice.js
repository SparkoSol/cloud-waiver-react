import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  integrationsStatus: {
    MAILCHIMP: false,
    DROPBOX: false,
    GOOGLE_DRIVE: false,
    CONSTANT_CONTACT: false,
  }
}

const integrationSlice = createSlice({
  name: "integration",
  initialState,
  reducers: {
    updateIntegrationStatus(state, action) {
      const {actionType, status} = action.payload;
      state.integrationsStatus[actionType] = status
    }
  }
})

export const {updateIntegrationStatus} = integrationSlice.actions
export const selectIntegrations = (state) => state.integration.integrationsStatus;
export default integrationSlice.reducer