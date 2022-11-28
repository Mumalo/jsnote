import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Provider } from "react-redux";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { store } from "./state";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store} >
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
)
