'use client';

import { FC, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { Navigation } from './Navigation';
import { WalletInfo } from './WalletInfo';
import { TokenCreator } from './TokenCreator';
import { TokenMinter } from './TokenMinter';
import { TokenSender } from './TokenSender';
import { TransactionHistory } from './TransactionHistory';
import { TokenTable } from './TokenTable';
import { TokenActivityTables } from './TokenActivityTables';
import { ThemeProvider } from '../ThemeContext';

interface DashboardProps {
  connection: Connection
}

export const Dashboard: FC<DashboardProps> = ({ connection }) => {
  const [activeTab, setActiveTab] = useState("wallet")

  const renderContent = () => {
    switch (activeTab) {
      case "wallet":
        return (
          <div className="flex flex-col gap-8">
            <WalletInfo connection={connection} />
            <TransactionHistory connection={connection} />
          </div>
        )

      case "create":
        return (
          <div className="flex flex-col gap-8">
            <TokenCreator connection={connection} />
            <TokenTable />
            <TransactionHistory connection={connection} />
          </div>
        )

      case "mint":
        return (
          <div className="flex flex-col gap-8">
            <TokenMinter connection={connection} />
            <TokenActivityTables type="mint" />
            <TransactionHistory connection={connection} />
          </div>
        )

      case "send":
        return (
          <div className="flex flex-col gap-8">
            <TokenSender connection={connection} />
            <TokenActivityTables type="send" />
            <TransactionHistory connection={connection} />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="container mx-auto px-4 py-8 max-w-5xl">{renderContent()}</div>
      </div>
    </ThemeProvider>
  )
}
