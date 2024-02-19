import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/lib/integration/react";
import App from "./App";
// import { ToastContainer } from "react-toastify";
import { store, persistor, history } from "./Store";
import "./Assets/Scss/globalStyleSheet.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
// import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS
// import "react-pro-sidebar/dist/css/styles.css";
// import reportWebVitals from "./reportWebVitals";
// import Notification from './helpers/Notifications';


const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate persistor={persistor}>
        {/* <Notification /> */}
        {/* <ToastContainer /> */}
        <App />
      </PersistGate>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
