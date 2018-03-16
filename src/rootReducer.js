import { combineReducers } from "redux";
import { router } from "react-router-redux";
import { blocks } from "./reducers/blocksReducer";

export default combineReducers({
  router,
  blocks,
});
