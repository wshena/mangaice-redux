import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarouselState {
  currentIndex: number;
  itemsToShow: number;
  isAnimating: boolean;
}

const initialState: CarouselState = {
  currentIndex: 0,
  itemsToShow: 1,
  isAnimating: false,
};

const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setItemsToShow: (state, action: PayloadAction<number>) => {
      state.itemsToShow = action.payload;
    },
    setIsAnimating: (state, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload;
    }
  }
});

export const { setCurrentIndex, setItemsToShow, setIsAnimating } = carouselSlice.actions;

export default carouselSlice.reducer;
