import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    integrationsStatus: {
        googleDriveState: false,
        dropBoxState: false,
        constantContactState: false,
        mailchimpState: false
    }
}

const integrationSlice = createSlice({
    name: "integration",
    initialState,
    reducers: {
        updateIntegrationStatus(state, action) {
            const {actionType, status} = action.payload
            state.integrationsStatus[actionType] = status
        }
    }
})

export const {updateIntegrationStatus} = integrationSlice.actions
export default integrationSlice.reducer