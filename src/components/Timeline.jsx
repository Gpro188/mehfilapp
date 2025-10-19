import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  position: relative;
  padding: 20px 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #6e45e2;
    left: 15px;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 30px;
  padding-left: 50px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.color || '#6e45e2'};
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const TimelineContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TimelineTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

const TimelineDate = styled.div`
  color: #6e45e2;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TimelineDescription = styled.p`
  margin: 0;
  color: #666;
`;

const Timeline = ({ items }) => {
  return (
    <TimelineContainer>
      {items.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineDot color={item.color}>
            {item.icon || index + 1}
          </TimelineDot>
          <TimelineContent>
            <TimelineDate>{item.date}</TimelineDate>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;