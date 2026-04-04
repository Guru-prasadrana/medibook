import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./slices/doctorSlice";
import slotReducer from "./slices/slotSlice";

export const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    slot: slotReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
