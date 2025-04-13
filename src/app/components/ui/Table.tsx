import React from "react"
import { cn } from "../../lib/utils"

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <div className="rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-gray-800/50 bg-gradient-to-b from-gray-900/90 to-black/95 backdrop-blur-sm">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("bg-black/60 backdrop-blur-sm", className)} {...props} />
  ),
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("bg-black/60 font-medium text-gray-300", className)} {...props} />
  ),
)
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-gray-800/40 transition-colors data-[state=selected]:bg-gray-800/50",
        "hover:bg-gray-800/40 hover:shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:backdrop-blur-sm",
        "even:bg-black/40 odd:bg-gray-900/40",
        className,
      )}
      {...props}
    />
  ),
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-semibold text-gray-300 uppercase tracking-wider",
        "text-xs bg-gradient-to-r from-gray-800/80 to-gray-900/80",
        "[&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-200", className)}
      {...props}
    />
  ),
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-gray-400", className)} {...props} />
  ),
)
TableCaption.displayName = "TableCaption"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "error" | "warning" | "info" | "default"
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-gray-800/70 text-gray-300 border-gray-700/50",
      success: "bg-emerald-950/40 text-emerald-400 border-emerald-700/30",
      error: "bg-rose-950/40 text-rose-400 border-rose-700/30",
      warning: "bg-amber-950/40 text-amber-400 border-amber-700/30",
      info: "bg-cyan-950/40 text-cyan-400 border-cyan-700/30",
    }

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          "border shadow-[0_0_5px_rgba(0,0,0,0.2)] backdrop-blur-sm",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
)
Badge.displayName = "Badge"

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, Badge }
