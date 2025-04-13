import { useState, useEffect } from 'react';
import { Connection, PublicKey, ParsedTransactionWithMeta } from '@solana/web3.js';
import { useNotification } from './useNotification';
import { getTokenBalances, getTransactionHistory } from '../utils/solana';
import type { TokenInfo } from '../utils/solana';

type SolanaError = {
  message: string;
} & Error;

export function useSolanaData(connection: Connection, publicKey: PublicKey | null) {
  const [tokenBalances, setTokenBalances] = useState<TokenInfo[]>([]);
  const [transactions, setTransactions] = useState<ParsedTransactionWithMeta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!publicKey) return;

      setIsLoading(true);
      try {
        const [balances, txHistory] = await Promise.all([
          getTokenBalances(connection, publicKey),
          getTransactionHistory(connection, publicKey)
        ]);

        if (mounted) {
          setTokenBalances(balances);
          setTransactions(txHistory);
        }
      } catch (error: unknown) {
        const typedError = error as SolanaError;
        showNotification(typedError.message, 'error');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    
    // Set up websocket connection for real-time updates
    const subscriptionId = connection.onAccountChange(
      publicKey!,
      () => {
        fetchData();
      },
      'confirmed'
    );

    return () => {
      mounted = false;
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [connection, publicKey, showNotification]);

  return { tokenBalances, transactions, isLoading };
}