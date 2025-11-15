import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchTicketTypes = createAsyncThunk(
  "ticket/types",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/tickets/types/${eventId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerTicket = createAsyncThunk(
  "ticket/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/tickets/register", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    types: [],
    registration: null,
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTicketTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload.types;
      })
      .addCase(registerTicket.fulfilled, (state, action) => {
        state.registration = action.payload.registration;
      });
  }
});

export default ticketSlice.reducer;
