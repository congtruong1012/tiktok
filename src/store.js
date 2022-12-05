import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./containers/App/reducer";
import userReducer from "./containers/Features/User/reducer";
import videoReducer from "./containers/Features/Video/reducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    video: videoReducer,
  },
});
