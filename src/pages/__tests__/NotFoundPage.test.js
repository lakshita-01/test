/**
 * NotFoundPage Component Tests
 * 
 * Test suite for the 404 Not Found page component
 * to ensure proper functionality and accessibility.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import NotFoundPage from '../NotFoundPage';
import theme from '../../theme/theme';

// Mock the navigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock performance utilities
jest.mock('../../utils/performance', () => ({
  shouldUseReducedAnimations: () => false,
}));

// Test wrapper component
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </BrowserRouter>
);

describe('NotFoundPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    // Reset document title
    document.title = 'Test';
  });

  afterEach(() => {
    // Clean up any side effects
    document.title = 'Test';
  });

  test('renders 404 error message', () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Oops! Page Not Found')).toBeInTheDocument();
    expect(screen.getByText(/The page you're looking for seems to have moved/)).toBeInTheDocument();
  });

  test('sets correct page title', async () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(document.title).toBe('404 - Page Not Found | Bluestock');
    });
  });

  test('renders navigation buttons', () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    expect(screen.getByText('Go to Homepage')).toBeInTheDocument();
    expect(screen.getByText('Go Back')).toBeInTheDocument();
    expect(screen.getByText('Browse IPOs')).toBeInTheDocument();
  });

  test('navigates to home when "Go to Homepage" is clicked', () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    const homeButton = screen.getByText('Go to Homepage');
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  test('navigates back when "Go Back" is clicked', () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    const backButton = screen.getByText('Go Back');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('navigates to IPOs when "Browse IPOs" is clicked', () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    const browseButton = screen.getByText('Browse IPOs');
    fireEvent.click(browseButton);

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  test('displays error code', () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    expect(screen.getByText('Error Code: 404')).toBeInTheDocument();
  });

  test('displays helpful message', () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    expect(screen.getByText(/Quick Links/)).toBeInTheDocument();
    expect(screen.getByText(/Check out our latest IPO listings/)).toBeInTheDocument();
  });

  test('is accessible', () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    // Check for proper heading structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('404');

    const secondaryHeading = screen.getByRole('heading', { level: 2 });
    expect(secondaryHeading).toHaveTextContent('Oops! Page Not Found');

    // Check for proper button roles
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  test('handles window history fallback for go back', () => {
    // Mock window.history.length to be 1 (no history)
    Object.defineProperty(window, 'history', {
      value: { length: 1 },
      writable: true,
    });

    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    const backButton = screen.getByText('Go Back');
    fireEvent.click(backButton);

    // Should navigate to home instead of going back
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  test('renders animated icon', () => {
    render(
      <TestWrapper>
        <NotFoundPage />
      </TestWrapper>
    );

    // The animated icon should be present (we can't easily test the animation itself)
    const iconContainer = screen.getByText('404').closest('div').parentElement;
    expect(iconContainer).toBeInTheDocument();
  });
});