'use client';
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { InfoIcon } from 'lucide-react';
import { useNotification } from '@/context/notification.context';

function Notification() {
  const { notification } = useNotification();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!notification) return;

    setShow(true);

    const timeoutId = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [notification]);

  if (!notification) return null;

  return (
    <div
      className={`
        fixed right-5 top-5 z-50
        transform transition-all duration-300 ease-in-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
      `}
    >
      <Alert className="w-[300px] shadow-lg">
        <InfoIcon />
        <AlertTitle>
          {notification.type === 'expense' ? 'Expense Added' : 'Group Created'}
        </AlertTitle>
        <AlertDescription>
          {notification.type === 'expense'
            ? 'Your expense has been added successfully.'
            : 'Your group has been created successfully.'}
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default Notification;
