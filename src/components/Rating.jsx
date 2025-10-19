import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: ${props => props.interactive ? 'pointer' : 'default'};
  padding: 0;
  font-size: ${props => props.size || '1rem'};
  color: ${props => props.filled ? '#f1c40f' : '#ddd'};
  
  &:hover {
    color: ${props => props.interactive ? '#f1c40f' : (props.filled ? '#f1c40f' : '#ddd')};
  }
  
  &:focus {
    outline: none;
  }
`;

const RatingText = styled.span`
  margin-left: 10px;
  color: #666;
  font-size: 0.9rem;
`;

const Rating = ({ 
  value, 
  max = 5, 
  onChange, 
  size = '1rem',
  showText = false,
  interactive = false 
}) => {
  const handleClick = (rating) => {
    if (interactive && onChange) {
      onChange(rating);
    }
  };
  
  return (
    <div>
      <RatingContainer>
        {[...Array(max)].map((_, index) => (
          <StarButton
            key={index}
            filled={index < value}
            size={size}
            interactive={interactive}
            onClick={() => handleClick(index + 1)}
            aria-label={`Rate ${index + 1} out of ${max}`}
          >
            <FaStar />
          </StarButton>
        ))}
      </RatingContainer>
      {showText && (
        <RatingText>
          {value} out of {max}
        </RatingText>
      )}
    </div>
  );
};

export default Rating;