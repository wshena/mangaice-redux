import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryState {
  mangaHistory: any[];
}

const initialState: HistoryState = {
  mangaHistory: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<any[]>) => {
      state.mangaHistory = action.payload;
    },
    addToHistory: (state, action: PayloadAction<any>) => {
      const exists = state.mangaHistory.some((chapter) => chapter.id === action.payload.id);
      if (!exists) {
        state.mangaHistory.push(action.payload);
        localStorage.setItem('mangaHistory', JSON.stringify(state.mangaHistory));
      }
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.mangaHistory = state.mangaHistory.filter(
        (chapter) => chapter.id !== action.payload
      );
      localStorage.setItem('mangaHistory', JSON.stringify(state.mangaHistory));
    },
    clearAllHistory: (state) => {
      state.mangaHistory = [];
      localStorage.removeItem('mangaHistory');
    },
    loadHistoryFromStorage: (state) => {
      const storedHistory = localStorage.getItem('mangaHistory');
      if (storedHistory) {
        state.mangaHistory = JSON.parse(storedHistory);
      }
    },
  },
});

export const { addToHistory, removeFromHistory, clearAllHistory, loadHistoryFromStorage, setHistory } = historySlice.actions;
export default historySlice.reducer;
