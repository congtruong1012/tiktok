import { createSelector, createSlice } from "@reduxjs/toolkit";
import union from "../../../utils/union";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    videoStorage: (state, { payload }) => {
      const { byId, allIds } = payload;
      state.byId = { ...state.byId, ...byId };
      state.allIds = union(state.allIds, allIds);
    },
    updateVideo: (state, { payload }) => {
      const { id, byId } = payload;
      if (Object.keys(state.byId).includes(`${id}`)) {
        state.byId[id] = byId;
      }
    },
  },
});

const { getInitialState, reducer, actions } = videoSlice;

const selectVideo = (state) => state?.video?.byId || getInitialState()?.byId;
const getVideoId = (_, id) => id;
const makeSelectVideoInfo = createSelector(
  selectVideo,
  getVideoId,
  (video, id) => {
    return video?.[id] || null;
  }
);

const { videoStorage, updateVideo } = actions;
export { videoStorage, updateVideo, makeSelectVideoInfo };
export default reducer;
