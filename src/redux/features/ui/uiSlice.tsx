import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState = {
  activeSidebarItem: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSidebarItem: (state, action) => {
      state.activeSidebarItem = action.payload;
    },
  },
});

export const { setActiveSidebarItem } = uiSlice.actions;
export default uiSlice.reducer;

export const selectActiveSidebarItem = (state: RootState) => state.ui.activeSidebarItem;
