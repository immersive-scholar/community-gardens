import React from "react";
import { hydrate, render } from "react-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducers";

import App from "App";
import store from "store";
import * as serviceWorker from "serviceWorker";

import "index.css";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
