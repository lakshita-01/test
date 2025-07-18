import React from 'react';
import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';

// Mock the AppContext
jest.mock('../../context/AppContext', () => ({
  useApp: () => ({
    state: { darkMode: false },
    actions: { toggleDarkMode: jest.fn() }
  })
}));

describe('AppPromoSection', () => {
  test('renders app promo section with correct content', () => {
    render(<Homepage />);
    
    // Check if the main heading is present
    expect(screen.getByText(/Bluestock App 2.0/)).toBeInTheDocument();
    expect(screen.getByText(/is Live Now!/)).toBeInTheDocument();
    
    // Check if download text is present
    expect(screen.getByText('Download Our App')).toBeInTheDocument();
    
    // Check if store badges are present
    expect(screen.getByAltText('Get it on Google Play')).toBeInTheDocument();
    expect(screen.getByAltText('Download on the App Store')).toBeInTheDocument();
    
    // Check if rating image is present
    expect(screen.getByAltText('User rating with avatars and stars')).toBeInTheDocument();
  });

  test('renders with correct image sources', () => {
    render(<Homepage />);
    
    // Check Google Play badge
    const googlePlayImg = screen.getByAltText('Get it on Google Play');
    expect(googlePlayImg).toHaveAttribute('src', '/icons/google-play.png');
    
    // Check App Store badge
    const appStoreImg = screen.getByAltText('Download on the App Store');
    expect(appStoreImg).toHaveAttribute('src', '/icons/apple-store.png');
    
    // Check rating image
    const ratingImg = screen.getByAltText('User rating with avatars and stars');
    expect(ratingImg).toHaveAttribute('src', '/icons/rating.png');
  });

  test('renders dark mode toggle button', () => {
    render(<Homepage />);
    
    // Check if dark mode toggle button is present
    const toggleButton = screen.getByLabelText('Toggle dark mode');
    expect(toggleButton).toBeInTheDocument();
  });

  test('dark mode toggle button has correct styling', () => {
    render(<Homepage />);
    
    const toggleButton = screen.getByLabelText('Toggle dark mode');
    expect(toggleButton).toHaveClass('fixed', 'top-4', 'right-4', 'z-50');
  });
});