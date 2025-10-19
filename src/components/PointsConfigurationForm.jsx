import React, { useState } from 'react';
import styled from 'styled-components';
import { FormContainer, FormGroup, FormLabel, FormInput, FormButton } from './FormComponents';
import Card from './Card';

const PointsConfigContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const PointsForm = styled.form`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
`;

const PointsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const PositionLabel = styled.span`
  width: 80px;
  font-weight: bold;
`;

const GradeConfig = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const PointsConfigurationForm = ({ initialPoints, onSave }) => {
  const [points, setPoints] = useState(initialPoints || {
    '1st': 10,
    '2nd': 7,
    '3rd': 5
  });
  
  const [gradePoints, setGradePoints] = useState({
    'A': 2,
    'B': 1
  });
  
  const handlePointsChange = (position, value) => {
    setPoints({
      ...points,
      [position]: parseInt(value) || 0
    });
  };
  
  const handleGradeChange = (grade, value) => {
    setGradePoints({
      ...gradePoints,
      [grade]: parseInt(value) || 0
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...points, gradePoints });
  };
  
  return (
    <PointsConfigContainer>
      <Card title="Position Points">
        <PointsForm onSubmit={handleSubmit}>
          <PointsRow>
            <PositionLabel>1st Place:</PositionLabel>
            <FormInput
              type="number"
              value={points['1st']}
              onChange={(e) => handlePointsChange('1st', e.target.value)}
              min="0"
            />
            <span>points</span>
          </PointsRow>
          
          <PointsRow>
            <PositionLabel>2nd Place:</PositionLabel>
            <FormInput
              type="number"
              value={points['2nd']}
              onChange={(e) => handlePointsChange('2nd', e.target.value)}
              min="0"
            />
            <span>points</span>
          </PointsRow>
          
          <PointsRow>
            <PositionLabel>3rd Place:</PositionLabel>
            <FormInput
              type="number"
              value={points['3rd']}
              onChange={(e) => handlePointsChange('3rd', e.target.value)}
              min="0"
            />
            <span>points</span>
          </PointsRow>
          
          <GradeConfig>
            <h4>Grade Bonuses</h4>
            <PointsRow>
              <PositionLabel>A Grade:</PositionLabel>
              <FormInput
                type="number"
                value={gradePoints['A']}
                onChange={(e) => handleGradeChange('A', e.target.value)}
                min="0"
              />
              <span>points</span>
            </PointsRow>
            
            <PointsRow>
              <PositionLabel>B Grade:</PositionLabel>
              <FormInput
                type="number"
                value={gradePoints['B']}
                onChange={(e) => handleGradeChange('B', e.target.value)}
                min="0"
              />
              <span>points</span>
            </PointsRow>
          </GradeConfig>
          
          <FormButton type="submit">Save Points Configuration</FormButton>
        </PointsForm>
      </Card>
      
      <Card title="Preview">
        <p>With the current configuration:</p>
        <ul>
          <li>1st Place: {points['1st']} points</li>
          <li>2nd Place: {points['2nd']} points</li>
          <li>3rd Place: {points['3rd']} points</li>
          <li>A Grade Bonus: +{gradePoints['A']} points</li>
          <li>B Grade Bonus: +{gradePoints['B']} points</li>
        </ul>
        <p>Total for 1st Place with A Grade: {points['1st'] + gradePoints['A']} points</p>
      </Card>
    </PointsConfigContainer>
  );
};

export default PointsConfigurationForm;