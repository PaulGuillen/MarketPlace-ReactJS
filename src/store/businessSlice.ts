import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreState {
  userUid: string | null;
  businessUid: string | null;
}

const initialState: StoreState = {
  userUid: null,
  businessUid: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setInformationBusiness(state, action: PayloadAction<{ userUid: string; businessUid: string }>) {
      state.userUid = action.payload.userUid;
      state.businessUid = action.payload.businessUid;
    },
    clearUids(state) {
      state.userUid = null;
      state.businessUid = null;
    },
  },
});

export const { setInformationBusiness, clearUids } = storeSlice.actions;

export default storeSlice.reducer;
