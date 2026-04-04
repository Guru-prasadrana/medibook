import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Doctor } from "@/app/types/doctor";
import {
  getDoctors,
  searchDoctorByName,
  searchDoctorByLocation,
  getDoctorById,
} from "@/lib/services/doctor.api";

export const fetchDoctors = createAsyncThunk(
  "doctor/fetchDoctors",
  async (specialization?: string) => {
    return await getDoctors(specialization);
  },
);

export const fetchDoctorsByName = createAsyncThunk(
  "doctor/fetchDoctorsByName",
  async (name: string) => {
    return await searchDoctorByName(name);
  },
);

export const fetchDoctorsByLocation = createAsyncThunk(
  "doctor/fetchDoctorsByLocation",
  async (location: string) => {
    return await searchDoctorByLocation(location);
  },
);

export const fetchDoctorById = createAsyncThunk(
  "doctor/fetchDoctorById",
  async (id: number) => {
    return await getDoctorById(id);
  },
);

interface DoctorState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  loading: boolean; // for list operations
  loadingById: boolean; // for single doctor fetch
  error: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  selectedDoctor: null,
  loading: false,
  loadingById: false,
  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔹 fetchDoctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
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
      .addCase(fetchDoctorsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error searching doctors";
      })

      // 🔹 search by location
      .addCase(fetchDoctorsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error searching by location";
      })

      // 🔹 get by id — uses loadingById, not loading
      .addCase(fetchDoctorById.pending, (state) => {
        state.loadingById = true;
        state.error = null;
        state.selectedDoctor = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loadingById = false;
        state.selectedDoctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loadingById = false;
        state.error = action.error.message || "Error fetching doctor";
      });
  },
});

export default doctorSlice.reducer;
