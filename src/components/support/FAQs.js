import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  useTheme,
  alpha 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';

const FAQItem = ({ question, answer, expanded, handleChange, panelId }) => {
  const theme = useTheme();
  
  return (
    <Accordion 
      expanded={expanded === panelId} 
      onChange={handleChange(panelId)}
      sx={{
        mb: 2,
        borderRadius: '8px !important',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        '&:before': { display: 'none' },
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
        },
        overflow: 'hidden'
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
        aria-controls={`${panelId}-content`}
        id={`${panelId}-header`}
        sx={{
          backgroundColor: expanded === panelId ? alpha(theme.palette.primary.main, 0.05) : 'white',
          '& .MuiAccordionSummary-content': {
            my: 2
          }
        }}
      >
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            color: expanded === panelId ? 'primary.main' : 'text.primary',
            fontWeight: 600,
            fontSize: '1.1rem'
          }}
        >
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 3, bgcolor: 'white' }}>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

function FAQs() {
  const { faqs: seo } = seoConfig.pages;
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      id: 'panel1',
      question: 'What documents do I need for my tax return?',
      answer: 'Generally, you will need W-2s from all employers, 1099 forms (for interest, dividends, retirement, or contract work), proof of identification, and Social Security numbers for you and your dependents. If you own a business or have other income sources, additional documentation will be required.'
    },
    {
      id: 'panel2',
      question: 'When is the tax filing deadline?',
      answer: 'For most individuals, the federal tax filing deadline is April 15th. If April 15th falls on a weekend or holiday, the deadline is moved to the next business day. Extensions can be filed to push the deadline to October 15th, though any taxes owed are still due by the April deadline.'
    },
    {
      id: 'panel3',
      question: 'How long does it take to get my refund?',
      answer: 'Most refunds are issued within 21 days for taxpayers who file electronically and choose direct deposit. Paper returns can take 6-8 weeks or longer. You can check the status of your refund using our "Refund Status" tool or the IRS "Where\'s My Refund" tool.'
    },
    {
      id: 'panel4',
      question: 'Do you offer tax planning services?',
      answer: 'Yes, we provide comprehensive tax planning services for both individuals and businesses. Our goal is to help you minimize your tax liability through strategic planning throughout the year, not just at tax time.'
    },
    {
      id: 'panel5',
      question: 'Can you help if I get audited by the IRS?',
      answer: 'Absolutely. We offer audit support and representation services. If you receive a notice from the IRS, do not ignore it. Contact us immediately, and we will help you understand the notice and determine the best course of action.'
    },
    {
      id: 'panel6',
      question: 'What is the difference between a deduction and a credit?',
      answer: 'A tax deduction lowers your taxable income, which in turn lowers the amount of tax you owe. A tax credit reduces your tax bill dollar-for-dollar. Credits are generally more valuable than deductions.'
    }
  ];

  return (
    <>
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        image={seo.ogImage}
        structuredData={seo.structuredData}
      />
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'rgba(248, 250, 252, 0.95)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
          zIndex: -1
        },
        pt: { xs: 10, md: 12 },
        pb: 8
      }}>
        <Container maxWidth="md">
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 3, md: 6 }, 
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
            }}
          >
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 800,
                  position: 'relative',
                  display: 'inline-block',
                  '&:after': {
                    content: '""',
                    display: 'block',
                    width: '60px',
                    height: '4px',
                    backgroundColor: 'secondary.main',
                    margin: '8px auto 0',
                    borderRadius: '2px'
                  }
                }}
              >
                Frequently Asked Questions
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 2, maxWidth: '600px', mx: 'auto' }}>
                Find answers to common questions about our services, tax preparation, and more.
              </Typography>
            </Box>

            <Box>
              {faqData.map((faq) => (
                <FAQItem 
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  expanded={expanded}
                  handleChange={handleChange}
                  panelId={faq.id}
                />
              ))}
            </Box>

            <Box sx={{ mt: 6, textAlign: 'center', p: 4, bgcolor: 'rgba(241, 245, 249, 0.5)', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Still have questions?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We're here to help. Contact our support team for further assistance.
              </Typography>
              {/* Note: In a real app, this would link to the contact page */}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default FAQs;
