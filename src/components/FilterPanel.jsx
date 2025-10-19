import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFilter } from 'react-icons/fa';

const FilterContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const FilterTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const FilterContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
`;

const FilterGroup = styled.div`
  margin-bottom: 15px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const FilterActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  
  ${props => props.primary && `
    background: #6e45e2;
    color: white;
    
    &:hover {
      background: #5a3bc9;
    }
  `}
  
  ${props => props.secondary && `
    background: #95a5a6;
    color: white;
    
    &:hover {
      background: #7f8c8d;
    }
  `}
`;

const FilterPanel = ({ 
  filters, 
  onApply, 
  onReset,
  teams = [],
  categories = [],
  programs = []
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [localFilters, setLocalFilters] = useState(filters);
  
  const handleFilterChange = (key, value) => {
    setLocalFilters({
      ...localFilters,
      [key]: value
    });
  };
  
  const handleApply = () => {
    onApply(localFilters);
  };
  
  const handleReset = () => {
    const resetFilters = {
      teamId: '',
      categoryId: '',
      programId: ''
    };
    setLocalFilters(resetFilters);
    onReset(resetFilters);
  };
  
  return (
    <FilterContainer>
      <FilterHeader onClick={() => setIsOpen(!isOpen)}>
        <FaFilter />
        <FilterTitle>Filters</FilterTitle>
      </FilterHeader>
      
      <FilterContent isOpen={isOpen}>
        <FilterRow>
          <FilterGroup>
            <FilterLabel>Team</FilterLabel>
            <FilterSelect
              value={localFilters.teamId}
              onChange={(e) => handleFilterChange('teamId', e.target.value)}
            >
              <option value="">All Teams</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Category</FilterLabel>
            <FilterSelect
              value={localFilters.categoryId}
              onChange={(e) => handleFilterChange('categoryId', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel>Program</FilterLabel>
            <FilterSelect
              value={localFilters.programId}
              onChange={(e) => handleFilterChange('programId', e.target.value)}
            >
              <option value="">All Programs</option>
              {programs.map(program => (
                <option key={program.id} value={program.id}>{program.name}</option>
              ))}
            </FilterSelect>
          </FilterGroup>
        </FilterRow>
        
        <FilterActions>
          <FilterButton secondary onClick={handleReset}>
            Reset
          </FilterButton>
          <FilterButton primary onClick={handleApply}>
            Apply Filters
          </FilterButton>
        </FilterActions>
      </FilterContent>
    </FilterContainer>
  );
};

export default FilterPanel;