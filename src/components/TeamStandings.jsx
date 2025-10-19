import React from 'react';
import styled from 'styled-components';

const StandingsContainer = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const StandingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const TeamCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${props => props.teamColor || '#6e45e2'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '${props => props.rank}';
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2rem;
    font-weight: bold;
    color: ${props => props.rank === '1' ? '#f1c40f' : props.rank === '2' ? '#95a5a6' : '#cd7f32'};
    opacity: 0.3;
  }
`;

const RankBadge = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.rank === 1 ? '#f1c40f' : props.rank === 2 ? '#95a5a6' : '#cd7f32'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0 auto 15px;
`;

const TeamName = styled.h3`
  margin: 0 0 15px 0;
  color: #333;
`;

const PointsDisplay = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.teamColor || '#6e45e2'};
`;

const PointsLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
`;

const TeamStandings = ({ standings }) => {
  return (
    <StandingsContainer>
      <SectionTitle>Team Standings</SectionTitle>
      <StandingsGrid>
        {standings.map((team, index) => (
          <TeamCard key={team.id} teamColor={team.color} rank={index + 1}>
            <RankBadge rank={index + 1}>
              {index === 0 ? '1' : index === 1 ? '2' : '3'}
            </RankBadge>
            <TeamName>{team.name}</TeamName>
            <PointsDisplay teamColor={team.color}>
              {team.totalPoints}
            </PointsDisplay>
            <PointsLabel>Points</PointsLabel>
          </TeamCard>
        ))}
      </StandingsGrid>
    </StandingsContainer>
  );
};

export default TeamStandings;