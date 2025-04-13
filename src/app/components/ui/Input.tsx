import type { FC, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
}

export const Input: FC<InputProps> = ({ label, error, helpText, className = "", ...props }) => {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-200">{label}</label>}
      <div className="relative">
        <input
          className={`w-full p-2.5 rounded-md bg-gray-800 text-gray-100 border border-gray-700 
          focus:border-violet-500 focus:ring-1 focus:ring-violet-500/70 outline-none transition-colors 
          placeholder:text-gray-500 ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/70" : ""
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helpText && !error && <p className="text-gray-400 text-sm mt-1">{helpText}</p>}
    </div>
  )
}
