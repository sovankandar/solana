import type { FC, ReactNode } from "react"

interface CardProps {
  children: ReactNode
  title?: string
  className?: string
  variant?: "default" | "elevated"
}

export const Card: FC<CardProps> = ({ children, title, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-gray-900 text-gray-100 border border-gray-700 hover:shadow-md",
    elevated: "bg-gray-800 text-gray-100 shadow-lg hover:shadow-xl border-none",
  }

  return (
    <div className={`rounded-lg transition-all duration-300 ${variants[variant]} ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-gray-700/50 p-6">
          <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}
