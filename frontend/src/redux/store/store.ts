import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "../slice/ModalSlice";

export const store = configureStore({
  reducer: {
    modal: ModalSlice,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
