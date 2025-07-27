import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IpoPage from '../IpoPage';
import { AppProvider } from '../../context/AppContext';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

const theme = createTheme();

const MockedIpoPage = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <IpoPage />
      </AppProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('IpoPage', () => {
  test('renders IPO page sections', async () => {
    render(<MockedIpoPage />);
    
    // Check if main sections are rendered
    await waitFor(() => {
      expect(screen.getByText('Ongoing IPOs')).toBeInTheDocument();
      expect(screen.getByText('BLUESTOCK')).toBeInTheDocument();
      expect(screen.getByText('Upcoming IPOs')).toBeInTheDocument();
      expect(screen.getByText('Recently Listed IPOs')).toBeInTheDocument();
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });
  });

  test('renders IPO cards with correct information', async () => {
    render(<MockedIpoPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Niva Bupa Health')).toBeInTheDocument();
      expect(screen.getByText('EPAK Durable Ltd.')).toBeInTheDocument();
      expect(screen.getByText('TK Spandex Ltd.')).toBeInTheDocument();
    });
  });

  test('renders call-to-action button', async () => {
    render(<MockedIpoPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Open a Free Demat Account')).toBeInTheDocument();
    });
  });

  test('renders FAQ section', async () => {
    render(<MockedIpoPage />);
    
    await waitFor(() => {
      expect(screen.getByText('What is an IPO?')).toBeInTheDocument();
      expect(screen.getByText('How to invest in an IPO?')).toBeInTheDocument();
    });
  });
});