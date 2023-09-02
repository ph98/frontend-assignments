import React, { useState, useEffect } from 'react';
import MessageWrapper from '../components/message/messageWrapper';

const ToastContext = React.createContext();

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const newToast = {
      id: new Date().getTime(),
      message,
    };

    setToasts((prevToasts) => [...prevToasts, newToast].slice(-5));
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      if (toasts.length > 0) {
        removeToast(toasts[0].id);
      }
    }, 5000); // 5 seconds

    return () => clearTimeout(toastTimeout);
  }, [toasts]);

  return { toasts, addToast };
};

export const ToastProvider = ({ children }) => {
  const toastMethods = useToast();

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      <MessageWrapper toasts={toastMethods.toasts} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};