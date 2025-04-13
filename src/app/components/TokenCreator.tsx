'use client';

import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { StatusMessage } from './ui/StatusMessage';
import { createNewToken } from '../utils/tokenOperations';
import { useTransactionHandler } from '../hooks/useTransactionHandler';
import { useNotification } from '../hooks/useNotification';
import type { TokenCreationResult } from '../utils/tokenOperations';
import { useDispatch } from 'react-redux';
import { addTokenRecord } from '../store/tokenTrackingSlice';

interface TokenCreatorProps {
  connection: Connection;
}

export const TokenCreator: FC<TokenCreatorProps> = ({ connection }) => {
  const { publicKey, sendTransaction } = useWallet();
  const { status: txStatus, handleTransaction } = useTransactionHandler(connection);
  const { showNotification } = useNotification();
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [decimals, setDecimals] = useState('9');
  const dispatch = useDispatch();
  const [tokenStatus, setTokenStatus] = useState('');

  const createToken = async () => {
    if (!publicKey || !sendTransaction) {
      showNotification('Please connect your wallet first', 'error');
      return;
    }

    try {
      let tokenResult: TokenCreationResult | undefined;
      await handleTransaction(
        async () => {
          tokenResult = await createNewToken(
            { connection, publicKey, sendTransaction },
            Number(decimals)
          );
          return tokenResult.signature;
        },
        'Token created successfully!'
      );

      if (tokenResult) {
        dispatch(addTokenRecord({
          name: tokenName,
          symbol: tokenSymbol,
          decimals: Number(decimals),
          mintAddress: tokenResult.mint.toBase58(),
          status: 'success',
          timestamp: Date.now()
        }));
        setTokenStatus(`Token created successfully!\nMint address: ${tokenResult.mint.toBase58()}\nToken Account: ${tokenResult.tokenAccount.address.toBase58()}`);
      }
    } catch {
      dispatch(addTokenRecord({
        name: tokenName,
        symbol: tokenSymbol,
        decimals: Number(decimals),
        mintAddress: 'Failed to create',
        status: 'failed',
        timestamp: Date.now()
      }));
    }
  };

  return (
    <Card title="Create New Token">
      <div className="space-y-4">
        <Input
          label="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="My Token"
        />
        <Input
          label="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          placeholder="MTK"
        />
        <Input
          label="Decimals"
          type="number"
          value={decimals}
          onChange={(e) => setDecimals(e.target.value)}
          placeholder="9"
        />
        <Button
          onClick={createToken}
          disabled={!publicKey}
          isLoading={txStatus.status === 'pending'}
        >
          Create Token
        </Button>
        {tokenStatus && (
          <StatusMessage
            status={tokenStatus}
            signature={tokenStatus.match(/Mint address: ([^\s]+)/)?.[1]}
          />
        )}
      </div>
    </Card>
  );
};