/**
 * Animated Icon Component
 * 
 * Lightweight CSS-based animated icons for better performance
 * compared to Lottie animations. Provides smooth animations
 * with minimal bundle size impact.
 */

import React from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Animation keyframes
const stockChart = keyframes`
  0% { 
    transform: scaleY(0.8) translateY(10px);
    opacity: 0.7;
  }
  25% { 
    transform: scaleY(1.2) translateY(-5px);
    opacity: 1;
  }
  50% { 
    transform: scaleY(0.9) translateY(5px);
    opacity: 0.8;
  }
  75% { 
    transform: scaleY(1.1) translateY(-3px);
    opacity: 1;
  }
  100% { 
    transform: scaleY(1) translateY(0px);
    opacity: 0.9;
  }
`;

const pulse = keyframes`
  0%, 100% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { 
    transform: translateY(0) rotate(0deg);
  }
  10% { 
    transform: translateY(-8px) rotate(2deg);
  }
  30% { 
    transform: translateY(-4px) rotate(-1deg);
  }
  40% { 
    transform: translateY(-2px) rotate(1deg);
  }
  60% { 
    transform: translateY(-1px) rotate(-0.5deg);
  }
`;

const float = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
  }
  25% { 
    transform: translateY(-10px) rotate(1deg);
  }
  50% { 
    transform: translateY(-5px) rotate(-1deg);
  }
  75% { 
    transform: translateY(-15px) rotate(0.5deg);
  }
`;

// Styled animated container
const AnimatedContainer = styled(Box)(({ theme, animation, duration, size }) => {
  const animations = {
    stockChart,
    pulse,
    bounce,
    float,
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size || '3rem',
    animation: `${animations[animation] || bounce} ${duration || '2s'} ease-in-out infinite`,
    transformOrigin: 'center',
    willChange: 'transform, opacity',
  };
});

// Stock chart bars component
const StockChartBars = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '4px',
  height: '60px',
  
  '& .bar': {
    width: '8px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px 2px 0 0',
    transformOrigin: 'bottom',
    
    '&:nth-of-type(1)': {
      height: '20px',
      animation: `${stockChart} 2s ease-in-out infinite`,
      animationDelay: '0s',
    },
    '&:nth-of-type(2)': {
      height: '35px',
      animation: `${stockChart} 2s ease-in-out infinite`,
      animationDelay: '0.2s',
    },
    '&:nth-of-type(3)': {
      height: '50px',
      animation: `${stockChart} 2s ease-in-out infinite`,
      animationDelay: '0.4s',
    },
    '&:nth-of-type(4)': {
      height: '30px',
      animation: `${stockChart} 2s ease-in-out infinite`,
      animationDelay: '0.6s',
    },
    '&:nth-of-type(5)': {
      height: '45px',
      animation: `${stockChart} 2s ease-in-out infinite`,
      animationDelay: '0.8s',
    },
  },
}));

/**
 * AnimatedIcon Component
 * 
 * @param {string} type - Type of icon ('emoji', 'stockChart', 'custom')
 * @param {string} icon - Icon content (emoji or custom content)
 * @param {string} animation - Animation type ('bounce', 'float', 'pulse', 'stockChart')
 * @param {string} duration - Animation duration (e.g., '2s', '1.5s')
 * @param {string} size - Icon size (e.g., '3rem', '4rem')
 * @param {object} sx - Additional styling
 */
const AnimatedIcon = ({ 
  type = 'emoji', 
  icon = '📈', 
  animation = 'bounce', 
  duration = '2s',
  size = '3rem',
  sx = {},
  ...props 
}) => {
  if (type === 'stockChart') {
    return (
      <AnimatedContainer 
        animation="float" 
        duration={duration} 
        size={size}
        sx={sx}
        {...props}
      >
        <StockChartBars>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </StockChartBars>
      </AnimatedContainer>
    );
  }

  return (
    <AnimatedContainer 
      animation={animation} 
      duration={duration} 
      size={size}
      sx={sx}
      {...props}
    >
      {icon}
    </AnimatedContainer>
  );
};

export default AnimatedIcon;