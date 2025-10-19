import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  overflow-x: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    background: #f9f9f9;
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
    font-weight: 600;
    color: #333;
  }
  
  td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    color: #666;
  }
  
  tr:hover {
    background: #f5f5f5;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

const ActionCell = styled.td`
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  
  ${props => props.primary && `
    background: #3498db;
    color: white;
    
    &:hover {
      background: #2980b9;
    }
  `}
  
  ${props => props.success && `
    background: #2ecc71;
    color: white;
    
    &:hover {
      background: #27ae60;
    }
  `}
  
  ${props => props.danger && `
    background: #e74c3c;
    color: white;
    
    &:hover {
      background: #c0392b;
    }
  `}
`;

const NoData = styled.div`
  text-align: center;
  padding: 30px;
  color: #666;
`;

const DataTable = ({ columns, data, actions, onAction }) => {
  if (data.length === 0) {
    return (
      <TableContainer>
        <NoData>No data available</NoData>
      </TableContainer>
    );
  }
  
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              {actions && (
                <ActionCell>
                  {actions.map((action, actionIndex) => (
                    <ActionButton
                      key={actionIndex}
                      {...action.style}
                      onClick={() => onAction(action.action, row)}
                    >
                      {action.label}
                    </ActionButton>
                  ))}
                </ActionCell>
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default DataTable;