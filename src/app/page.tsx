'use client';

import dynamic from 'next/dynamic';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

const WalletClientProviderDynamic = dynamic(
  () => import('./components/WalletClientProvider').then(mod => mod.WalletClientProvider),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);

export default function App() {
  return (
    <Provider store={store}>
      <WalletClientProviderDynamic />
    </Provider>
  );
}
