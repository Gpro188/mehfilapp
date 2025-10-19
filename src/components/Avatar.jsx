import React from 'react';
import styled from 'styled-components';

const AvatarContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border-radius: ${props => props.rounded ? '50%' : '5px'};
  background: ${props => props.bgColor || '#6e45e2'};
  color: white;
  font-weight: bold;
  font-size: ${props => `calc(${props.size || '40px'} / 2)`};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Avatar = ({ 
  name, 
  src, 
  size = '40px',
  rounded = true,
  bgColor = '#6e45e2'
}) => {
  const getInitials = (name) => {
    if (!name) return '?';
    
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    
    return initials;
  };
  
  return (
    <AvatarContainer size={size} rounded={rounded} bgColor={bgColor}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        getInitials(name)
      )}
    </AvatarContainer>
  );
};

export default Avatar;