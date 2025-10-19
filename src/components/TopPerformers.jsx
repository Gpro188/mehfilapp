import React from 'react';
import styled from 'styled-components';

const SectionTitle = styled.h2`
  color: white;
  text-align: center;
  margin: 40px 0 20px 0;
`;

const PerformersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const PerformerCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-top: 5px solid ${props => props.teamColor || '#6e45e2'};
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

const PerformerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const RankBadge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.rank === 1 ? '#f1c40f' : props.rank === 2 ? '#95a5a6' : '#cd7f32'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 15px;
`;

const PerformerInfo = styled.div`
  flex: 1;
`;

const PerformerName = styled.h3`
  margin: 0 0 5px 0;
  color: #333;
`;

const PerformerTeam = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.teamColor || '#6e45e2'};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const TopPerformers = ({ topPerformers, teams, programs, results }) => {
  // Calculate points for a result
  const calculatePoints = (program, result) => {
    if (!program || !result) return 0;
    
    let points = program.points[result.position] || 0;
    
    // Add grade points if applicable
    if (result.grade === 'A') points += 2;
    else if (result.grade === 'B') points += 1;
    
    return points;
  };
  
  // Get total points for a student
  const getTotalPoints = (studentId) => {
    return results
      .filter(result => result.studentId === studentId)
      .reduce((total, result) => {
        const program = programs.find(p => p.id === result.programId);
        return total + calculatePoints(program, result);
      }, 0);
  };
  
  return (
    <>
      <SectionTitle>Top Performers</SectionTitle>
      <PerformersGrid>
        {topPerformers.map((performer, index) => {
          const team = teams.find(t => t.id === performer.teamId);
          const totalPoints = getTotalPoints(performer.id);
          const achievements = results.filter(r => r.studentId === performer.id).length;
          
          return (
            <PerformerCard key={performer.id} teamColor={team?.color} rank={index + 1}>
              <PerformerHeader>
                <RankBadge rank={index + 1}>
                  {index === 0 ? '1' : index === 1 ? '2' : '3'}
                </RankBadge>
                <PerformerInfo>
                  <PerformerName>{performer.name}</PerformerName>
                  <PerformerTeam>{team?.name} • {performer.category}</PerformerTeam>
                </PerformerInfo>
              </PerformerHeader>
              
              <StatsContainer>
                <StatItem>
                  <StatValue teamColor={team?.color}>{totalPoints}</StatValue>
                  <StatLabel>Total Points</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue teamColor={team?.color}>{achievements}</StatValue>
                  <StatLabel>Achievements</StatLabel>
                </StatItem>
              </StatsContainer>
            </PerformerCard>
          );
        })}
      </PerformersGrid>
    </>
  );
};

export default TopPerformers;