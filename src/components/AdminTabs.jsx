import React from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto 20px;
`;

const TabsList = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 12px 20px;
  background: ${props => props.active ? '#6e45e2' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-bottom: ${props => props.active ? '3px solid #88d3ce' : 'none'};
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  text-transform: capitalize;
  margin-right: 5px;
  border-radius: 5px 5px 0 0;
  
  &:hover {
    background: ${props => props.active ? '#5a3bc9' : '#f5f5f5'};
  }
  
  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
`;

const AdminTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'events', label: 'Events' },
    { id: 'teams', label: 'Teams' },
    { id: 'students', label: 'Students' },
    { id: 'programs', label: 'Programs' },
    { id: 'results', label: 'Results' },
    { id: 'points', label: 'Points' }
  ];
  
  return (
    <TabsContainer>
      <TabsList>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabsList>
    </TabsContainer>
  );
};

export default AdminTabs;