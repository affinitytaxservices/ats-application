import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Rating, 
  Grid,
  IconButton,
  Fade,
  Slide,
  Button,
  Chip,
  Stack,
  Dialog
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import SuccessStoryModal from './SuccessStoryModal';
import SuccessStoryForm from './SuccessStoryForm';

// Premium animations
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
    transform: translateY(-8px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled components
const TestimonialsContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(8, 0),
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(248, 250, 252, 0.05) 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: '32px',
  overflow: 'hidden',
  
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
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  boxShadow: '0 25px 80px rgba(0, 0, 0, 0.12)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${float} 6s ease-in-out infinite`,
  
  [theme.breakpoints.down('sm')]: {
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    margin: '0 8px',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 16px 48px rgba(99, 102, 241, 0.15)',
    },
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899)',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.6s ease',
  },
  
  '&:hover': {
    transform: 'translateY(-12px) scale(1.03)',
    boxShadow: '0 40px 120px rgba(99, 102, 241, 0.25)',
    '&::before': {
      transform: 'scaleX(1)',
    },
  },
  
  // Touch device optimizations
  '@media (hover: none) and (pointer: coarse)': {
    '&:hover': {
      transform: 'none',
    },
    '&:active': {
      transform: 'scale(0.98)',
      transition: 'transform 0.1s ease',
    },
  },
}));

const ClientAvatar = styled(Avatar)(({ theme: _theme }) => ({
  width: 80,
  height: 80,
  margin: '0 auto 16px',
  border: '4px solid rgba(99, 102, 241, 0.2)',
  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
  transition: 'all 0.4s ease',
  animation: `${pulse} 4s ease-in-out infinite`,
  
  '&:hover': {
    transform: 'scale(1.1)',
    border: '4px solid rgba(99, 102, 241, 0.5)',
    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.5)',
  },
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  fontSize: '2.5rem',
  color: 'rgba(99, 102, 241, 0.15)',
  transform: 'rotate(180deg)',
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(99, 102, 241, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(99, 102, 241, 0.2)',
  color: '#6366F1',
  width: 56,
  height: 56,
  transition: 'all 0.3s ease',
  
  [theme.breakpoints.down('sm')]: {
    width: 48,
    height: 48,
    minWidth: 48,
    minHeight: 48,
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
    },
  },
  
  '&:hover': {
    background: 'rgba(99, 102, 241, 0.2)',
    transform: 'scale(1.1)',
    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
  },
  
  '&:active': {
    transform: 'scale(0.95)',
    background: 'rgba(99, 102, 241, 0.3)',
  },
  
  '&:disabled': {
    opacity: 0.5,
    transform: 'none',
  },
}));

const StyledRating = styled(Rating)(({ theme: _theme }) => ({
  '& .MuiRating-iconFilled': {
    color: '#F59E0B',
    filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))',
  },
  '& .MuiRating-iconEmpty': {
    color: 'rgba(245, 158, 11, 0.3)',
  },
}));

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Tony Stark',
    role: 'Small Business Owner',
    avatar: '/logo-icon-only.svg',
    rating: 5,
    text: 'Affinity Tax Services transformed my business finances. Their strategic tax planning saved me over $15,000 last year, and their expertise in small business deductions was invaluable. The team is professional, responsive, and truly cares about their clients\' success.',
    savings: '$15,000',
    year: '2023'
  },

  {
    id: 3,
    name: 'Natasha Romanoff',
    role: 'Freelance Consultant',
    avatar: '/logo-icon-only.svg',
    rating: 5,
    text: 'Working with Affinity Tax Services has been a game-changer for my freelance business. They helped me understand quarterly payments, maximize deductions, and plan for the future. I finally feel confident about my tax strategy.',
    savings: '$8,750',
    year: '2023'
  },
  {
    id: 4,
    name: 'Bruce Banner',
    role: 'Tech Executive',
    avatar: '/logo-icon-only.svg',
    rating: 5,
    text: 'The level of service and expertise at Affinity is unmatched. They handled my stock options, RSUs, and complex compensation package with ease. Their year-round support gives me peace of mind knowing my taxes are optimized.',
    savings: '$31,200',
    year: '2023'
  },
  {
    id: 5,
    name: 'Wanda Maximoff',
    role: 'Medical Professional',
    avatar: '/logo-icon-only.svg',
    rating: 5,
    text: 'As a busy physician, I needed a tax service that could handle everything efficiently. Affinity exceeded my expectations with their attention to detail and proactive communication. They found deductions specific to my profession that saved me thousands.',
    savings: '$12,400',
    year: '2023'
  },
  {
    id: 6,
    name: 'Thor Odinson',
    role: 'Retired Executive',
    avatar: '/logo-icon-only.svg',
    rating: 5,
    text: 'Retirement brought new tax challenges with my 401k distributions and Social Security. The team at Affinity created a comprehensive strategy that minimized my tax burden while maximizing my retirement income. Truly professional service.',
    savings: '$18,900',
    year: '2023'
  }
];

