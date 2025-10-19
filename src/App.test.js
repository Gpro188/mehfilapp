import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Arts Fest Results Manager title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Arts Fest Results Manager/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Public View and Admin Panel buttons', () => {
  render(<App />);
  const publicViewButton = screen.getByText(/Public View/i);
  const adminPanelButton = screen.getByText(/Admin Panel/i);
  
  expect(publicViewButton).toBeInTheDocument();
  expect(adminPanelButton).toBeInTheDocument();
});