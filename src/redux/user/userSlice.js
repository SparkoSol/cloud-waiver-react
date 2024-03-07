import {createSlice} from '@reduxjs/toolkit'
import {
  createPlan,
  detachPaymentMethod,
  getAllInvoices,
  getAllMethods,
  getMembers,
  login,
  setDefaultMethod,
  updatePaymentMethods,
  updatePlan,
  updateProfile,
  updateProfilePicture,
  userProfile
} from './userThunk'

import toast from "react-hot-toast";
import {convertToObjects} from "../../utils/generalFunctions";

const initialUserState = {
  currentUser: null,
  members: null,
  invoices: null,
  methods: null,
  status: 'idle'
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    updateUserProfile: (state, {payload}) => {
      state.currentUser.profile_picture = payload
    },
    resetUser: (state, {payload}) => {
      state.currentUser = null
    }
  },
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
        if (!state.currentUser.customer) state.currentUser.customer = {}
        state.currentUser.customer.invoice_settings = {default_payment_method: payload.id};

        if (Array.isArray(state.methods)) {
          state.methods.push(payload);
        } else {
          state.methods = [payload];
        }
      })
      .addCase(updatePaymentMethods.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(getAllMethods.pending, (state, {payload}) => {
        state.status = 'pending';
      })
      .addCase(getAllMethods.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.methods = payload.data
      })
      .addCase(getAllMethods.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(detachPaymentMethod.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(detachPaymentMethod.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.methods = state.methods.filter(item => item.id !== payload.id);
      })
      .addCase(detachPaymentMethod.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(setDefaultMethod.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(setDefaultMethod.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.currentUser.customer.invoice_settings = payload.invoice_settings
      })
      .addCase(setDefaultMethod.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(getAllInvoices.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getAllInvoices.fulfilled, (state, {payload}) => {
        state.status = 'fulfilled';
        state.invoices = payload?.data
      })
      .addCase(getAllInvoices.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(createPlan.pending, (state, {payload}) => {
        state.status = 'pending';
      })
      .addCase(createPlan.fulfilled, (state, {payload}) => {
        const {data = null, items} = payload;
        state.status = 'fulfilled';
        state.currentUser.subscription = {
          id: data?.id,
          status: "active",
          current_period_start: data?.start,
          current_period_end: data?.end,
          items: convertToObjects(items)
        }
        toast.success('Plan updates Successfully')
      })
      .addCase(createPlan.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })

    builder
      .addCase(updatePlan.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updatePlan.fulfilled, (state, {payload}) => {
        const {data, items} = payload;
        state.status = 'fulfilled';
        state.currentUser.subscription = {
          id: data.id,
          status: "active",
          current_period_start: data.start,
          current_period_end: data.end,
          items: convertToObjects(items)
        }
        toast.success('Plan updates Successfully')
      })
      .addCase(updatePlan.rejected, (state, {error}) => {
        state.status = 'failed';
        toast.error(error.message)
      })
  }
})

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectMember = (state) => state.user.members;
export const selectPaymentMethods = (state) => state.user.methods;
export const selectInvoicesData = (state) => state.user.invoices;
export const selectCurrentPlan = state => state.user.currentUser?.customer?.invoice_settings.default_payment_method;


export const {updateUserProfile, resetUser} = userSlice.actions;
export default userSlice.reducer
