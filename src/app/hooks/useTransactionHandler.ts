import { useState } from 'react';
import { Connection } from '@solana/web3.js';
import { useNotification } from './useNotification';

interface TransactionStatus {
  status: 'idle' | 'pending' | 'confirming' | 'confirmed' | 'failed';
  signature?: string;
  error?: string;
}

type TransactionError = {
  message: string;
} & Error;

export function useTransactionHandler(connection: Connection) {
  const [status, setStatus] = useState<TransactionStatus>({ status: 'idle' });
  const { showNotification } = useNotification();

  const handleTransaction = async (
    operation: () => Promise<string>,
    successMessage: string
  ) => {
    try {
      setStatus({ status: 'pending' });
      showNotification('Preparing transaction...', 'info');

      const signature = await operation();
      
      setStatus({ status: 'confirming', signature });
      showNotification('Confirming transaction...', 'info');

      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed');
      }

      const txDetails = await connection.getTransaction(signature, {
        maxSupportedTransactionVersion: 0,
      });

      // Safe handling of optional blockTime
      const blockTime = txDetails?.blockTime 
        ? new Date(txDetails.blockTime * 1000).toLocaleString()
        : 'Unknown';

      setStatus({ status: 'confirmed', signature });
      showNotification(`${successMessage} Block time: ${blockTime}`, 'success');

      return signature;
    } catch (error: unknown) {
      const typedError = error as TransactionError;
      setStatus({ status: 'failed', error: typedError.message });
      showNotification(`Error: ${typedError.message}`, 'error');
      throw error;
    }
  };

  return { status, handleTransaction };
}