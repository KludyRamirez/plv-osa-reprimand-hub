import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({});

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

const store = createStore(
  rootReducer,
  loadState(),
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
