import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionStatus {
  status: 'pending' | 'confirming' | 'confirmed' | 'failed';
  signature?: string;
  error?: string;
}

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface TokenState {
  tokenMint: string;
  recipient: string;
  amount: string;
  transactionStatus: TransactionStatus | null;
  notification: Notification | null;
}

const initialState: TokenState = {
  tokenMint: '',
  recipient: '',
  amount: '',
  transactionStatus: null,
  notification: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokenMint: (state, action: PayloadAction<string>) => {
      state.tokenMint = action.payload;
    },
    setRecipient: (state, action: PayloadAction<string>) => {
      state.recipient = action.payload;
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    setTransactionStatus: (state, action: PayloadAction<TransactionStatus | null>) => {
      state.transactionStatus = action.payload;
    },
    setNotification: (state, action: PayloadAction<Notification | null>) => {
      state.notification = action.payload;
    },
    resetForm: (state) => {
      state.amount = '';
      state.recipient = '';
    },
  },
});

export const {
  setTokenMint,
  setRecipient,
  setAmount,
  setTransactionStatus,
  setNotification,
  resetForm,
} = tokenSlice.actions;

export default tokenSlice.reducer;