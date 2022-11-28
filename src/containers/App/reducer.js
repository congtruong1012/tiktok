import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const checkToken = createAsyncThunk("app/checkToken", async () => {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/todos"
//   );
//   return response.data;
// });

const appSlice = createSlice({
  name: "app",
  initialState: {
    isLogin: false,
    user: {},
    isLoading: true,
  },
  reducers: {
    checkToken: (state, action) => {
      state.user = action.payload.data;
      state.isLogin = action.payload.isLogin;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = {};
      state.isLogin = false;
    },
  },
  // extraReducers: (builder) => {
  //   // Add reducers for additional action types here, and handle loading state as needed
  //   builder.addCase(checkToken.fulfilled, (state, action) => {
  //     // Add user to the state array
  //     state.user.push(action.payload);
  //   });
  // },
});

const { reducer, actions } = appSlice;
const { checkToken, logout } = actions;
export { checkToken, logout };

export default reducer;
