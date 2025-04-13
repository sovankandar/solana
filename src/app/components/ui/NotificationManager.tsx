"use client"

import { type FC, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeNotification } from "@/app/store/notificationSlice"
import type { RootState } from "@/app/store/store"
import { X } from "lucide-react"

export const NotificationManager: FC = () => {
  const dispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.notification.messages)

  useEffect(() => {
    messages.forEach((msg) => {
      const timer = setTimeout(() => {
        dispatch(removeNotification(msg.id))
      }, 5000)

      return () => clearTimeout(timer)
    })
  }, [messages, dispatch])

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
      case "error":
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800"
      default:
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`${getNotificationStyles(
            msg.type,
          )} px-6 py-4 rounded-lg shadow-lg max-w-md animate-fade-in border flex items-start`}
        >
          <div className="flex-1">{msg.message}</div>
          <button
            onClick={() => dispatch(removeNotification(msg.id))}
            className="ml-4 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
