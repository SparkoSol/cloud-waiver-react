import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    googleDrive: false,
    deletedDriveAccount: false,
    dropBoxActive: false,
    deletedDropBox: false,
    constantContactActive: false,
    deletedConstantContact: false,
    mailchimpActive: false,
    deletedMailchimp: false
}

const integrationSlice = createSlice({
    name: "integration",
    initialState,
    reducers: {
        toggleDriveState: (state, action) => {
            state.googleDrive = action.payload
        },
        deleteDriveAccount: (state, action) => {
            state.deletedDriveAccount = action.payload
        },
        toggleDropBoxState: (state, action) => {
            state.dropBoxActive = action.payload
        },
        deleteDropbox: (state, action) => {
            state.deletedDropBox = action.payload
        },
        toggleConstantContact: (state, action) => {
            state.constantContactActive = action.payload
        },
        deleteConstantContact: (state, action) => {
            state.deletedConstantContact = action.payload
        },
        toggleMailchimp: (state, action) => {
            state.mailchimpActive = action.payload
            console.log("action payload", action.payload)
        },
        deleteMailchimp: (state, action) => {
            state.deletedMailchimp = action.payload
        },
    }
})

export const {
    toggleDriveState,
    deleteDriveAccount,
    toggleDropBoxState,
    deleteConstantContact,
    toggleConstantContact,
    deleteDropbox,
    deleteMailchimp,
    toggleMailchimp
} = integrationSlice.actions
export default integrationSlice.reducer