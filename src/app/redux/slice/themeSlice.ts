import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state:any, action: PayloadAction<string>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
    },
    toggleTheme: (state:any) => {
      const themes = ['light', 'dark', 'slate', 'dracula'];
      const currentThemeIndex = themes.indexOf(state.theme);
      const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
      state.theme = nextTheme;
      localStorage.setItem('theme', nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
