import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  animation: ${props => props.closing ? fadeOut : fadeIn} 0.3s ease-out;
`;

const Toast = styled.div`
  background: ${props => {
    switch (props.type) {
      case 'success': return '#d4edda';
      case 'error': return '#f8d7da';
      case 'warning': return '#fff3cd';
      case 'info': return '#d1ecf1';
      default: return '#d1ecf1';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#155724';
      case 'error': return '#721c24';
      case 'warning': return '#856404';
      case 'info': return '#0c5460';
      default: return '#0c5460';
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return '#c3e6cb';
      case 'error': return '#f5c6cb';
      case 'warning': return '#ffeaa7';
      case 'info': return '#bee5eb';
      default: return '#bee5eb';
    }
  }};
  border-radius: 5px;
  padding: 15px 20px;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  min-width: 300px;
`;

const ToastIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 10px;
  font-weight: bold;
`;

const ToastMessage = styled.div`
  flex: 1;
`;

const ToastClose = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  margin-left: 10px;
  
  &:hover {
    opacity: 1;
  }
`;

const ToastNotification = ({ 
  id, 
  type, 
  message, 
  duration = 5000, 
  onClose 
}) => {
  const [closing, setClosing] = React.useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };
  
  const getIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✗';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return 'ℹ';
    }
  };
  
  return (
    <ToastContainer closing={closing}>
      <Toast type={type}>
        <ToastIcon>{getIcon()}</ToastIcon>
        <ToastMessage>{message}</ToastMessage>
        <ToastClose onClick={handleClose}>×</ToastClose>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;