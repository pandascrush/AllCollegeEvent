import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import organizerReducer from "./slices/organizerSlice";
import eventReducer from "./slices/eventSlice";
import ticketReducer from "./slices/ticketSlice";
import vibeReducer from './slices/vibeSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    organizer: organizerReducer,
    event: eventReducer,
    ticket: ticketReducer,
    vibes: vibeReducer,
    auth: authReducer
  }
});
