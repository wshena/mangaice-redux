import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
interface LibraryState {
  library: any[];
  user: any | null;  // Add user to the state to sync with localStorage
}

// Helper function to safely get data from localStorage
const getUserFromLocalStorage = (): any | null => {
  if (typeof window !== 'undefined') {  // Check if window is defined (client-side)
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const initialState: LibraryState = {
  library: [],
  user: getUserFromLocalStorage(), // Initialize with user from localStorage if on client-side
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setLibrary: (state, action: PayloadAction<any[]>) => {
      state.library = action.payload;
      // Update user in localStorage when library changes
      if (state.user) {
        const updatedUser = { ...state.user, library: state.library };
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    },
    addToLibrary: (state, action: PayloadAction<any>) => {
      state.library.push(action.payload);
      // Update user in localStorage
      if (state.user) {
        const updatedUser = { ...state.user, library: state.library };
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    },
    removeFromLibrary: (state, action: PayloadAction<string>) => {
      state.library = state.library.filter((manga) => manga.id !== action.payload);
      // Update user in localStorage
      if (state.user) {
        const updatedUser = { ...state.user, library: state.library };
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    },
    clearLibrary: (state) => {
      state.library = [];
      // Update user in localStorage
      if (state.user) {
        const updatedUser = { ...state.user, library: [] };
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    },
  },
});

// Export actions and reducer
export const { setLibrary, addToLibrary, removeFromLibrary, clearLibrary } = librarySlice.actions;
export default librarySlice.reducer;
