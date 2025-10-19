import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #333;
  text-align: center;
  margin-top: 0;
`;

const ResultsList = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

const ResultItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ResultInfo = styled.div`
  flex: 1;
`;

const ResultTitle = styled.h4`
  margin: 0 0 5px 0;
  color: #333;
`;

const ResultDetails = styled.p`
  margin: 0;
  color: #666;
`;

const BadgesContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Badge = styled.span`
  background: ${props => props.bgColor || '#6e45e2'};
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 30px;
  color: #666;
`;

const ResultsDisplay = ({ results, programs, students, teams }) => {
  if (results.length === 0) {
    return (
      <ResultsContainer>
        <SectionTitle>Results</SectionTitle>
        <NoResults>No results found matching your criteria</NoResults>
      </ResultsContainer>
    );
  }
  
  return (
    <ResultsContainer>
      <SectionTitle>Results</SectionTitle>
      <ResultsList>
        {results.map(result => {
          const program = programs.find(p => p.id === result.programId);
          const student = students.find(s => s.id === result.studentId);
          const team = teams.find(t => t.id === (student?.teamId || result.teamId));
          
          return (
            <ResultItem key={result.id}>
              <ResultInfo>
                <ResultTitle>{program?.name}</ResultTitle>
                <ResultDetails>
                  {student ? `${student.name} (${team?.name})` : team?.name}
                </ResultDetails>
              </ResultInfo>
              <BadgesContainer>
                <Badge bgColor={getResultColor(result.position)}>
                  {result.position}
                </Badge>
                {result.grade && (
                  <Badge bgColor={result.grade === 'A' ? '#2ecc71' : '#3498db'}>
                    Grade {result.grade}
                  </Badge>
                )}
              </BadgesContainer>
            </ResultItem>
          );
        })}
      </ResultsList>
    </ResultsContainer>
  );
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

export default ResultsDisplay;