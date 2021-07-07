import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware];
  const middleware = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, preloadedState);
  return store;
}
