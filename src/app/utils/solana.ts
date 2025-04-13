import { Connection, PublicKey, ParsedTransactionWithMeta } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export interface TokenInfo {
  mint: string;
  amount: number;
  decimals: number;
  symbol?: string;
}

export async function getTokenBalances(connection: Connection, publicKey: PublicKey): Promise<TokenInfo[]> {
  try {
    const accounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: TOKEN_PROGRAM_ID }
    );

    return accounts.value.map(account => ({
      mint: account.account.data.parsed.info.mint,
      amount: account.account.data.parsed.info.tokenAmount.uiAmount,
      decimals: account.account.data.parsed.info.tokenAmount.decimals,
    }));
  } catch (error) {
    console.error('Error fetching token balances:', error);
    throw error;
  }
}

export async function getTransactionHistory(
  connection: Connection,
  publicKey: PublicKey,
  limit: number = 10
): Promise<ParsedTransactionWithMeta[]> {
  try {
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit });
    const transactions = await Promise.all(
      signatures.map(sig => 
        connection.getParsedTransaction(sig.signature, { maxSupportedTransactionVersion: 0 })
      )
    );

    return transactions.filter((tx): tx is ParsedTransactionWithMeta => tx !== null);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw error;
  }
}

export function formatAddress(address: string, length: number = 8): string {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}