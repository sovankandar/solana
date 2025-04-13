"use client"

import { type FC, useState } from "react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { ThemeToggle } from "../ThemeToggle"
import { Menu, X } from "lucide-react"

interface NavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const Navigation: FC<NavProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "wallet", label: "Wallet Info" },
    { id: "create", label: "Create Token" },
    { id: "mint", label: "Mint Token" },
    { id: "send", label: "Send Token" },
  ]

  return (
    <nav className="sticky top-0 z-10 backdrop-blur-md bg-card/90 border-b border-border shadow-md">
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Solana Dashboard
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-3 pl-4 border-l border-border">
              <ThemeToggle />
              <WalletMultiButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-secondary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-border mt-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 mt-2 border-t border-border">
                <WalletMultiButton className="w-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
