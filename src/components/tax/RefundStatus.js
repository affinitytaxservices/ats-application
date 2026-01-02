import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Box, Button, TextField, Grid, Chip, Divider } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import SEOHelmet from '../common/SEOHelmet';
import { seoConfig } from '../../config/seo.config';

const stateRefundLinks = {
  federal: {
    name: "Federal (IRS)",
    url: "https://www.irs.gov/wheres-my-refund"
  },
  states: [
    { name: "Alabama", url: "https://www.myalabamataxes.alabama.gov" },
    { name: "Alaska", url: "No state income tax" },
    { name: "Arizona", url: "https://aztaxes.gov/Home/CheckRefund" },
    { name: "Arkansas", url: "https://atap.arkansas.gov/_/" },
    { name: "California", url: "https://www.ftb.ca.gov/refund/" },
    { name: "Colorado", url: "https://tax.colorado.gov/refund" },
    { name: "Connecticut", url: "https://portal.ct.gov/drs/individuals/individual-tax-page/status-of-refund" },
    { name: "Delaware", url: "https://revenue.delaware.gov/where-is-my-refund/" },
    { name: "Florida", url: "No state income tax" },
    { name: "Georgia", url: "https://dor.georgia.gov/refund" },
    { name: "Hawaii", url: "https://tax.hawaii.gov/refund" },
    { name: "Idaho", url: "https://tax.idaho.gov/refund" },
    { name: "Illinois", url: "https://tax.illinois.gov/individuals/refunds.html" },
    { name: "Indiana", url: "https://www.in.gov/dor/online-services/check-your-refund-status/" },
    { name: "Iowa", url: "https://tax.iowa.gov/wheres-my-refund" },
    { name: "Kansas", url: "https://www.kdor.ks.gov/Apps/RefundStatus" },
    { name: "Kentucky", url: "https://refund.ky.gov/" },
    { name: "Louisiana", url: "https://revenue.louisiana.gov/refund/" },
    { name: "Maine", url: "https://www.maine.gov/revenue/refundstatus" },
    { name: "Maryland", url: "https://interactive.marylandtaxes.gov/individuals/refund/" },
    { name: "Massachusetts", url: "https://www.mass.gov/how-to/check-the-status-of-your-ma-income-tax-refund" },
    { name: "Michigan", url: "https://www.michigan.gov/taxes/refund" },
    { name: "Minnesota", url: "https://www.revenue.state.mn.us/wheres-my-refund" },
    { name: "Mississippi", url: "https://tap.dor.ms.gov/_/" },
    { name: "Missouri", url: "https://dor.mo.gov/returnstatus/" },
    { name: "Montana", url: "https://revenue.mt.gov/WheresMyRefund" },
    { name: "Nebraska", url: "https://revenue.nebraska.gov/refund-status" },
    { name: "Nevada", url: "No state income tax" },
    { name: "New Hampshire", url: "Limited state income tax" },
    { name: "New Jersey", url: "https://www.nj.gov/treasury/taxation/checkrefundstatus.shtml" },
    { name: "New Mexico", url: "https://tap.state.nm.us/tap/_/" },
    { name: "New York", url: "https://www.tax.ny.gov/pit/refund/" },
    { name: "North Carolina", url: "https://eservices.dor.nc.gov/wheresmyrefund" },
    { name: "North Dakota", url: "https://apps.nd.gov/tax/tap/_/" },
    { name: "Ohio", url: "https://tax.ohio.gov/refund-status" },
    { name: "Oklahoma", url: "https://oktap.tax.ok.gov/_/" },
    { name: "Oregon", url: "https://revenueonline.dor.oregon.gov/tap/_/" },
    { name: "Pennsylvania", url: "https://mypath.pa.gov/_/" },
    { name: "Rhode Island", url: "https://tax.ri.gov/refund-status" },
    { name: "South Carolina", url: "https://dor.sc.gov/refund" },
    { name: "South Dakota", url: "No state income tax" },
    { name: "Tennessee", url: "Limited state income tax" },
    { name: "Texas", url: "No state income tax" },
    { name: "Utah", url: "https://tap.tax.utah.gov/taxexpress/_/" },
    { name: "Vermont", url: "https://myvtax.vermont.gov/_/" },
    { name: "Virginia", url: "https://www.tax.virginia.gov/wheres-my-refund" },
    { name: "Washington", url: "No state income tax" },
    { name: "West Virginia", url: "https://mytaxes.wvtax.gov/_/" },
    { name: "Wisconsin", url: "https://www.revenue.wi.gov/refund" },
    { name: "Wyoming", url: "No state income tax" }
  ]
};

