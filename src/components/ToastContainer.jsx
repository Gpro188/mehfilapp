import React, { useState } from 'react';
import ToastNotification from './ToastNotification';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    setToasts(prevToasts => [...prevToasts, { ...toast, id }]);
  };
  
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };
  
  return (
    <>
      {toasts.map(toast => (
        <ToastNotification
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </>
  );
};

export default ToastContainer;