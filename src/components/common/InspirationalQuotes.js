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
  padding: theme.spacing(4),
  borderRadius: '24px',
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
  fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
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
  fontSize: '0.875rem',
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
  fontSize: '2.5rem',
  color: 'rgba(99, 102, 241, 0.2)',
  transform: 'rotate(180deg)',
  zIndex: 1,
}));

const RefreshButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  color: theme.palette.primary.main,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    transform: 'rotate(180deg) scale(1.1)',
    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
  },
}));

const CategoryBadge = styled(Box)(({ theme, category }) => {
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'financial_responsibility':
        return {
          bg: 'rgba(34, 197, 94, 0.1)',
          border: 'rgba(34, 197, 94, 0.3)',
          text: '#059669'
        };
      case 'civic_duty':
        return {
          bg: 'rgba(59, 130, 246, 0.1)',
          border: 'rgba(59, 130, 246, 0.3)',
          text: '#2563eb'
        };
      case 'economic_impact':
        return {
          bg: 'rgba(168, 85, 247, 0.1)',
          border: 'rgba(168, 85, 247, 0.3)',
          text: '#7c3aed'
        };
      default:
        return {
          bg: 'rgba(107, 114, 128, 0.1)',
          border: 'rgba(107, 114, 128, 0.3)',
          text: '#6b7280'
        };
    }
  };

  const colors = getCategoryColor(category);
  
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '16px',
    backgroundColor: colors.bg,
    border: `1px solid ${colors.border}`,
    color: colors.text,
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'capitalize',
    marginBottom: theme.spacing(2),
    backdropFilter: 'blur(5px)',
    transition: 'all 0.3s ease',
  };
});

// Enhanced inspirational quotes categorized by themes: Financial Responsibility, Civic Duty, Economic Impact
const quotes = [
  // Financial Responsibility Theme
  {
    text: "The art of taxation consists in so plucking the goose as to obtain the largest possible amount of feathers with the smallest possible amount of hissing.",
    author: "Jean-Baptiste Colbert",
    category: "financial_responsibility"
  },
  {
    text: "In this world nothing can be said to be certain, except death and taxes.",
    author: "Benjamin Franklin",
    category: "financial_responsibility"
  },
  {
    text: "The hardest thing to understand in the world is the income tax.",
    author: "Albert Einstein",
    category: "financial_responsibility"
  },
  {
    text: "It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
    author: "Robert Kiyosaki",
    category: "financial_responsibility"
  },
  {
    text: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make, so you can give money back and have money to invest.",
    author: "Dave Ramsey",
    category: "financial_responsibility"
  },
  {
    text: "The difference between tax avoidance and tax evasion is the thickness of a prison wall.",
    author: "Denis Healey",
    category: "financial_responsibility"
  },
  
  // Civic Duty Theme
  {
    text: "Taxes are what we pay for civilized society.",
    author: "Oliver Wendell Holmes Jr.",
    category: "civic_duty"
  },
  {
    text: "The power to tax is the power to destroy, but also the power to keep alive.",
    author: "John Marshall",
    category: "civic_duty"
  },
  {
    text: "Paying taxes is an honor and privilege. It means you're earning money and contributing to society.",
    author: "Modern Civic Wisdom",
    category: "civic_duty"
  },
  {
    text: "A good citizen will pay his taxes cheerfully, but he will never pay more than the law demands.",
    author: "Tax Professional Wisdom",
    category: "civic_duty"
  },
  {
    text: "The spirit of a people, its cultural level, its social structure, the deeds its policy may prepare—all this and more is written in its fiscal history.",
    author: "Joseph Schumpeter",
    category: "civic_duty"
  },
  
  // Economic Impact Theme
  {
    text: "The best things in life are free, but sooner or later the government will find a way to tax them.",
    author: "Anonymous",
    category: "economic_impact"
  },
  {
    text: "A tax loophole is something that benefits the other guy. If it benefits you, it is tax reform.",
    author: "Russell B. Long",
    category: "economic_impact"
  },
  {
    text: "The income tax has made more liars out of the American people than golf has.",
    author: "Will Rogers",
    category: "economic_impact"
  },
  {
    text: "There is no such thing as a good tax.",
    author: "Winston Churchill",
    category: "economic_impact"
  },
  {
    text: "The point to remember is that what the government gives it must first take away.",
    author: "John S. Coleman",
    category: "economic_impact"
  },
  {
    text: "Taxation without representation is tyranny.",
    author: "James Otis",
    category: "economic_impact"
  },
  {
    text: "The taxpayer—that's someone who works for the federal government but doesn't have to take the civil service examination.",
    author: "Ronald Reagan",
    category: "economic_impact"
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

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'financial_responsibility':
        return 'Financial Responsibility';
      case 'civic_duty':
        return 'Civic Duty';
      case 'economic_impact':
        return 'Economic Impact';
      default:
        return 'General';
    }
  };

  return (
    <QuoteContainer ref={ref}>
      <QuoteIcon />
      <RefreshButton onClick={handleRefresh} title="Next Quote">
        <AutorenewIcon />
      </RefreshButton>
      
      <Fade in={fadeIn} timeout={600}>
        <Box>
          <CategoryBadge category={currentQuote.category}>
            {getCategoryLabel(currentQuote.category)}
          </CategoryBadge>
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