'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, Keypair } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, createTransferInstruction, getAccount } from '@solana/spl-token';
import { Notification } from './Notification';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setTokenMint, 
  setRecipient, 
  setAmount, 
  setTransactionStatus, 
  setNotification,
  resetForm 
} from '../store/tokenSlice';
import type { RootState } from '../store/store';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { StatusMessage } from './ui/StatusMessage';

interface TokenSenderProps {
  connection: Connection;
}

type TransactionError = {
  message: string;
} & Error;

export const TokenSender: FC<TokenSenderProps> = ({ connection }) => {
  const { publicKey, sendTransaction } = useWallet();
  const dispatch = useDispatch();
  const { 
    tokenMint, 
    recipient, 
    amount, 
    transactionStatus, 
    notification 
  } = useSelector((state: RootState) => state.token);

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    dispatch(setNotification({ message, type }));
  };

  const updateTransactionStatus = async (signature: string) => {
    try {
      dispatch(setTransactionStatus({ status: 'confirming', signature }));
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

      dispatch(setTransactionStatus({ status: 'confirmed', signature }));
      showNotification(`Transaction confirmed! Block time: ${blockTime}`, 'success');
    } catch (error: unknown) {
      const typedError = error as TransactionError;
      dispatch(setTransactionStatus({ status: 'failed', error: typedError.message }));
      showNotification(`Transaction failed: ${typedError.message}`, 'error');
    }
  };

  const sendTokens = async () => {
    if (!publicKey || !sendTransaction) {
      showNotification('Please connect your wallet first', 'error');
      return;
    }

    try {
      dispatch(setTransactionStatus({ status: 'pending' }));
      showNotification('Preparing transaction...', 'info');

      const mintPublicKey = new PublicKey(tokenMint);
      const recipientPublicKey = new PublicKey(recipient);

      // Create a temporary keypair for the transaction
      const payer = Keypair.generate();

      // Get source token account
      const sourceAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,  // Using payer as signer
        mintPublicKey,
        publicKey
      );

      const tokenAccount = await getAccount(connection, sourceAccount.address);
      if (Number(tokenAccount.amount) < Number(amount) * (10 ** 9)) {
        throw new Error('Insufficient token balance');
      }

      const destinationAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,  // Using payer as signer
        mintPublicKey,
        recipientPublicKey
      );

      const transaction = new Transaction().add(
        createTransferInstruction(
          sourceAccount.address,
          destinationAccount.address,
          publicKey,
          Number(amount) * (10 ** 9)
        )
      );

      showNotification('Please approve the transaction...', 'info');
      const signature = await sendTransaction(transaction, connection);
      
      await updateTransactionStatus(signature);
      
      if (transactionStatus?.status === 'confirmed') {
        dispatch(resetForm());
      }
    } catch (error: unknown) {
      const typedError = error as TransactionError;
      dispatch(setTransactionStatus({ status: 'failed', error: typedError.message }));
      showNotification(`Error: ${typedError.message}`, 'error');
    }
  };

  return (
    <>
      <Card title="Send Tokens">
        <div className="space-y-4">
          <Input
            label="Token Mint Address"
            value={tokenMint}
            onChange={(e) => dispatch(setTokenMint(e.target.value))}
            placeholder="Enter token mint address"
          />
          <Input
            label="Recipient Address"
            value={recipient}
            onChange={(e) => dispatch(setRecipient(e.target.value))}
            placeholder="Enter recipient's wallet address"
          />
          <Input
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => dispatch(setAmount(e.target.value))}
            placeholder="Enter amount to send"
          />
          <Button
            onClick={sendTokens}
            disabled={!publicKey || !tokenMint || !recipient || !amount || transactionStatus?.status === 'pending'}
            isLoading={transactionStatus?.status === 'pending'}
          >
            Send Tokens
          </Button>
          
          {transactionStatus && (
            <StatusMessage
              status={transactionStatus.status}
              signature={transactionStatus.signature}
              error={transactionStatus.error}
            />
          )}
        </div>
      </Card>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => dispatch(setNotification(null))}
        />
      )}
    </>
  );
};