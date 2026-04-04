import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Slot } from "@/app/lib/slot";
import { getSlotsByDoctorId } from "@/lib/services/slot.api";

// 🔥 THUNK
export const fetchSlotsByDoctorId = createAsyncThunk(
  "slot/fetchSlotsByDoctorId",
  async (doctorId: number) => {
    return await getSlotsByDoctorId(doctorId);
  },
);

// 🔥 STATE
interface SlotState {
  slots: Slot[];
  loading: boolean;
  error: string | null;
}

const initialState: SlotState = {
  slots: [],
  loading: false,
  error: null,
};

// 🔥 SLICE
const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlotsByDoctorId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSlotsByDoctorId.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
      })
      .addCase(fetchSlotsByDoctorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching slots";
      });
  },
});

export default slotSlice.reducer;
