import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state interface
interface PropertyState {
  selectedBHK: '1BHK' | '2BHK' | '3BHK' | null; // Specify allowed BHK types
  selectedFurnishing: 'Furnished' | 'Semi-furnished' | 'Unfurnished' | null; // Specify furnishing options
  selectedPlaces: string[];
  selectedAmenities: string[];
}

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
    setSelectedBHK(state, action: PayloadAction<PropertyState["selectedBHK"]>) {
      state.selectedBHK = action.payload;
    },
    setSelectedFurnishing(state, action: PayloadAction<PropertyState["selectedFurnishing"]>) {
      state.selectedFurnishing = action.payload;
    },
    togglePlace(state, action: PayloadAction<string>) {
      const place = action.payload;
      if (state.selectedPlaces.includes(place)) {
        state.selectedPlaces = state.selectedPlaces.filter((p) => p !== place);
      } else {
        state.selectedPlaces.push(place);
      }
    },
    toggleAmenity(state, action: PayloadAction<string>) {
      const amenity = action.payload;
      if (state.selectedAmenities.includes(amenity)) {
        state.selectedAmenities = state.selectedAmenities.filter((a) => a !== amenity);
      } else {
        state.selectedAmenities.push(amenity);
      }
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

// Selectors
export const selectSelectedBHK = (state: { property: PropertyState }) => state.property.selectedBHK;
export const selectSelectedFurnishing = (state: { property: PropertyState }) => state.property.selectedFurnishing;
export const selectSelectedPlaces = (state: { property: PropertyState }) => state.property.selectedPlaces;
export const selectSelectedAmenities = (state: { property: PropertyState }) => state.property.selectedAmenities;
