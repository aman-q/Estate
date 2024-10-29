export interface PropertyState {
  selectedBHK: string | null;
  selectedFurnishing: string | null;
  selectedPlaces: string[];
  selectedAmenities: string[];
}


export interface Property {
  _id: string;
  title: string;
  propertyType: string;
  BHK: string;
  furnishing: string;
  address: string;
  nearbyPlaces?: string[];
  amenities?: string[];
  type: string;
  squareFeet: number;
  rent: number;
  deposit: number;
  price: number;
  description: string;
  owner: {
    _id: string;
    userEmail?: string;
    firstName?: string;
    lastName?: string;
    isAdmin?: boolean;
    profilePhoto?: string;
  };
  isAdminApproved: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}