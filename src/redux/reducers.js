import {persistCombineReducers} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {encryptTransform} from "redux-persist-transform-encrypt";
import userSlice from "./user/userSlice.js";


const allReducers = persistCombineReducers({
  key: 'root-user',
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  whitelist: ['user'],
},{
  user: userSlice,
})

export default allReducers
