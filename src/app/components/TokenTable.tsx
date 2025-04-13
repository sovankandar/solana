"use client"

import { type FC, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "./ui/Card"
import type { RootState } from "../store/store"
import { setStorageWithExpiry, getStorageWithExpiry } from "../utils/localStorage"
import { setTokens } from "../store/tokenTrackingSlice"
import type { TokenRecord } from "../store/tokenTrackingSlice"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, Badge } from "./ui/Table"

const STORAGE_KEY = "created_tokens"

export const TokenTable: FC = () => {
  const dispatch = useDispatch()
  const tokens = useSelector((state: RootState) => state.tokenTracking.createdTokens)

  useEffect(() => {
    const storedTokens = getStorageWithExpiry<TokenRecord[]>(STORAGE_KEY)
    if (storedTokens && Array.isArray(storedTokens)) {
      dispatch(setTokens(storedTokens))
    }
  }, [dispatch])

  useEffect(() => {
    if (tokens.length > 0) {
      setStorageWithExpiry(STORAGE_KEY, tokens)
    }
  }, [tokens])

  return (
    <Card title="Created Tokens">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead className="text-center">Decimals</TableHead>
            <TableHead>Mint Address</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
            <TableRow key={token.mintAddress}>
              <TableCell className="font-medium">{token.name}</TableCell>
              <TableCell>{token.symbol}</TableCell>
              <TableCell className="text-center">{token.decimals}</TableCell>
              <TableCell>
                <a
                  href={`https://explorer.solana.com/address/${token.mintAddress}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
                >
                  {token.mintAddress.slice(0, 8)}...{token.mintAddress.slice(-8)}
                </a>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={token.status === "success" ? "success" : "error"}>{token.status}</Badge>
              </TableCell>
              <TableCell className="text-sm">{new Date(token.timestamp).toLocaleString()}</TableCell>
            </TableRow>
          ))}
          {tokens.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-gray-400">
                No tokens created yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