const RefundStatus = () => {
  const [demoSsn, setDemoSsn] = useState('');
  const [demoAmount, setDemoAmount] = useState('');
  const [demoStatus, setDemoStatus] = useState(null);

  const handleDemoCheck = () => {
    // Simple mock logic for demonstration
    if (!demoSsn || !demoAmount) return;
    
    // Randomly select a status for demo purposes
    const statuses = ['approved', 'pending', 'rejected'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setDemoStatus(randomStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#059669'; // Emerald 600
      case 'pending': return '#B45309'; // Amber 700 - Darker for accessibility
      case 'rejected': return '#DC2626'; // Red 600
      default: return '#64748B';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon sx={{ fontSize: 40, color: '#059669' }} />;
      case 'pending': return <PendingIcon sx={{ fontSize: 40, color: '#B45309' }} />;
      case 'rejected': return <ErrorIcon sx={{ fontSize: 40, color: '#DC2626' }} />;
      default: return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Refund Approved';
      case 'pending': return 'Processing Pending';
      case 'rejected': return 'Refund Rejected';
      default: return '';
    }
  };

  return (
            <Box sx={{
              // Background handled globally
              minHeight: '100vh',
              paddingTop: 2,
              paddingBottom: 4
            }}>
      <SEOHelmet {...seoConfig.pages.refundStatus} />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" gutterBottom sx={{ 
          color: '#134E4A', // Teal 900
          position: 'relative',
          display: 'inline-block',
          paddingBottom: '10px',
          marginBottom: '30px',
          fontWeight: 'bold',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #0D9488 0%, #14B8A6 100%)' // Teal Gradient
          }
        }}>
          Tax Refund Center
        </Typography>

        {/* Demo Status Check Section */}
        <Box mb={8}>
          <Card elevation={0} sx={{
            background: '#FFFFFF',
            border: '1px solid #CCFBF1',
            borderRadius: 2,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#0F766E', fontWeight: 600 }}>
                Check Your Status
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Enter your details below to check the status of your refund (Demo).
              </Typography>
              
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField 
                    fullWidth 
                    label="Social Security Number" 
                    placeholder="XXX-XX-XXXX"
                    variant="outlined" 
                    size="small"
                    value={demoSsn}
                    onChange={(e) => setDemoSsn(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField 
                    fullWidth 
                    label="Refund Amount ($)" 
                    placeholder="e.g. 1500"
                    variant="outlined" 
                    size="small"
                    type="number"
                    value={demoAmount}
                    onChange={(e) => setDemoAmount(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<SearchIcon />}
                    onClick={handleDemoCheck}
                    sx={{
                      backgroundColor: '#0D9488',
                      height: '40px',
                      '&:hover': { backgroundColor: '#0F766E' }
                    }}
                  >
                    Check Status
                  </Button>
                </Grid>
              </Grid>

              {/* Status Display Area */}
              {demoStatus && (
                <Box mt={4} p={3} sx={{ 
                  background: '#F8FAFC', 
                  borderRadius: 2, 
                  border: `1px solid ${getStatusColor(demoStatus)}` 
                }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    {getStatusIcon(demoStatus)}
                    <Typography variant="h5" sx={{ ml: 2, color: getStatusColor(demoStatus), fontWeight: 'bold' }}>
                      {getStatusText(demoStatus)}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {demoStatus === 'approved' && "Your refund has been approved and is scheduled for deposit."}
                    {demoStatus === 'pending' && "Your return has been received and is currently being processed."}
                    {demoStatus === 'rejected' && "There was an issue with your return. Please contact support."}
                  </Typography>
                </Box>
              )}
              
              {/* Legend for Status Colors */}
              <Box mt={4} pt={2} borderTop="1px solid #E2E8F0">
                <Typography variant="caption" display="block" mb={1} color="text.secondary">
                  Status Indicators Key:
                </Typography>
                <Box display="flex" gap={1}>
                  <Chip label="Approved" sx={{ bgcolor: '#ECFDF5', color: '#065F46', border: '1px solid #059669' }} size="small" />
                  <Chip label="Pending" sx={{ bgcolor: '#FFFBEB', color: '#92400E', border: '1px solid #B45309' }} size="small" />
                  <Chip label="Rejected" sx={{ bgcolor: '#FEF2F2', color: '#991B1B', border: '1px solid #DC2626' }} size="small" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        
        <Divider sx={{ mb: 6 }} />

        {/* Federal Links Section */}
        <Typography variant="h5" gutterBottom sx={{ 
          color: '#134E4A',
          fontWeight: 600,
          mb: 3
        }}>
          Official Refund Portals
        </Typography>

        <Box mb={6}>
          <Card elevation={0} sx={{
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            background: '#FFFFFF',
            border: '1px solid #99F6E4', // Teal 200
            borderRadius: 2,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 15px -3px rgba(13, 148, 136, 0.1)',
              borderColor: '#5EEAD4', // Teal 300
            }
          }}>
            <CardContent sx={{ textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#0F172A', fontWeight: 600 }}>
                  Federal (IRS)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Check your federal tax refund status directly with the IRS.
                </Typography>
              </Box>
              <Button
                variant="contained"
                endIcon={<LaunchIcon />}
                onClick={() => window.open(stateRefundLinks.federal.url, '_blank', 'noopener,noreferrer')}
                sx={{ 
                  backgroundColor: '#0D9488', // Teal 600
                  '&:hover': {
                    backgroundColor: '#0F766E' // Teal 700
                  }
                }}
              >
                Go to IRS.gov
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ 
          textAlign: 'left', 
          color: '#134E4A',
          mb: 3
        }}>
          State Refund Portals
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {stateRefundLinks.states.map((state) => (
            <Card key={state.name} sx={{ 
              minWidth: 275, 
              flex: '1 1 300px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 2,
              transition: 'all 0.2s ease',
              borderLeft: '4px solid #0D9488', // Teal border
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                borderLeft: '4px solid #0F766E'
              }
            }}>
              <CardContent sx={{ 
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}>
                <Box mb={2}>
                  <Typography variant="subtitle1" sx={{ color: '#1E293B', fontWeight: 600 }}>
                    {state.name}
                  </Typography>
                </Box>
                <Box>
                  {state.url === "No state income tax" || state.url === "Limited state income tax" ? (
                    <Typography variant="body2" sx={{ color: '#64748B', fontStyle: 'italic' }}>
                      {state.url}
                    </Typography>
                  ) : (
                    <Button
                      variant="text"
                      endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
                      onClick={() => window.open(state.url, '_blank', 'noopener,noreferrer')}
                      sx={{
                        color: '#0D9488',
                        padding: 0,
                        textTransform: 'none',
                        '&:hover': {
                          color: '#0F766E',
                          background: 'transparent',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Check Status
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default RefundStatus;
