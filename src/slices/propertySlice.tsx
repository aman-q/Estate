import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store"; // Assuming store is properly typed

// Define the state interface
interface PropertyState {
  selectedBHK: '1BHK' | '2BHK' | '3BHK' | null;
  selectedFurnishing: 'Furnished' | 'Semi-furnished' | 'Unfurnished' | null;
  selectedPlaces: string[];
  selectedAmenities: string[];
}

// Initial state
const initialState: PropertyState = {
  selectedBHK: null,
  selectedFurnishing: null,
  selectedPlaces: [],
  selectedAmenities: [],
};

// Create the slice
const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setSelectedBHK: (state, action: PayloadAction<PropertyState["selectedBHK"]>) => {
      state.selectedBHK = action.payload;
    },
    setSelectedFurnishing: (state, action: PayloadAction<PropertyState["selectedFurnishing"]>) => {
      state.selectedFurnishing = action.payload;
    },
    togglePlace: (state, action: PayloadAction<string>) => {
      const place = action.payload;
      state.selectedPlaces = state.selectedPlaces.includes(place)
        ? state.selectedPlaces.filter((p) => p !== place)
        : [...state.selectedPlaces, place];
    },
    toggleAmenity: (state, action: PayloadAction<string>) => {
      const amenity = action.payload;
      state.selectedAmenities = state.selectedAmenities.includes(amenity)
        ? state.selectedAmenities.filter((a) => a !== amenity)
        : [...state.selectedAmenities, amenity];
    },
  },
});

// Export actions
export const {
  setSelectedBHK,
  setSelectedFurnishing,
  togglePlace,
  toggleAmenity,
} = propertySlice.actions;

// Export reducer
export default propertySlice.reducer;

// Selectors (Using RootState)
export const selectSelectedBHK = (state: RootState) => state.property.selectedBHK;
export const selectSelectedFurnishing = (state: RootState) => state.property.selectedFurnishing;
export const selectSelectedPlaces = (state: RootState) => state.property.selectedPlaces;
export const selectSelectedAmenities = (state: RootState) => state.property.selectedAmenities;
