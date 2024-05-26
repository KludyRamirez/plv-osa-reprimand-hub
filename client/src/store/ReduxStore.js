import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import AuthReducer from "./reducers/AuthReducers";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("user");
//     return serializedState ? JSON.parse(serializedState) : undefined;
//   } catch (err) {
//     console.error("Error loading User details", err);
//     return undefined;
//   }
// };

// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("user", serializedState);
//   } catch (err) {
//     console.error("Error saving User details", err);
//   }
// };

const ReduxStore = createStore(
  rootReducer,
  // loadState(),
  composeWithDevTools(applyMiddleware(thunk))
);

// ReduxStore.subscribe(() => {
//   saveState(ReduxStore.getState());
// });

export default ReduxStore;
