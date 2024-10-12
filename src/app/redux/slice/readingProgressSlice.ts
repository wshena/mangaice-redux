import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReadingProgressState {
  progress: number[]; // Array untuk menyimpan progress tiap gambar
}

const initialState: ReadingProgressState = {
  progress: [],
};

const readingProgressSlice = createSlice({
  name: 'readingProgress',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number[]>) => {
      state.progress = action.payload;
    },
    updateProgress: (state, action: PayloadAction<{ index: number; value: number }>) => {
      const { index, value } = action.payload;
      if (index >= 0 && index < state.progress.length) {
        state.progress[index] = value; // Update progress untuk gambar tertentu
      }
    },
    resetProgress: (state) => {
      state.progress = [];
    },
  },
});

export const { setProgress, updateProgress, resetProgress } = readingProgressSlice.actions;
export default readingProgressSlice.reducer;
