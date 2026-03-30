'use client';
import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
  useContext,
} from 'react';

interface NotificationType {
  type: string;
  id: number;
}

interface NotificationPropType {
  notification: NotificationType | null;
  setNotification: Dispatch<SetStateAction<NotificationType | null>>;
}

const NotificationContext = createContext<NotificationPropType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType | null>(null);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within Provider');
  return context;
};