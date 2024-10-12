import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UtilityState {
  sidebarClick: boolean;
  profileClick: boolean;
  profileSettingClick: boolean;
  chapterMenuClick: boolean;
  manga: any;
  chapterData: any;
  chapterArray: any[];
  nextChapter: any;
  ChapterDisplaySetting: string;
  dataSaver: boolean;
}

const initialState: UtilityState = {
  sidebarClick: false,
  profileClick: false,
  profileSettingClick: false,
  chapterMenuClick: false,
  manga: null,
  chapterData: null,
  chapterArray: [],
  nextChapter: null,
  ChapterDisplaySetting: 'Long Strip',
  dataSaver: true,
};

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    // Toggle sidebar click state
    toggleSidebarClick: (state) => {
      state.sidebarClick = !state.sidebarClick;
    },

    // Toogle profile menu click
    toogleProfileClick: (state) => {
      state.profileClick = !state.profileClick;
    },

    // Set profile setting click
    toogleProfileSettingClick: (state, action: PayloadAction<boolean>) => {
      state.profileSettingClick = action.payload;
    },
    // Toggle chapter menu click state
    toggleChapterMenuClick: (state) => {
      state.chapterMenuClick = !state.chapterMenuClick;
    },
    // Save manga data
    saveMangaData: (state, action: PayloadAction<any>) => {
      state.manga = action.payload;
      localStorage.setItem('manga', JSON.stringify(action.payload)); // Save to localStorage
    },
    // Save chapter data
    saveChapterData: (state, action: PayloadAction<any>) => {
      state.chapterData = action.payload;
      localStorage.setItem('chapterData', JSON.stringify(action.payload)); // Save to localStorage
    },
    // Save chapter array
    saveChapterArray: (state, action: PayloadAction<any[]>) => {
      state.chapterArray = action.payload;
      localStorage.setItem('chapterFeed', JSON.stringify(action.payload)); // Save to localStorage
    },
    // Save next chapter data
    saveNextChapter: (state, action: PayloadAction<any>) => {
      state.nextChapter = action.payload;
      localStorage.setItem('nextChapter', JSON.stringify(action.payload)); // Save to localStorage
    },
    // Set chapter display setting
    setChapterDisplaySetting: (state, action: PayloadAction<string>) => {
      state.ChapterDisplaySetting = action.payload;
    },
    // Toggle data saver
    toggleDataSaver: (state) => {
      state.dataSaver = !state.dataSaver;
    },
    // set data saver
    setDataSaver: (state, action: PayloadAction<boolean>) => {
      state.dataSaver = action.payload
    }
  },
});

export const {
  toggleSidebarClick,
  toogleProfileClick,
  toogleProfileSettingClick,
  toggleChapterMenuClick,
  saveMangaData,
  saveChapterData,
  saveChapterArray,
  saveNextChapter,
  setChapterDisplaySetting,
  toggleDataSaver,
  setDataSaver
} = utilitySlice.actions;

export default utilitySlice.reducer;
