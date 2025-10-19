import { useState, useMemo } from 'react';

const useSearchFilter = (data, searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => {
        return searchFields.some(field => {
          const value = item[field];
          return value && value.toString().toLowerCase().includes(term);
        });
      });
    }
    
    // Apply other filters
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        result = result.filter(item => {
          if (typeof filters[key] === 'object' && filters[key].includes) {
            // Handle array values
            return filters[key].includes(item[key]);
          } else {
            // Handle single values
            return item[key] === filters[key];
          }
        });
      }
    });
    
    return result;
  }, [data, searchTerm, filters, searchFields]);
  
  const setSearch = (term) => {
    setSearchTerm(term);
  };
  
  const setFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({});
  };
  
  return {
    filteredData,
    searchTerm,
    filters,
    setSearch,
    setFilter,
    clearFilters
  };
};

export default useSearchFilter;