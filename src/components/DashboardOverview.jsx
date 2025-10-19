import React from 'react';
import styled from 'styled-components';
import StatsDisplay from './StatsDisplay';
import Card from './Card';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const DashboardOverview = ({ 
  eventCount, 
  teamCount, 
  studentCount, 
  programCount, 
  resultCount,
  activeEvents 
}) => {
  const stats = [
    { label: 'Total Events', value: eventCount, color: '#6e45e2' },
    { label: 'Active Events', value: activeEvents, color: '#88d3ce' },
    { label: 'Teams', value: teamCount, color: '#3498db' },
    { label: 'Students', value: studentCount, color: '#2ecc71' },
    { label: 'Programs', value: programCount, color: '#e74c3c' },
    { label: 'Results', value: resultCount, color: '#f1c40f' }
  ];
  
  return (
    <DashboardContainer>
      <SectionTitle>Dashboard Overview</SectionTitle>
      <StatsDisplay stats={stats} />
      
      <Card title="Quick Actions">
        <p>Use the navigation tabs above to manage different aspects of your arts festival:</p>
        <ul>
          <li><strong>Events</strong> - Create and manage festival events</li>
          <li><strong>Teams</strong> - Add and organize student teams</li>
          <li><strong>Students</strong> - Register students and assign them to teams</li>
          <li><strong>Programs</strong> - Define competition programs and point values</li>
          <li><strong>Results</strong> - Enter and manage competition results</li>
          <li><strong>Points</strong> - Configure point systems and categories</li>
        </ul>
      </Card>
      
      <Card title="Recent Activity">
        <p>No recent activity to display.</p>
      </Card>
    </DashboardContainer>
  );
};

export default DashboardOverview;