import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchOrganizer = createAsyncThunk(
  "organizer/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/organizer/me");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const organizerSlice = createSlice({
  name: "organizer",
  initialState: {
    organizer: null,
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganizer.fulfilled, (state, action) => {
        state.loading = false;
        state.organizer = action.payload.organizer;
      });
  }
});

export default organizerSlice.reducer;
