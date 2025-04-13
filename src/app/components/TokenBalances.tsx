'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { Card } from './ui/Card';
import { useSolanaData } from '../hooks/useSolanaData';
import { formatAddress } from '../utils/solana';

export const TokenBalances: FC<{ connection: Connection }> = ({ connection }) => {
  const { publicKey } = useWallet();
  const { tokenBalances, isLoading } = useSolanaData(connection, publicKey);

  if (isLoading) {
    return (
      <Card title="Token Balances">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-700 rounded" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card title="Token Balances">
      <div className="overflow-x-auto">
        <table className="min-w-full text-white">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2 text-left">Token</th>
              <th className="py-2 text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {tokenBalances.map((token) => (
              <tr key={token.mint} className="border-b border-gray-700">
                <td className="py-2 text-left">{formatAddress(token.mint)}</td>
                <td className="py-2 text-right">{token.amount}</td>
              </tr>
            ))}
            {tokenBalances.length === 0 && (
              <tr>
                <td colSpan={2} className="py-4 text-center text-gray-400">
                  No tokens found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};