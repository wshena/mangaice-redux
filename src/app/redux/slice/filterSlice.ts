import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  order: string;
  contentRating: any[];
  publicationStatus: any[];
  publicationDemographic: any[];
  includedTagsFilter: any[];
  excludedTagsFilter: any[];
  resetButtonClick: boolean;
}

const initialState: FilterState = {
  order: '',
  contentRating: [],
  publicationStatus: [],
  publicationDemographic: [],
  includedTagsFilter: [],
  excludedTagsFilter: [],
  resetButtonClick: false,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    },
    setContentRating: (state, action: PayloadAction<any[]>) => {
      state.contentRating = action.payload;
    },
    setPublicationStatus: (state, action: PayloadAction<any[]>) => {
      state.publicationStatus = action.payload;
    },
    setPublicationDemographic: (state, action: PayloadAction<any[]>) => {
      state.publicationDemographic = action.payload;
    },
    setIncludedTagsFilter: (state, action: PayloadAction<any[]>) => {
      state.includedTagsFilter = action.payload;
    },
    setExcludedTagsFilter: (state, action: PayloadAction<any[]>) => {
      state.excludedTagsFilter = action.payload;
    },
    resetAllFilters: (state) => {
      state.order = '';
      state.contentRating = [];
      state.publicationStatus = [];
      state.publicationDemographic = [];
      state.includedTagsFilter = [];
      state.excludedTagsFilter = [];
    },
    setResetButtonClick: (state, action: PayloadAction<boolean>) => {
      state.resetButtonClick = action.payload;
    },
  },
});

export const {
  setOrder,
  setContentRating,
  setPublicationStatus,
  setPublicationDemographic,
  setIncludedTagsFilter,
  setExcludedTagsFilter,
  resetAllFilters,
  setResetButtonClick,
} = filterSlice.actions;

export default filterSlice.reducer;
