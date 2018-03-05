import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { store } from "./stores/rootStore";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "typeface-roboto";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./App", () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  });
}

registerServiceWorker();
