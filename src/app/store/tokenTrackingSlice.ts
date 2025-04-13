import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TokenRecord {
  name: string;
  symbol: string;
  decimals: number;
  mintAddress: string;
  status: 'success' | 'failed';
  timestamp: number;
}

interface TokenTrackingState {
  createdTokens: TokenRecord[];
}

const initialState: TokenTrackingState = {
  createdTokens: [],
};

export const tokenTrackingSlice = createSlice({
  name: 'tokenTracking',
  initialState,
  reducers: {
    addTokenRecord: (state, action: PayloadAction<TokenRecord>) => {
      state.createdTokens.unshift(action.payload);
    },
    setTokens: (state, action: PayloadAction<TokenRecord[]>) => {
      state.createdTokens = action.payload;
    },
  },
});

export const { addTokenRecord, setTokens } = tokenTrackingSlice.actions;
export default tokenTrackingSlice.reducer;