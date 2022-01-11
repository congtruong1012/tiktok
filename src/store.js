import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./containers/App/reducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
