import {persistCombineReducers} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {encryptTransform} from "redux-persist-transform-encrypt";
import userSlice from "./user/userSlice.js";
import customerSlice from "./customers/customerSlice.js";
import teamSlice from "./team/teamSlice.js";
import waiverSlice from "./waivers/waiverSlice";
import integrationSlice from "./integration-new/integrationSlice";


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
    whitelist: ['user', 'integration', 'teams'],
}, {
    user: userSlice,
    customers: customerSlice,
    teams: teamSlice,
    waivers: waiverSlice,
    integration: integrationSlice
})

export default allReducers
