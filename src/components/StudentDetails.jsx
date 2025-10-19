import React from 'react';
import styled from 'styled-components';

const StudentCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${props => props.teamColor || '#6e45e2'};
`;

const StudentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const StudentName = styled.h2`
  margin: 0;
  color: #333;
`;

const StudentInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const InfoValue = styled.span`
  font-weight: bold;
  color: #333;
`;

const AchievementsList = styled.div`
  margin-top: 20px;
`;

const AchievementItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AchievementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const AchievementTitle = styled.h4`
  margin: 0;
  color: #333;
`;

const AchievementDetails = styled.div`
  display: flex;
  gap: 15px;
`;

const DetailBadge = styled.span`
  background: ${props => props.bgColor || '#6e45e2'};
  color: white;
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const NoAchievements = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const StudentDetails = ({ student, team, category, achievements, programs }) => {
  return (
    <StudentCard teamColor={team?.color}>
      <StudentHeader>
        <StudentName>{student.name}</StudentName>
        <DetailBadge bgColor={team?.color}>{team?.name}</DetailBadge>
      </StudentHeader>
      
      <StudentInfo>
        <InfoItem>
          <InfoLabel>Category</InfoLabel>
          <InfoValue>{category}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Total Achievements</InfoLabel>
          <InfoValue>{achievements.length}</InfoValue>
        </InfoItem>
      </StudentInfo>
      
      <AchievementsList>
        <h3>Achievements</h3>
        {achievements.length > 0 ? (
          achievements.map(achievement => {
            const program = programs.find(p => p.id === achievement.programId);
            return (
              <AchievementItem key={achievement.id}>
                <AchievementHeader>
                  <AchievementTitle>{program?.name}</AchievementTitle>
                  <div>
                    <DetailBadge bgColor={getResultColor(achievement.position)}>
                      {achievement.position}
                    </DetailBadge>
                    {achievement.grade && (
                      <DetailBadge bgColor={achievement.grade === 'A' ? '#2ecc71' : '#3498db'}>
                        Grade {achievement.grade}
                      </DetailBadge>
                    )}
                  </div>
                </AchievementHeader>
                <AchievementDetails>
                  <InfoItem>
                    <InfoLabel>Program Type</InfoLabel>
                    <InfoValue>{program?.type}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Points</InfoLabel>
                    <InfoValue>{calculatePoints(program, achievement)}</InfoValue>
                  </InfoItem>
                </AchievementDetails>
              </AchievementItem>
            );
          })
        ) : (
          <NoAchievements>No achievements recorded yet</NoAchievements>
        )}
      </AchievementsList>
    </StudentCard>
  );
};

// Helper function to calculate points
const calculatePoints = (program, result) => {
  if (!program || !result) return 0;
  
  let points = program.points[result.position] || 0;
  
  // Add grade points if applicable
  if (result.grade === 'A') points += 2;
  else if (result.grade === 'B') points += 1;
  
  return points;
};

// Helper function to get color for result positions
const getResultColor = (position) => {
  switch (position) {
    case '1st': return '#f1c40f'; // Gold
    case '2nd': return '#95a5a6'; // Silver
    case '3rd': return '#cd7f32'; // Bronze
    default: return '#3498db'; // Blue
  }
};

export default StudentDetails;