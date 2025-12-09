import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface UiState {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  toasts: Toast[];
}

const initialState: UiState = {
  isSidebarOpen: true,
  isDarkMode: false,
  toasts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      const id = Date.now().toString();
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  toggleSidebar,
  toggleDarkMode,
  setSidebarOpen,
  addToast,
  removeToast,
} = uiSlice.actions;
export default uiSlice.reducer;
