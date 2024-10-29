import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "../slices/propertySlice";
import { PropertyState } from "./types"; // Adjust the path as necessary

// Define RootState using the type from propertySlice
export type RootState = {
  property: PropertyState;
};

export const store = configureStore({
  reducer: {
    property: propertyReducer,
  },
});

// Types for dispatch and state
export type AppDispatch = typeof store.dispatch; 
