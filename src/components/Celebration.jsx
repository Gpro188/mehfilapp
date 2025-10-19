import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { celebrate } from '../utils/confetti';

const CelebrationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.div`
  background: rgba(110, 69, 226, 0.9);
  color: white;
  padding: 20px 40px;
  border-radius: 10px;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transform: scale(0);
  transition: transform 0.5s ease-out;
  
  &.show {
    transform: scale(1);
  }
`;

const Celebration = ({ message = 'Congratulations!', show = false, duration = 3000 }) => {
  const containerRef = useRef(null);
  const messageRef = useRef(null);
  
  useEffect(() => {
    if (show && containerRef.current) {
      // Add confetti effect
      celebrate(containerRef.current);
      
      // Show message
      if (messageRef.current) {
        setTimeout(() => {
          messageRef.current.classList.add('show');
        }, 100);
      }
      
      // Hide after duration
      const timer = setTimeout(() => {
        if (messageRef.current) {
          messageRef.current.classList.remove('show');
        }
      }, duration - 500);
      
      return () => clearTimeout(timer);
    }
  }, [show, message, duration]);
  
  if (!show) return null;
  
  return (
    <CelebrationContainer ref={containerRef}>
      <Message ref={messageRef}>{message}</Message>
    </CelebrationContainer>
  );
};

export default Celebration;