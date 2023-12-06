import {createSlice} from '@reduxjs/toolkit'
import {
    getMembers,
    login,
    updatePaymentMethods,
    updatePlan,
    updateProfile,
    updateProfilePicture,
    userProfile
} from './userThunk'
import toast from "react-hot-toast";

const initialUserState = {
  currentUser: null,
  members:null,
  status: 'idle'
}


const userSlice = createSlice({
  extraReducers: (builder) => {
    // Add extra reducers using the builder notation
    builder
        .addCase(login.pending, (state) => {
          state.status = 'pending';
        })
        .addCase(login.fulfilled, (state, {payload}) => {
          state.status = 'fulfilled';
          if (typeof payload !== 'string') {
            state.currentUser = payload;
          }
        })
        .addCase(login.rejected, (state, {error}) => {
          state.status = 'failed';
          toast.error(error.message)
        })

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
        })

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

    builder
        .addCase(getMembers.pending, (state) => {
          state.status = 'pending';
        })
        .addCase(getMembers.fulfilled, (state, {payload}) => {
          state.status = 'fulfilled';
          state.members = payload;
        })
        .addCase(getMembers.rejected, (state, {error}) => {
          state.status = 'failed';
          toast.error(error.message)
        })

      builder
          .addCase(updateProfilePicture.pending, (state, {payload}) => {
              state.status = 'pending';
          })
          .addCase(updateProfilePicture.fulfilled, (state, {payload}) => {
              state.status = 'fulfilled';
              console.log("here: ", payload)
              state.currentUser.profile_picture = payload.url;
          })
          .addCase(updateProfilePicture.rejected, (state, {error}) => {
              state.status = 'failed';
              toast.error(error.message)
          })

    builder
        .addCase(updatePaymentMethods.pending, (state, {payload}) => {
            state.status = 'pending';
        })
        .addCase(updatePaymentMethods.fulfilled, (state, {payload}) => {
            state.status = 'fulfilled';
            state.currentUser = payload.user;
        })
        .addCase(updatePaymentMethods.rejected, (state, {error}) => {
            state.status = 'failed';
            toast.error(error.message)
        })
      builder
          .addCase(updatePlan.pending, (state, {payload}) => {
              state.status = 'pending';
          })
          .addCase(updatePlan.fulfilled, (state, {payload}) => {
              state.status = 'fulfilled';
              state.currentUser = payload.user;
          })
          .addCase(updatePlan.rejected, (state, {error}) => {
              state.status = 'failed';
              toast.error(error.message)
          })
  },
  initialState: initialUserState,
  name: 'user',
  reducers: {},
})

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectMember = (state) => state.user.members;
export const selectPaymentMethods = (state) => state.user.currentUser.paymentMethods;
export const selectInvoicesData = (state) => state.user.currentUser.invoices;
export default userSlice.reducer
