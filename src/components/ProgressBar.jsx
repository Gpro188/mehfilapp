import React from 'react';
import styled, { keyframes } from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  height: 20px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: ${props => props.color || '#6e45e2'};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
  border-radius: 10px;
  
  ${props => props.animated && `
    background: linear-gradient(
      90deg,
      ${props.color || '#6e45e2'} 0%,
      ${props.color || '#6e45e2'} 25%,
      ${props.highlight || '#88d3ce'} 50%,
      ${props.color || '#6e45e2'} 75%,
      ${props.color || '#6e45e2'} 100%
    );
    background-size: 200% 100%;
    animation: progressAnimation 2s linear infinite;
  `}
`;

const progressAnimation = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const ProgressText = styled.div`
  text-align: center;
  margin-top: 5px;
  font-size: 0.9rem;
  color: #666;
`;

const ProgressBar = ({ 
  progress, 
  color = '#6e45e2',
  highlight = '#88d3ce',
  animated = false,
  showText = true,
  text = null
}) => {
  return (
    <div>
      <ProgressBarContainer>
        <ProgressBarFill 
          progress={progress} 
          color={color}
          highlight={highlight}
          animated={animated}
        />
      </ProgressBarContainer>
      {showText && (
        <ProgressText>
          {text || `${Math.round(progress)}%`}
        </ProgressText>
      )}
    </div>
  );
};

export default ProgressBar;