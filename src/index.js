import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// action types
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
const logger = createLogger({});
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}
function buyIcecream() {
  return {
    type: BUY_ICECREAM,
    info: "second redux action",
  };
}
// const initialState = {
//   count: 100,
//   icecream:10,
// };
const initialCountState = {
  count: 100,
};
const initialIcecreamState = {
  icecream: 10,
};

const countReducer = (state = initialCountState, action) => {
  switch (action.type) {
    case "BUY_CAKE":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
const countIcecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case "BUY_ICECREAM":
      return {
        ...state,
        icecream: state.icecream - 1,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  count: countReducer,
  icecream: countIcecreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("the store is", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsubscribe();

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
