import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AlertContainer = styled.div`
  animation: ${fadeIn} 0.3s ease-out;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  
  ${props => props.type === 'success' && `
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `}
  
  ${props => props.type === 'error' && `
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}
  
  ${props => props.type === 'warning' && `
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
  `}
  
  ${props => props.type === 'info' && `
    background: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
  `}
`;

const AlertIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 10px;
  font-weight: bold;
`;

const AlertMessage = styled.div`
  flex: 1;
`;

const AlertClose = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const Alert = ({ type, message, onClose, dismissible = true }) => {
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
    <AlertContainer type={type}>
      <AlertIcon>{getIcon()}</AlertIcon>
      <AlertMessage>{message}</AlertMessage>
      {dismissible && onClose && (
        <AlertClose onClick={onClose}>×</AlertClose>
      )}
    </AlertContainer>
  );
};

export default Alert;