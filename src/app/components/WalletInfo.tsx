'use client';

import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";
import { Card } from './ui/Card';
import { useNotification } from '../hooks/useNotification';

type WalletError = {
  message: string;
} & Error;

export const WalletInfo: FC<{ connection: Connection }> = ({ connection }) => {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const getBalance = async () => {
      if (publicKey && connection) {
        try {
          const lamports = await connection.getBalance(publicKey);
          setBalance(lamports / LAMPORTS_PER_SOL);
          showNotification('Balance updated successfully', 'success');
        } catch (error: unknown) {
          const typedError = error as WalletError;
          showNotification(`Error fetching balance: ${typedError.message}`, 'error');
        }
      }
    };

    if (connected) {
      getBalance();
    }
  }, [publicKey, connection, connected, showNotification]);

  if (!connected || !publicKey) return null;

  return (
    <Card className="mt-4">
      <div className="space-y-2">
        <p className="text-white">
          <strong>Wallet Address:</strong> {publicKey.toBase58()}
        </p>
        <p className="text-white">
          <strong>Balance:</strong> {balance !== null ? `${balance} SOL` : "Loading..."}
        </p>
      </div>
    </Card>
  );
};