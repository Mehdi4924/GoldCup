import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "name",
  initialState: {
    user: '',
    video: '',
    banner:"",
    seconds:"",
    minutes:"",
  },
  reducers: {
    setUser: ((state, action) => {
      state.user = action.payload;
    }),
    setVideo: ((state, action) => {
      state.video = action.payload;
    }),
    setbanner: ((state, action) => {
      state.banner = action.payload;
    }),
    setSeconds: ((state, action) => {
      state.seconds = action.payload;
    }),
    setMinutes: ((state, action) => {
      state.minutes = action.payload;
    }),
  },
});
export const { setUser, setVideo ,setbanner,setSeconds,setMinutes} = mainSlice.actions;
export const nameReducer = mainSlice.reducer;

