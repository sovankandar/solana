'use client';

import { FC } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { NotificationManager } from './ui/NotificationManager';
import { Dashboard } from './Dashboard';

export const WalletClientProvider: FC = () => {
  const endpoint = clusterApiUrl('devnet');
  const wallets = [new PhantomWalletAdapter()];
  const connection = new Connection(endpoint);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Dashboard connection={connection} />
          <NotificationManager />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};