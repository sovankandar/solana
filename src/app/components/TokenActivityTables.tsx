"use client"

import { type FC, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "./ui/Card"
import type { RootState } from "../store/store"
import { setStorageWithExpiry, getStorageWithExpiry } from "../utils/localStorage"
import { setMintActivities, setSendActivities } from "../store/tokenActivitySlice"
import type { TokenActivity } from "../store/tokenActivitySlice"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, Badge } from "./ui/Table"

const MINT_STORAGE_KEY = "token_mint_activities"
const SEND_STORAGE_KEY = "token_send_activities"

const ActivityTable: FC<{ activities: TokenActivity[]; title: string }> = ({ activities, title }) => (
  <Card title={title}>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token Address</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          {title === "Token Sends" && <TableHead>Recipient</TableHead>}
          <TableHead className="text-center">Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.signature}>
            <TableCell>
              <a
                href={`https://explorer.solana.com/address/${activity.mintAddress}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
              >
                {activity.mintAddress.slice(0, 8)}...{activity.mintAddress.slice(-8)}
              </a>
            </TableCell>
            <TableCell className="text-right font-mono">{activity.amount}</TableCell>
            {title === "Token Sends" && (
              <TableCell>
                {activity.recipient && (
                  <span className="font-mono text-sm text-gray-300">
                    {activity.recipient.slice(0, 8)}...{activity.recipient.slice(-8)}
                  </span>
                )}
              </TableCell>
            )}
            <TableCell className="text-center">
              <Badge variant={activity.status === "success" ? "success" : "error"}>{activity.status}</Badge>
            </TableCell>
            <TableCell className="text-sm">{new Date(activity.timestamp).toLocaleString()}</TableCell>
          </TableRow>
        ))}
        {activities.length === 0 && (
          <TableRow>
            <TableCell colSpan={title === "Token Sends" ? 5 : 4} className="py-10 text-center text-gray-400">
              No activities yet
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </Card>
)

export const TokenActivityTables: FC<{ type: "mint" | "send" }> = ({ type }) => {
  const dispatch = useDispatch()
  const mintActivities = useSelector((state: RootState) => state.tokenActivity.mintActivities)
  const sendActivities = useSelector((state: RootState) => state.tokenActivity.sendActivities)

  useEffect(() => {
    const storedMintActivities = getStorageWithExpiry<TokenActivity[]>(MINT_STORAGE_KEY)
    const storedSendActivities = getStorageWithExpiry<TokenActivity[]>(SEND_STORAGE_KEY)

    if (storedMintActivities && Array.isArray(storedMintActivities)) {
      dispatch(setMintActivities(storedMintActivities))
    }
    if (storedSendActivities && Array.isArray(storedSendActivities)) {
      dispatch(setSendActivities(storedSendActivities))
    }
  }, [dispatch])

  useEffect(() => {
    if (mintActivities.length > 0) {
      setStorageWithExpiry(MINT_STORAGE_KEY, mintActivities)
    }
  }, [mintActivities])

  useEffect(() => {
    if (sendActivities.length > 0) {
      setStorageWithExpiry(SEND_STORAGE_KEY, sendActivities)
    }
  }, [sendActivities])

  return (
    <div>
      {type === "mint" && <ActivityTable activities={mintActivities} title="Token Mints" />}
      {type === "send" && <ActivityTable activities={sendActivities} title="Token Sends" />}
    </div>
  )
}
