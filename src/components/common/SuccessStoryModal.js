import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Rating,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';

// Styled components
const StyledDialog = styled(Dialog)(({ theme: _theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: { xs: '16px', md: '24px' },
    maxWidth: '900px',
    width: { xs: '95vw', md: '90vw' },
    maxHeight: { xs: '95vh', md: '90vh' },
    margin: { xs: '8px', md: '32px' },
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(99, 102, 241, 0.1)',
    boxShadow: '0 40px 120px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  color: 'white',
  padding: theme.spacing({ xs: 2, md: 3 }),
  position: 'relative',
  
  '& .MuiTypography-root': {
    fontSize: { xs: '1.25rem', md: '1.5rem' },
    fontWeight: 600,
    fontFamily: '"Inter", sans-serif',
  },
}));

const ClientHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'center', sm: 'flex-start' },
  gap: theme.spacing({ xs: 2, sm: 3 }),
  marginBottom: theme.spacing(3),
  padding: theme.spacing({ xs: 2, md: 3 }),
  background: 'rgba(99, 102, 241, 0.05)',
  borderRadius: '16px',
  border: '1px solid rgba(99, 102, 241, 0.1)',
  textAlign: { xs: 'center', sm: 'left' },
}));

const StyledAvatar = styled(Avatar)(({ theme: _theme }) => ({
  width: { xs: 64, md: 80 },
  height: { xs: 64, md: 80 },
  border: '4px solid rgba(99, 102, 241, 0.2)',
  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
}));

const MetricCard = styled(Card)(({ theme: _theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(99, 102, 241, 0.1)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.15)',
  },
}));

const QuoteSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  background: 'rgba(99, 102, 241, 0.02)',
  borderRadius: '16px',
  border: '1px solid rgba(99, 102, 241, 0.1)',
  marginBottom: theme.spacing(3),
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    borderRadius: '2px',
  },
}));

