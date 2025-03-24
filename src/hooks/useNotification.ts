import { useContext } from "react"
import { NotificationContext } from "../contexts/notifications/NotificationProvider.tsx"

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must to used with to NotificationProvider');
  }
  return context;
}