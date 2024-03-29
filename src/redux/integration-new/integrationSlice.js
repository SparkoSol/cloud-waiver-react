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
    },
    resetIntegrations(state){
      state.integrationsStatus.MAILCHIMP = false
      state.integrationsStatus.DROPBOX = false
      state.integrationsStatus.GOOGLE_DRIVE = false
      state.integrationsStatus.CONSTANT_CONTACT = false
    }
  }
})

export const {updateIntegrationStatus, resetIntegrations} = integrationSlice.actions
export const selectIntegrations = (state) => state.integration.integrationsStatus;
export default integrationSlice.reducer