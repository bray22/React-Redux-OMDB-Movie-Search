import { createStore } from "redux";
import movieReducer from "./reducers/movieReducer";

const store = createStore(movieReducer);

export default store;