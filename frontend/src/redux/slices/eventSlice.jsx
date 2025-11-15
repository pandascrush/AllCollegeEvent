import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchEvents = createAsyncThunk(
  "events/all",
  async (query, { rejectWithValue }) => {
    try {
      const res = await api.get("/events", { params: query });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSingleEvent = createAsyncThunk(
  "events/single",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/events/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    selectedEvent: null,
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
      })
      .addCase(fetchSingleEvent.fulfilled, (state, action) => {
        state.selectedEvent = action.payload.event;
      });
  }
});

export default eventSlice.reducer;