const PremiumTestimonials = ({ autoRotate = true, rotationInterval = 6000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState(3);
  const [containerRef, isVisible] = useScrollAnimation(0.2);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  // Filter categories
  const filterCategories = ['All', 'Business Owner', 'Freelancer', 'Startup Founder', 'HR Manager'];

  // Filter testimonials based on selected category
  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredTestimonials(testimonials);
    } else {
      const filtered = testimonials.filter(testimonial => 
        testimonial.role.includes(selectedFilter)
      );
      setFilteredTestimonials(filtered);
    }
    setCurrentIndex(0); // Reset to first testimonial when filter changes
  }, [selectedFilter]);

  // Handle filter change
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setVisibleTestimonials(1);
      } else if (window.innerWidth < 960) {
        setVisibleTestimonials(2);
      } else {
        setVisibleTestimonials(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoRotate || !isVisible || filteredTestimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        (prev + visibleTestimonials) % filteredTestimonials.length
      );
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotationInterval, visibleTestimonials, isVisible, filteredTestimonials.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? filteredTestimonials.length - visibleTestimonials : prev - visibleTestimonials
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      (prev + visibleTestimonials) % filteredTestimonials.length
    );
  };

  const getCurrentTestimonials = () => {
    const result = [];
    for (let i = 0; i < visibleTestimonials; i++) {
      const index = (currentIndex + i) % filteredTestimonials.length;
      if (filteredTestimonials[index]) {
        result.push(filteredTestimonials[index]);
      }
    }
    return result;
  };

  const handleViewStory = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTestimonial(null);
  };

  const handleOpenSubmissionForm = () => {
    setShowSubmissionForm(true);
  };

  const handleCloseSubmissionForm = () => {
    setShowSubmissionForm(false);
  };

  const handleSubmitStory = (storyData) => {
    console.log('New success story submitted:', storyData);
    // Here you would typically send the data to your backend
    // For now, we'll just log it
  };

  return (
    <TestimonialsContainer ref={containerRef}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Fade in={isVisible} timeout={1000}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Client Success Stories
          </Typography>
        </Fade>
        <Fade in={isVisible} timeout={1200}>
          <Typography
            variant="body1"
            sx={{
              color: '#6B7280',
              fontSize: '1.125rem',
              maxWidth: 600,
              mx: 'auto',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Discover how our expert tax services have helped clients save thousands and achieve their financial goals.
          </Typography>
        </Fade>
        
        {/* Add Story Button */}
        <Fade in={isVisible} timeout={1600}>
          <Box sx={{ mb: 4 }}>
            <Button
              onClick={handleOpenSubmissionForm}
              startIcon={<AddIcon />}
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#667eea',
                color: '#667eea',
                borderRadius: '12px',
                padding: '10px 24px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#4F46E5',
                  background: 'rgba(102, 126, 234, 0.05)',
                },
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Share Your Success Story
            </Button>
          </Box>
        </Fade>
        
        {/* Filter Chips */}
        <Fade in={isVisible} timeout={1400}>
          <Box sx={{ mt: 4, mb: 2 }}>
            <Stack 
              direction="row" 
              spacing={1} 
              justifyContent="center" 
              flexWrap="wrap"
              sx={{ gap: 1 }}
            >
              <FilterListIcon sx={{ color: '#667eea', mr: 1, alignSelf: 'center' }} />
              {filterCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => handleFilterChange(category)}
                  variant={selectedFilter === category ? 'filled' : 'outlined'}
                  sx={{
                    background: selectedFilter === category 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'transparent',
                    color: selectedFilter === category ? 'white' : '#667eea',
                    borderColor: '#667eea',
                    '&:hover': {
                      background: selectedFilter === category 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'rgba(102, 126, 234, 0.1)',
                    },
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Fade>
      </Box>

      <Box sx={{ position: 'relative', px: { xs: 2, md: 4 } }}>
        <Grid container spacing={4} justifyContent="center">
          {getCurrentTestimonials().map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
              <Slide
                direction="up"
                in={isVisible}
                timeout={1000 + (index * 200)}
              >
                <TestimonialCard>
                  <QuoteIcon />
                  <CardContent sx={{ 
                    p: { xs: 3, sm: 4 }, 
                    textAlign: 'center',
                    '&:last-child': { pb: { xs: 3, sm: 4 } }
                  }}>
                    <ClientAvatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    >
                      {testimonial.name.charAt(0)}
                    </ClientAvatar>
                    
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: '#1F2937',
                        mb: 1,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#6B7280',
                        mb: 2,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {testimonial.role}
                    </Typography>
                    
                    <StyledRating
                      value={testimonial.rating}
                      readOnly
                      sx={{ mb: 3 }}
                    />
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#374151',
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                        mb: 3,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pt: 2,
                        borderTop: '1px solid rgba(99, 102, 241, 0.1)',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#10B981',
                          fontWeight: 600,
                          fontFamily: '"Inter", sans-serif',
                        }}
                      >
                        Saved: {testimonial.savings}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#6B7280',
                          fontFamily: '"Inter", sans-serif',
                        }}
                      >
                        {testimonial.year}
                      </Typography>
                    </Box>
                    
                    {/* Action Buttons */}
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        mt: 2,
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        onClick={() => handleViewStory(testimonial)}
                        startIcon={<VisibilityIcon />}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: '#667eea',
                          color: '#667eea',
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 500,
                          '&:hover': {
                            borderColor: '#4F46E5',
                            background: 'rgba(102, 126, 234, 0.05)',
                          },
                          fontFamily: '"Inter", sans-serif',
                        }}
                      >
                        View Full Story
                      </Button>
                    </Box>
                  </CardContent>
                </TestimonialCard>
              </Slide>
            </Grid>
          ))}
        </Grid>

        {/* Navigation buttons */}
        {filteredTestimonials.length > visibleTestimonials && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 1.5, sm: 2 },
              mt: { xs: 3, sm: 4 },
              mb: { xs: 2, sm: 0 },
              px: { xs: 2, sm: 0 },
            }}
          >
            <NavigationButton onClick={handlePrevious}>
              <ArrowBackIosIcon />
            </NavigationButton>
            <NavigationButton onClick={handleNext}>
              <ArrowForwardIosIcon />
            </NavigationButton>
          </Box>
        )}
      </Box>

      {/* Success Story Modal */}
      <SuccessStoryModal
        open={modalOpen}
        onClose={handleCloseModal}
        testimonial={selectedTestimonial}
      />

      {/* Success Story Submission Form Dialog */}
      <Dialog
        open={showSubmissionForm}
        onClose={handleCloseSubmissionForm}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: 'transparent',
            boxShadow: 'none',
          }
        }}
      >
        <SuccessStoryForm
          onSubmit={handleSubmitStory}
          onClose={handleCloseSubmissionForm}
        />
      </Dialog>
    </TestimonialsContainer>
  );
};

export default PremiumTestimonials;
