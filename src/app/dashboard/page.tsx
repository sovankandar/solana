'use client';

import dynamic from 'next/dynamic';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const WalletClientProviderDynamic = dynamic(
  () => import('../components/WalletClientProvider').then(mod => mod.WalletClientProvider),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary text-xl font-semibold">
          Loading Solana Dashboard...
        </div>
      </div>
    )
  }
);

export default function Dashboard() {
  return (
    <Provider store={store}>
      <WalletClientProviderDynamic />
    </Provider>
  );
}