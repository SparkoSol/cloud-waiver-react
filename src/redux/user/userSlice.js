import {createSlice} from '@reduxjs/toolkit'
import {login} from './userThunk'
import toast from "react-hot-toast";

const initialUserState = {
  currentUser: null,
  status: 'idle'
}


const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    // Add extra reducers using the builder notation
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.currentUser = payload;
      })
      .addCase(login.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })
  },
})

export const selectCurrentUser = (state) => state.user.currentUser;

export const {} = userSlice.actions
export default userSlice.reducer
