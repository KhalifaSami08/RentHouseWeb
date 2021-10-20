import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { teal, red, purple } from "@material-ui/core/colors";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { PropertyReducer } from "./store/reducer/PropertyReducer";
import { ContractReducer } from "./store/reducer/ContractReducer";
import { ClientReducer } from "./store/reducer/ClientReducer";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: teal[800],
    },
    secondary: {
      main: purple[800],
    },
    error: red,
  },
});

const rootReducer = combineReducers({
  reducerPropertyKey: PropertyReducer,
  reducerClientKey: ClientReducer,
  reducerContractKey: ContractReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  //  </React.StrictMode>
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
