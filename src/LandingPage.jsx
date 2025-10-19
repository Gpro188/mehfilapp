import React from 'react';
import styled from 'styled-components';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
  color: white;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const Button = styled.button`
  background: white;
  color: #6e45e2;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  margin: 10px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  max-width: 900px;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
`;

const FeatureTitle = styled.h3`
  margin: 0 0 10px 0;
`;

const FeatureDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const LandingPage = ({ onStart }) => {
  return (
    <LandingContainer>
      <Title>🎭 Arts Fest Results Manager</Title>
      <Subtitle>
        A comprehensive web application for managing and publishing results of your arts festival
      </Subtitle>
      
      <div>
        <Button onClick={() => onStart('public')}>View Public Results</Button>
        <Button onClick={() => onStart('admin')}>Access Admin Panel</Button>
      </div>
      
      <FeatureList>
        <FeatureCard>
          <FeatureIcon>🏆</FeatureIcon>
          <FeatureTitle>Leaderboards</FeatureTitle>
          <FeatureDescription>Beautiful team standings with real-time updates</FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>👥</FeatureIcon>
          <FeatureTitle>Team Management</FeatureTitle>
          <FeatureDescription>Organize students into color-coded teams</FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🎭</FeatureIcon>
          <FeatureTitle>Program Tracking</FeatureTitle>
          <FeatureDescription>Manage individual and group performances</FeatureDescription>
        </FeatureCard>
      </FeatureList>
      
      <div style={{ marginTop: '30px', fontSize: '0.9rem', opacity: 0.8 }}>
        <p>Admin Access: username: admin, password: admin123</p>
      </div>
    </LandingContainer>
  );
};

export default LandingPage;