import { createSelector, createSlice } from "@reduxjs/toolkit";
import union from "../../../utils/union";

const userSlice = createSlice({
  name: "user",
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    userStorage: (state, { payload }) => {
      const { byId, allIds } = payload;
      state.byId = { ...state.byId, ...byId };
      state.allIds = union(state.allIds, allIds);
    },
    updateUser: (state, { payload }) => {
      const { id, byId } = payload;
      if (Object.keys(state.byId).includes(`${id}`)) {
        state.byId[id] = byId;
      }
    },
  },
});

const { getInitialState, reducer, actions } = userSlice;

const userSelectUser = (state) => state?.user?.byId || getInitialState()?.byId;
const getUserId = (_, id) => id;
const makeSelectUserInfo = createSelector(
  userSelectUser,
  getUserId,
  (user, id) => {
    return user?.[id] || null;
  }
);

const { userStorage, updateUser } = actions;
export { userStorage, updateUser, makeSelectUserInfo };
export default reducer;
