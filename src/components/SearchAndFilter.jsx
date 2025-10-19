import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background: white;
  border-radius: 30px;
  padding: 10px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  max-width: 500px;
  margin: 20px auto;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  background: #6e45e2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  cursor: pointer;
  font-weight: bold;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? '#6e45e2' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.active ? 'white' : 'white'};
  border: 1px solid ${props => props.active ? '#6e45e2' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 20px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: ${props => props.active ? '#5a3bc9' : 'rgba(255, 255, 255, 0.3)'};
  }
`;

const SearchAndFilter = ({ onSearch, onFilter, teams, categories, currentFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = () => {
    onSearch(searchTerm);
  };
  
  const handleTeamFilter = (teamId) => {
    onFilter({
      ...currentFilters,
      teamId: currentFilters.teamId === teamId ? null : teamId
    });
  };
  
  const handleCategoryFilter = (category) => {
    onFilter({
      ...currentFilters,
      category: currentFilters.category === category ? null : category
    });
  };
  
  return (
    <>
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Search by student name or program..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      
      <FilterContainer>
        <FilterButton 
          active={!currentFilters.teamId}
          onClick={() => onFilter({...currentFilters, teamId: null})}
        >
          All Teams
        </FilterButton>
        {teams.map(team => (
          <FilterButton 
            key={team.id}
            active={currentFilters.teamId === team.id}
            onClick={() => handleTeamFilter(team.id)}
          >
            {team.name}
          </FilterButton>
        ))}
      </FilterContainer>
      
      <FilterContainer>
        <FilterButton 
          active={!currentFilters.category}
          onClick={() => onFilter({...currentFilters, category: null})}
        >
          All Categories
        </FilterButton>
        {categories.map(category => (
          <FilterButton 
            key={category}
            active={currentFilters.category === category}
            onClick={() => handleCategoryFilter(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>
    </>
  );
};

export default SearchAndFilter;