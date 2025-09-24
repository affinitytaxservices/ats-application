import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AutorenewIcon from '@mui/icons-material/Autorenew';

// Premium animation keyframes
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.6), 0 0 60px rgba(139, 92, 246, 0.4);
  }
`;

// Styled components with premium effects
const QuoteContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6),
  borderRadius: '32px',
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
  overflow: 'hidden',
  animation: `${glow} 4s ease-in-out infinite`,
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe)',
    backgroundSize: '300% 100%',
    animation: `${shimmer} 3s ease-in-out infinite`,
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
    animation: `${float} 6s ease-in-out infinite`,
  },
  
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 40px 120px rgba(99, 102, 241, 0.25)',
  },
}));

const QuoteText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", "Georgia", serif',
  fontStyle: 'italic',
  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
  lineHeight: 1.6,
  color: '#1F2937',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #1F2937 0%, #4F46E5 50%, #10B981 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% 200%',
  animation: `${shimmer} 4s ease-in-out infinite`,
}));

const AuthorText = styled(Typography)(({ theme: _theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#6B7280',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
  '&::before': {
    content: '"— "',
    color: '#3B82F6',
  },
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  fontSize: '3rem',
  color: 'rgba(99, 102, 241, 0.2)',
  transform: 'rotate(180deg)',
  zIndex: 1,
}));

const RefreshButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  background: 'rgba(99, 102, 241, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  color: '#6366F1',
  zIndex: 3,
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'rgba(99, 102, 241, 0.2)',
    transform: 'rotate(180deg) scale(1.1)',
    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
  },
}));

// Inspirational quotes focused on financial success and tax efficiency
const quotes = [
  {
    text: "The art of taxation consists in so plucking the goose as to obtain the largest possible amount of feathers with the smallest possible amount of hissing.",
    author: "Jean-Baptiste Colbert"
  },
  {
    text: "In this world nothing can be said to be certain, except death and taxes. But with proper planning, taxes can be optimized.",
    author: "Benjamin Franklin (adapted)"
  },
  {
    text: "The hardest thing to understand in the world is the income tax. The smartest thing is to have an expert handle it.",
    author: "Albert Einstein (adapted)"
  },
  {
    text: "A penny saved is a penny earned, but a tax deduction found is money returned.",
    author: "Modern Tax Wisdom"
  },
  {
    text: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make, so you can give money back and have money to invest. Smart tax planning is part of that journey.",
    author: "Dave Ramsey (adapted)"
  },
  {
    text: "The real measure of your wealth is how much you'd be worth if you lost all your money. But keeping more of what you earn through smart tax strategies helps build that foundation.",
    author: "Warren Buffett (adapted)"
  },
  {
    text: "Don't let what you cannot do interfere with what you can do. You can't avoid taxes, but you can minimize them legally.",
    author: "John Wooden (adapted)"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now. The same applies to tax planning.",
    author: "Chinese Proverb (adapted)"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts. This includes facing your taxes with confidence.",
    author: "Winston Churchill (adapted)"
  },
  {
    text: "The difference between tax avoidance and tax evasion is the thickness of a prison wall. Choose professional guidance.",
    author: "Denis Healey"
  },
  {
    text: "Compound interest is the eighth wonder of the world. Tax efficiency is the ninth.",
    author: "Modern Financial Wisdom"
  },
  {
    text: "It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
    author: "Robert Kiyosaki"
  }
];

const InspirationalQuotes = React.forwardRef(({ autoRotate = false, rotationInterval = 8000 }, ref) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Auto-rotate quotes
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFadeIn(true);
      }, 300);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotationInterval]);

  const handleRefresh = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
      setFadeIn(true);
    }, 300);
  };

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <QuoteContainer ref={ref}>
      <QuoteIcon />
      <RefreshButton onClick={handleRefresh} title="Next Quote">
        <AutorenewIcon />
      </RefreshButton>
      
      <Fade in={fadeIn} timeout={600}>
        <Box>
          <QuoteText>
            "{currentQuote.text}"
          </QuoteText>
          <AuthorText>
            {currentQuote.author}
          </AuthorText>
        </Box>
      </Fade>
    </QuoteContainer>
  );
});

export default InspirationalQuotes;