import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    googleDrive: false,
    deletedDriveAccount: false,
    dropBoxActive: false,
    deletedDropBox: false
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
        }
    }
})

export const {toggleDriveState, deleteDriveAccount, toggleDropBoxState} = integrationSlice.actions
export default integrationSlice.reducer