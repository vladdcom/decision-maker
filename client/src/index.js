import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./page/App";
import configureStore from "./store";

import "./index.css";

// initializing
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
