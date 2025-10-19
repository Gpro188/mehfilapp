import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${props => props.borderColor || '#6e45e2'};
  margin-bottom: 20px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const CardContent = styled.div`
  color: #666;
`;

const Card = ({ 
  title, 
  children, 
  borderColor, 
  actions,
  style 
}) => {
  return (
    <CardContainer borderColor={borderColor} style={style}>
      {(title || actions) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {actions && <div>{actions}</div>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default Card;