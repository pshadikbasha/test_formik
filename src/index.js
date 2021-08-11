import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

// action types
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { func } from "prop-types";
const logger = createLogger({});

const initialState = {
  loading: false,
  users: [],
  error: "",
};
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCESS = "FETCH_USERS_SUCESS";
const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST,
  };
}

const fetchUserSucess = (users) => {
  return {
    type: FETCH_USERS_SUCESS,
    payload: users,
  };
};
const fetchUserError = (error) => {
  return {
    type: FETCH_USERS_ERROR,
    payload: error,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USERS_SUCESS":
      return {
        loading: false,
        users: action.payload,
      };
    case "FETCH_USERS_ERROR":
      return {
        loading: false,
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data;
        dispatch(fetchUserSucess(users));
      })
      .catch((error) => {
        dispatch(fetchUserError(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log("store state is", store.getState()));
store.dispatch(fetchUsers);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
