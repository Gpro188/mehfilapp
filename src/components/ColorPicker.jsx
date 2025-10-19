import React from 'react';
import styled from 'styled-components';

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ColorPreview = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid #ddd;
  cursor: pointer;
`;

const ColorInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  width: 100px;
`;

const ColorPicker = ({ value, onChange, label }) => {
  return (
    <div>
      {label && <label style={{ display: 'block', marginBottom: '5px' }}>{label}</label>}
      <ColorPickerContainer>
        <ColorPreview 
          color={value} 
          onClick={() => document.getElementById('color-input').click()}
        />
        <ColorInput
          id="color-input"
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span>{value}</span>
      </ColorPickerContainer>
    </div>
  );
};

export default ColorPicker;