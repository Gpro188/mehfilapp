import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { FormButton } from './FormComponents';

const ConfirmationMessage = styled.p`
  margin: 0 0 20px 0;
  font-size: 1.1rem;
  color: #333;
`;

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to perform this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonStyle = 'danger'
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <FormButton onClick={onClose} style={{ background: '#95a5a6' }}>
            {cancelText}
          </FormButton>
          <FormButton 
            onClick={handleConfirm} 
            style={{ background: confirmButtonStyle === 'danger' ? '#e74c3c' : '#2ecc71' }}
          >
            {confirmText}
          </FormButton>
        </>
      }
    >
      <ConfirmationMessage>{message}</ConfirmationMessage>
    </Modal>
  );
};

export default ConfirmationDialog;