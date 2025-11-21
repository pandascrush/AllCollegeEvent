import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"; // ⬅ using your Axios instance

// REGISTER USER
export const registerUser = createAsyncThunk(
  "/auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  "/auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        data.google ? "/auth/google-login" : "/auth/login",
        data
      );

      return res.data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// SEND OTP
export const sendForgotCode = createAsyncThunk(
  "/auth/sendForgotCode",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/forgot", data);
      return res.data; // message
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// VERIFY OTP
export const verifyForgotCode = createAsyncThunk(
  "/auth/verifyForgotCode",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/verify-code", data);
      return res.data; // message
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// RESET PASSWORD
export const resetForgotPassword = createAsyncThunk(
  "/auth/resetForgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/reset", data);
      return res.data; // message
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log(action.payload.token);
        sessionStorage.setItem("UU", action.payload.user._id);
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("ILI", true);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // SEND OTP
    builder
      .addCase(sendForgotCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendForgotCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendForgotCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // VERIFY
    builder
      .addCase(verifyForgotCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyForgotCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyForgotCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // RESET PASSWORD
    builder
      .addCase(resetForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetForgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
