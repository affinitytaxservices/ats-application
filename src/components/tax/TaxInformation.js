import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Fade,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Article as ArticleIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  DateRange as DateRangeIcon,
  AccountBalance as TaxIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(() => ({
  height: '100%',
  background: 'rgba(248, 250, 252, 0.95)', // Light gray background
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(226, 232, 240, 0.8)', // Light border
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)', // Blue shadow on hover
    background: 'rgba(241, 245, 249, 0.98)', // Slightly darker light background on hover
  }
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'rgba(248, 250, 252, 0.95)', // Light gray background
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(226, 232, 240, 0.8)', // Light border
  marginBottom: theme.spacing(2),
  '&:before': {
    display: 'none',
  },
  '&:hover': {
    background: 'rgba(241, 245, 249, 0.98)', // Slightly darker light background on hover
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)', // Updated to use primary and secondary colors
  marginRight: theme.spacing(2),
  '& svg': {
    color: '#ffffff',
    fontSize: 24,
  }
}));

const taxGuides = [
  {
    title: 'Individual Tax Guide',
    content: 'Understanding personal income tax, deductions, credits, and filing requirements.',
    icon: <ArticleIcon />,
    route: '/individual-tax',
  },
  {
    title: 'Business Tax Guide',
    content: 'Essential information for business owners about corporate taxes, deductions, and compliance.',
    icon: <AssignmentIcon />,
    route: '/business-tax',
  },
  {
    title: 'Tax Education Center',
    content: 'Learn about tax basics, advanced topics, and stay updated with tax law changes.',
    icon: <SchoolIcon />,
    route: '/tax-planning',
  },
];

const importantDates = [
  {
    date: 'April 15, 2026',
    event: 'Individual Tax Return Due Date for 2025 Tax Year',
  },
  {
    date: 'April 15, 2026',
    event: 'Deadline to Make IRA and HSA Contributions for 2025 Tax Year',
  },
  {
    date: 'April 15, 2026',
    event: 'First Quarter Estimated Tax Payment Due for 2026',
  },
  {
    date: 'June 15, 2026',
    event: 'Second Quarter Estimated Tax Payment Due for 2026',
  },
  {
    date: 'September 15, 2026',
    event: 'Third Quarter Estimated Tax Payment Due for 2026',
  },
  {
    date: 'January 15, 2027',
    event: 'Fourth Quarter Estimated Tax Payment Due for 2026',
  },
];

const taxTopics = [
  {
    title: 'Income Tax Basics',
    content: [
      'Understanding tax brackets and rates',
      'Filing status options',
      'Standard vs. itemized deductions',
      'Tax credits and exemptions',
    ],
  },
  {
    title: 'Deductions & Credits',
    content: [
      'Common tax deductions',
      'Available tax credits',
      'Business expense deductions',
      'Investment-related deductions',
    ],
  },
  {
    title: 'Tax Planning Strategies',
    content: [
      'Year-end tax planning tips',
      'Retirement account contributions',
      'Business tax planning',
    ],
  },
];

function TaxInformation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const newLocal = <span style={{ color: '#DC2626', fontWeight: 'bold', textShadow: '0 1px 2px rgba(220,38,38,0.3)' }}>Tax Information & Resources</span>;
  return (
    <Box sx={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
        <Fade in timeout={800}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              textAlign: 'center',
              mb: 6,
              background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)', // Updated to use primary and secondary colors
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}
          >
            {newLocal}
          </Typography>
        </Fade>

        {/* Tax Guides Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {taxGuides.map((guide, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <IconWrapper>
                        {guide.icon}
                      </IconWrapper>
                      <Typography variant="h6" sx={{ color: '#1E293B' }}>
                        {guide.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#475569', mb: 3 }}>
                      {guide.content}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate(guide.route)}
                      sx={{ 
                        borderColor: '#10B981',
                        color: '#1E293B',
                        '&:hover': {
                          borderColor: '#1E3A8A',
                          background: 'rgba(16, 185, 129, 0.1)'
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </StyledCard>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Important Dates Section */}
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            mb: { xs: 3, md: 4 },
            color: '#1E293B',
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Important Tax Dates
        </Typography>
        
        <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: { xs: 4, md: 8 } }}>
          {importantDates.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ mb: { xs: 2, md: 2 } }}>
              <Fade in timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <IconWrapper>
                        <DateRangeIcon />
                      </IconWrapper>
                      <Typography variant="h6" sx={{ color: '#1E293B' }}>
                        {item.date}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#475569' }}>
                      {item.event}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Tax Topics Section */}
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            mb: { xs: 3, md: 4 },
            color: '#1E293B',
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Tax Topics
        </Typography>
        
        {taxTopics.map((topic, index) => (
          <Fade in timeout={800} style={{ transitionDelay: `${index * 200}ms` }} key={index}>
            <StyledAccordion sx={{ mb: { xs: 1.5, md: 2 } }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon sx={{ color: '#1E293B' }} />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
                sx={{ 
                  py: { xs: 1, md: 1.5 },
                  '& .MuiAccordionSummary-content': {
                    margin: '12px 0'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconWrapper>
                    <TaxIcon />
                  </IconWrapper>
                  <Typography variant="h6" sx={{ color: '#1E293B' }}>
                    {topic.title}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List sx={{ py: 0 }}>
                  {topic.content.map((item, itemIndex) => (
                    <ListItem key={itemIndex} sx={{ py: { xs: 0.5, md: 1 } }}>
                      <ListItemIcon sx={{ minWidth: { xs: 36, md: 56 } }}>
                        <ArticleIcon sx={{ color: '#10B981' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item} 
                        primaryTypographyProps={{ 
                          sx: { color: '#475569', fontSize: { xs: '0.875rem', md: '1rem' } }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </StyledAccordion>
          </Fade>
        ))}
        </Box>
      </Container>
    </Box>
  );
}

export default TaxInformation;