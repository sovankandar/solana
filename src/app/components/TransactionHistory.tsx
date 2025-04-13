"use client"

import { type FC, useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import type { Connection, ParsedTransactionWithMeta } from "@solana/web3.js"
import { Card } from "./ui/Card"
import { useNotification } from "../hooks/useNotification"
import { setStorageWithExpiry, getStorageWithExpiry } from "../utils/localStorage"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, Badge } from "./ui/Table"

const STORAGE_KEY = "transaction_history"

type TransactionError = {
  message: string;
} & Error;

export const TransactionHistory: FC<{ connection: Connection }> = ({ connection }) => {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<ParsedTransactionWithMeta[]>([]);
  const { showNotification } = useNotification();

  useEffect(() => {
    // Load stored transactions on mount
    const storedTxs = getStorageWithExpiry<ParsedTransactionWithMeta[]>(STORAGE_KEY)
    if (storedTxs) {
      setTransactions(storedTxs)
    }
  }, [])

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!publicKey) return;

      try {
        const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
        const txs = await Promise.all(
          signatures.map((sig) =>
            connection.getParsedTransaction(sig.signature, { maxSupportedTransactionVersion: 0 }),
          ),
        );

        const filteredTxs = txs.filter((tx): tx is ParsedTransactionWithMeta => tx !== null);
        setTransactions(filteredTxs);

        if (filteredTxs.length > 0) {
          setStorageWithExpiry(STORAGE_KEY, filteredTxs);
        }
      } catch (error: unknown) {
        const typedError = error as TransactionError;
        showNotification(`Error fetching transactions: ${typedError.message}`, "error");
      }
    };

    fetchTransactions();
  }, [publicKey, connection, showNotification]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  return (
    <Card title="Recent Transactions">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Signature</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.transaction.signatures[0]}>
              <TableCell>
                <a
                  href={`https://explorer.solana.com/tx/${tx.transaction.signatures[0]}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
                >
                  {tx.transaction.signatures[0].slice(0, 12)}...
                </a>
              </TableCell>
              <TableCell>{formatDate(tx.blockTime || 0)}</TableCell>
              <TableCell className="text-center">
                <Badge variant={tx.meta?.err ? "error" : "success"}>{tx.meta?.err ? "Failed" : "Success"}</Badge>
              </TableCell>
            </TableRow>
          ))}
          {transactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="py-10 text-center text-gray-400">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