const SuccessStoryModal = ({ open, onClose, testimonial }) => {
  if (!testimonial) return null;

  // Extended testimonial data for modal
  const extendedData = {
    ...testimonial,
    industry: getIndustryFromRole(testimonial.role),
    timeline: '6 months',
    challenges: getChallengesFromRole(testimonial.role),
    solutions: getSolutionsFromRole(testimonial.role),
    results: getResultsFromRole(testimonial.role),
    beforeSavings: calculateBeforeSavings(testimonial.savings),
    afterSavings: testimonial.savings,
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
    >
      <StyledDialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            Client Success Story
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ 
              color: 'white',
              '&:hover': { 
                background: 'rgba(255, 255, 255, 0.1)' 
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </StyledDialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 4 }}>
          {/* Client Header */}
          <ClientHeader>
            <StyledAvatar
              src={testimonial.avatar}
              alt={testimonial.name}
            >
              {testimonial.name.charAt(0)}
            </StyledAvatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
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
                variant="body1"
                sx={{
                  color: '#6B7280',
                  mb: 2,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {testimonial.role}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  icon={<BusinessIcon />}
                  label={extendedData.industry}
                  size="small"
                  sx={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366F1' }}
                />
                <Chip
                  icon={<CalendarTodayIcon />}
                  label={`${extendedData.timeline} engagement`}
                  size="small"
                  sx={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' }}
                />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Rating
                value={testimonial.rating}
                readOnly
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#F59E0B',
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{ display: 'block', color: '#6B7280', mt: 1 }}
              >
                {testimonial.year}
              </Typography>
            </Box>
          </ClientHeader>

          {/* Success Metrics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <MetricCard>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <AttachMoneyIcon sx={{ fontSize: '2.5rem', color: '#10B981', mb: 1 }} />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#10B981',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {testimonial.savings}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    Total Savings
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <TrendingUpIcon sx={{ fontSize: '2.5rem', color: '#6366F1', mb: 1 }} />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#6366F1',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {calculateSavingsPercentage(extendedData.beforeSavings, testimonial.savings)}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    Tax Reduction
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <CalendarTodayIcon sx={{ fontSize: '2.5rem', color: '#8B5CF6', mb: 1 }} />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#8B5CF6',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {extendedData.timeline}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    Timeline
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>
          </Grid>

          {/* Testimonial Quote */}
          <QuoteSection>
            <FormatQuoteIcon
              sx={{
                fontSize: '2rem',
                color: 'rgba(99, 102, 241, 0.3)',
                mb: 2,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: '#374151',
                fontStyle: 'italic',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              "{testimonial.text}"
            </Typography>
          </QuoteSection>

          {/* Case Study Details */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 2,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Challenges
              </Typography>
              <Box sx={{ pl: 2 }}>
                {extendedData.challenges.map((challenge, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: '#6B7280',
                      mb: 1,
                      fontFamily: '"Inter", sans-serif',
                      '&::before': {
                        content: '"•"',
                        color: '#EF4444',
                        marginRight: '8px',
                      },
                    }}
                  >
                    {challenge}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 2,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Solutions
              </Typography>
              <Box sx={{ pl: 2 }}>
                {extendedData.solutions.map((solution, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: '#6B7280',
                      mb: 1,
                      fontFamily: '"Inter", sans-serif',
                      '&::before': {
                        content: '"•"',
                        color: '#6366F1',
                        marginRight: '8px',
                      },
                    }}
                  >
                    {solution}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#1F2937',
                  mb: 2,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Results
              </Typography>
              <Box sx={{ pl: 2 }}>
                {extendedData.results.map((result, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: '#6B7280',
                      mb: 1,
                      fontFamily: '"Inter", sans-serif',
                      '&::before': {
                        content: '"•"',
                        color: '#10B981',
                        marginRight: '8px',
                      },
                    }}
                  >
                    {result}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, background: 'rgba(99, 102, 241, 0.02)' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: '#6366F1',
            color: '#6366F1',
            '&:hover': {
              borderColor: '#4F46E5',
              background: 'rgba(99, 102, 241, 0.05)',
            },
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            },
          }}
        >
          Start Your Success Story
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

// Helper functions
function getIndustryFromRole(role) {
  const industries = {
    'Small Business Owner': 'Small Business',
    'Freelance Consultant': 'Consulting',
    'Tech Executive': 'Technology',
    'Medical Professional': 'Healthcare',
    'Retired Executive': 'Retirement Planning',
  };
  return industries[role] || 'Professional Services';
}

function getChallengesFromRole(role) {
  const challenges = {
    'Small Business Owner': [
      'Complex business deductions',
      'Quarterly tax planning',
      'Cash flow management'
    ],
    'Freelance Consultant': [
      'Irregular income patterns',
      'Business expense tracking',
      'Self-employment tax optimization'
    ],
    'Tech Executive': [
      'Stock option taxation',
      'RSU planning',
      'Alternative minimum tax'
    ],
    'Medical Professional': [
      'Professional liability considerations',
      'Equipment depreciation',
      'Practice expense optimization'
    ],
    'Retired Executive': [
      'Retirement distribution planning',
      'Social Security optimization',
      'Estate tax considerations'
    ],
  };
  return challenges[role] || ['Complex tax situation', 'Multiple income sources', 'Regulatory compliance'];
}

function getSolutionsFromRole(role) {
  const solutions = {
    'Small Business Owner': [
      'Strategic business structure optimization',
      'Automated quarterly planning system',
      'Comprehensive deduction analysis'
    ],
    'Freelance Consultant': [
      'Income smoothing strategies',
      'Business entity restructuring',
      'Retirement plan optimization'
    ],
    'Tech Executive': [
      'Equity compensation planning',
      'Tax-loss harvesting',
      'Charitable giving strategies'
    ],
    'Medical Professional': [
      'Practice-specific deductions',
      'Equipment purchase timing',
      'Professional expense optimization'
    ],
    'Retired Executive': [
      'Distribution sequencing strategy',
      'Tax-efficient withdrawal planning',
      'Legacy planning integration'
    ],
  };
  return solutions[role] || ['Comprehensive tax strategy', 'Proactive planning', 'Ongoing optimization'];
}

function getResultsFromRole(role) {
  const results = {
    'Small Business Owner': [
      'Significant tax savings achieved',
      'Improved cash flow management',
      'Reduced audit risk'
    ],
    'Freelance Consultant': [
      'Stabilized tax obligations',
      'Increased retirement savings',
      'Better financial predictability'
    ],
    'Tech Executive': [
      'Minimized equity tax burden',
      'Optimized compensation timing',
      'Enhanced wealth building'
    ],
    'Medical Professional': [
      'Practice expense optimization',
      'Reduced tax liability',
      'Improved financial efficiency'
    ],
    'Retired Executive': [
      'Minimized retirement taxes',
      'Optimized Social Security',
      'Enhanced legacy planning'
    ],
  };
  return results[role] || ['Reduced tax liability', 'Improved financial position', 'Peace of mind'];
}

function calculateBeforeSavings(savings) {
  const amount = parseInt(savings.replace(/[$,]/g, ''));
  return `$${(amount * 2.5).toLocaleString()}`;
}

function calculateSavingsPercentage(before, after) {
  const beforeAmount = parseInt(before.replace(/[$,]/g, ''));
  const afterAmount = parseInt(after.replace(/[$,]/g, ''));
  return Math.round((afterAmount / beforeAmount) * 100);
}

export default SuccessStoryModal;