import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import organizerReducer from "./slices/organizerSlice";
import eventReducer from "./slices/eventSlice";
import ticketReducer from "./slices/ticketSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    organizer: organizerReducer,
    event: eventReducer,
    ticket: ticketReducer
  }
});
