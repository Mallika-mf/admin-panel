/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import "./index.css";
import thunk from "redux-thunk";
import rootReducers from "./components/Store/Reducers/rootReducer";
import { Provider } from "react-redux";
import { AppProvider } from "./components/home/context/app.provider";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import * as serviceWorker from "./serviceWorker";

const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk)
    //reduxFirestore(firebase),
    //reactReduxFirebase(firebase)
  )
);
ReactDOM.render(
  <Provider store={store}>
    <AppProvider>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </AppProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
