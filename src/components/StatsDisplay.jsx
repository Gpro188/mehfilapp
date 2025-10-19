import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-top: 5px solid ${props => props.color || '#6e45e2'};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.color || '#6e45e2'};
  margin: 10px 0;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 1rem;
`;

const StatsDisplay = ({ stats }) => {
  return (
    <StatsContainer>
      {stats.map((stat, index) => (
        <StatCard key={index} color={stat.color}>
          <StatValue color={stat.color}>{stat.value}</StatValue>
          <StatLabel>{stat.label}</StatLabel>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default StatsDisplay;