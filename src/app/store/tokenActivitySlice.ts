import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TokenActivity {
  mintAddress: string;
  amount: number;
  recipient?: string;
  timestamp: number;
  signature: string;
  status: 'success' | 'failed';
  type: 'mint' | 'send';
}

interface TokenActivityState {
  mintActivities: TokenActivity[];
  sendActivities: TokenActivity[];
}

const initialState: TokenActivityState = {
  mintActivities: [],
  sendActivities: [],
};

export const tokenActivitySlice = createSlice({
  name: 'tokenActivity',
  initialState,
  reducers: {
    addMintActivity: (state, action: PayloadAction<TokenActivity>) => {
      state.mintActivities.unshift(action.payload);
    },
    addSendActivity: (state, action: PayloadAction<TokenActivity>) => {
      state.sendActivities.unshift(action.payload);
    },
    setMintActivities: (state, action: PayloadAction<TokenActivity[]>) => {
      state.mintActivities = action.payload;
    },
    setSendActivities: (state, action: PayloadAction<TokenActivity[]>) => {
      state.sendActivities = action.payload;
    },
  },
});

export const { addMintActivity, addSendActivity, setMintActivities, setSendActivities } = tokenActivitySlice.actions;
export default tokenActivitySlice.reducer;