import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: #6e45e2;
    box-shadow: 0 2px 8px rgba(110, 69, 226, 0.3);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    color: #333;
  }
`;

const SearchBar = ({ 
  placeholder = 'Search...', 
  onSearch, 
  initialValue = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };
  
  return (
    <SearchContainer>
      <SearchIcon />
      <form onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {searchTerm && (
        <ClearButton onClick={handleClear}>
          <FaTimes />
        </ClearButton>
      )}
    </SearchContainer>
  );
};

export default SearchBar;