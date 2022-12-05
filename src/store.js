import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./containers/App/reducer";
import userReducer from "./containers/Features/User/reducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});
