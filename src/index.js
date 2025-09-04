import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { App } from "./components";
import { store } from "./store";
import "./assets/fonts/roboto.css";
import "./assets/fonts/razerf5.css";
import "./assets/css/main.css";
import "./assets/css/tooltip.css";
import "./assets/css/profile.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"),
);
