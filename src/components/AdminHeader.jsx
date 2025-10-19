import React from 'react';
import styled from 'styled-components';

const AdminHeaderContainer = styled.header`
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const LogoutButton = styled.button`
  background: white;
  color: #6e45e2;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #f0f0f0;
  }
`;

const AdminHeader = ({ onLogout }) => {
  return (
    <AdminHeaderContainer>
      <HeaderContent>
        <Title>Admin Dashboard</Title>
        <LogoutButton onClick={onLogout}>
          Logout
        </LogoutButton>
      </HeaderContent>
    </AdminHeaderContainer>
  );
};

export default AdminHeader;