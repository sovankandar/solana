'use client';

import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, createMintToInstruction } from '@solana/spl-token';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { StatusMessage } from './ui/StatusMessage';

interface TokenMinterProps {
  connection: Connection;
}

type TokenMintError = {
  message?: string;
} & Error;

export const TokenMinter: FC<TokenMinterProps> = ({ connection }) => {
  const { publicKey, sendTransaction } = useWallet();
  const [mintAddress, setMintAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const mintTokens = async () => {
    if (!publicKey || !sendTransaction) {
      setStatus('Please connect your wallet first');
      return;
    }

    try {
      setStatus('Minting tokens...');
      const mintPublicKey = new PublicKey(mintAddress);

      // Get the token account
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        { publicKey: publicKey, secretKey: new Uint8Array(64) },
        mintPublicKey,
        publicKey
      );

      // Create the mint instruction
      const transaction = new Transaction().add(
        createMintToInstruction(
          mintPublicKey,
          tokenAccount.address,
          publicKey,
          Number(amount) * (10 ** 9)
        )
      );

      // Send the transaction
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      setStatus(`Tokens minted successfully! Transaction signature: ${signature}`);
    } catch (error: unknown) {
      const typedError = error as TokenMintError;
      console.error('Error minting tokens:', typedError);
      setStatus(`Error minting tokens: ${typedError.message || 'Unknown error occurred'}`);
    }
  };

  return (
    <Card title="Mint Tokens">
      <div className="space-y-4">
        <Input
          label="Token Mint Address"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
          placeholder="Enter token mint address"
        />
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to mint"
        />
        <Button
          onClick={mintTokens}
          disabled={!publicKey || !mintAddress || !amount}
          isLoading={status.includes('Minting')}
        >
          Mint Tokens
        </Button>
        {status && (
          <StatusMessage
            status={status}
            signature={status.match(/signature: ([^\s]+)/)?.[1]}
          />
        )}
      </div>
    </Card>
  );
};