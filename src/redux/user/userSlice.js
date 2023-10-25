import {createSlice} from '@reduxjs/toolkit'
import {login, updateProfile, userProfile} from './userThunk'
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
      }),

      builder
        .addCase(userProfile.pending, (state) => {
          state.status = 'pending';
        })
        .addCase(userProfile.fulfilled, (state, {payload}) => {
          state.status = 'fulfilled';
          state.currentUser = payload;
        })
        .addCase(userProfile.rejected, (state, {error}) => {
          state.status = 'failed';
          toast.error(error.message)
        }),

      builder
        .addCase(updateProfile.pending, (state) => {
          state.status = 'pending';
        })
        .addCase(updateProfile.fulfilled, (state, {payload}) => {
          state.status = 'fulfilled';
          state.currentUser = payload;
          toast.success('Updated Successfully')
        })
        .addCase(updateProfile.rejected, (state, {error}) => {
          state.status = 'failed';
          toast.error(error.message)
        })
  },
})

export const selectCurrentUser = (state) => state.user.currentUser;

export const {} = userSlice.actions
export default userSlice.reducer
