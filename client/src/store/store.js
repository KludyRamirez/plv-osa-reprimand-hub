import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

import AuthReducer from "./reducers/AuthReducers";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(process.env.LOCAL_STORAGE_KEY);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Error loading User details", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(process.env.LOCAL_STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Error saving User details", err);
  }
};

const Store = legacy_createStore(
  rootReducer,
  loadState(),
  composeWithDevTools(applyMiddleware(thunk))
);

Store.subscribe(() => {
  saveState(Store.getState());
});

export default Store;
