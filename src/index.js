import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./redux/store.js";
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="624151635976-svriaorhnerjpgj61modfe8k7sh5fbde.apps.googleusercontent.com">
      <App/>
        </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
)
