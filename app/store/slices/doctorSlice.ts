import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Doctor } from "@/app/types/doctor";
import {
  getDoctors,
  searchDoctorByName,
  searchDoctorByLocation,
  getDoctorById,
} from "@/lib/services/doctor.api";
// -------------------- THUNKS --------------------

// Get doctors (with specialization)
export const fetchDoctors = createAsyncThunk(
  "doctor/fetchDoctors",
  async (specialization?: string) => {
    return await getDoctors(specialization);
  },
);

// Search by name
export const fetchDoctorsByName = createAsyncThunk(
  "doctor/fetchDoctorsByName",
  async (name: string) => {
    return await searchDoctorByName(name);
  },
);

// Search by location
export const fetchDoctorsByLocation = createAsyncThunk(
  "doctor/fetchDoctorsByLocation",
  async (location: string) => {
    return await searchDoctorByLocation(location);
  },
);

// Get single doctor
export const fetchDoctorById = createAsyncThunk(
  "doctor/fetchDoctorById",
  async (id: number) => {
    return await getDoctorById(id);
  },
);

// -------------------- STATE --------------------

interface DoctorState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  selectedDoctor: null,
  loading: false,
  error: null,
};

// -------------------- SLICE --------------------

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔹 fetchDoctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching doctors";
      })

      // 🔹 search by name
      .addCase(fetchDoctorsByName.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })

      // 🔹 search by location
      .addCase(fetchDoctorsByLocation.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })

      // 🔹 get by id
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.selectedDoctor = action.payload;
      });
  },
});

export default doctorSlice.reducer;
