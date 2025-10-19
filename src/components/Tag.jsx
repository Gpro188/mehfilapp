import React from 'react';
import styled from 'styled-components';

const TagContainer = styled.span`
  display: inline-block;
  background: ${props => props.color || '#6e45e2'};
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 2px;
  
  ${props => props.large && `
    padding: 8px 15px;
    font-size: 0.9rem;
    border-radius: 20px;
  `}
  
  ${props => props.outline && `
    background: transparent;
    color: ${props.color || '#6e45e2'};
    border: 1px solid ${props.color || '#6e45e2'};
  `}
`;

const Tag = ({ 
  children, 
  color = '#6e45e2',
  large = false,
  outline = false,
  ...props 
}) => {
  return (
    <TagContainer 
      color={color} 
      large={large} 
      outline={outline}
      {...props}
    >
      {children}
    </TagContainer>
  );
};

export default Tag;