import styled from 'styled-components';

export const FormContainer = styled.form`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #6e45e2;
    box-shadow: 0 0 0 2px rgba(110, 69, 226, 0.2);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #6e45e2;
    box-shadow: 0 0 0 2px rgba(110, 69, 226, 0.2);
  }
`;

export const FormButton = styled.button`
  padding: 10px 20px;
  background: #6e45e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  
  &:hover {
    background: #5a3bc9;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;