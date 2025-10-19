import React from 'react';
import styled from 'styled-components';

const EventSwitcherContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  margin: 15px auto;
  backdrop-filter: blur(10px);
`;

const EventInfo = styled.div`
  padding: 8px 15px;
  color: white;
  font-weight: bold;
`;

const SwitchButton = styled.button`
  background: white;
  color: ${props => props.themeColor || '#6e45e2'};
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 10px;
  
  &:hover {
    background: #f0f0f0;
  }
`;

const EventSwitcher = ({ currentEvent, totalEvents, currentIndex, onSwitch, themeColor }) => {
  if (totalEvents <= 1) return null;
  
  return (
    <EventSwitcherContainer>
      <EventInfo>
        Event {currentIndex + 1} of {totalEvents}
      </EventInfo>
      <SwitchButton themeColor={themeColor} onClick={onSwitch}>
        Switch Event
      </SwitchButton>
    </EventSwitcherContainer>
  );
};

export default EventSwitcher;