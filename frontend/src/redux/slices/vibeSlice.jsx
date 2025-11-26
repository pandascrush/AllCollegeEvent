import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api  from "../api";  

export const fetchVibes = createAsyncThunk(
  "vibe/fetchVibes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/vibe/get_vibe");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch vibes");
    }
  }
);

export const createVibe = createAsyncThunk(
  "vibe/createVibe",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/vibe/create_vibe", formData);
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create vibe");
    }
  }
);

export const updateVibe = createAsyncThunk(
  "vibe/updateVibe",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/vibe/update_vibe/${id}`, formData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update vibe");
    }
  }
);

const vibeSlice = createSlice({
  name: "vibe",
  initialState: {
    vibes: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchVibes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchVibes.fulfilled, (state, action) => {
      state.loading = false;
      state.vibes = action.payload;
    });
    builder.addCase(fetchVibes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // CREATE
    builder.addCase(createVibe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createVibe.fulfilled, (state, action) => {
      state.loading = false;
      state.vibes.push(action.payload);
    });
    builder.addCase(createVibe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // UPDATE
    builder.addCase(updateVibe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateVibe.fulfilled, (state, action) => {
      state.loading = false;

      const index = state.vibes.findIndex(v => v._id === action.payload._id);
      if (index !== -1) {
        state.vibes[index] = action.payload;
      }
    });
    builder.addCase(updateVibe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default vibeSlice.reducer;
