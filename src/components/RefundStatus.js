import React from 'react';
import { Container, Typography, Card, CardContent, Box, Button } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

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
  return (
    <Box sx={{
      background: 'rgba(248, 250, 252, 1)', // Light background
      minHeight: '100vh',
      paddingTop: 2,
      paddingBottom: 4
    }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" gutterBottom sx={{ 
          color: '#1E293B', // Updated to text.primary color
          position: 'relative',
          display: 'inline-block',
          paddingBottom: '10px',
          marginBottom: '20px',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #1E3A8A 0%, #10B981 100%)' // Updated to primary and secondary colors
          }
        }}>
          Tax Refund Status Check
        </Typography>
        
        <Box mb={6}>
          <Card elevation={3} sx={{
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            background: 'rgba(16, 185, 129, 0.1)', // Updated background color
            border: '1px solid rgba(16, 185, 129, 0.2)', // Added border
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 20px rgba(16, 185, 129, 0.2)', // Updated shadow color
              background: 'rgba(16, 185, 129, 0.15)', // Slightly darker on hover
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '30%',
              height: '5px',
              background: 'linear-gradient(90deg, rgba(16, 185, 129, 0) 0%, #1E3A8A 100%)' // Updated gradient colors
            }
          }}>
            <CardContent sx={{ textAlign: 'left' }}>  {/* Changed alignment */}
              <Typography variant="h5" gutterBottom>
                Federal Refund Status
              </Typography>
              <Button
                variant="contained"
                endIcon={<LaunchIcon />}
                onClick={() => window.open(stateRefundLinks.federal.url, '_blank', 'noopener,noreferrer')}
                sx={{ 
                  justifyContent: 'flex-start',
                  backgroundColor: '#1E3A8A', // Updated to primary color
                  '&:hover': {
                    backgroundColor: '#142C6F' // Darker shade of primary
                  }
                }}  // Updated button color
              >
                Check IRS Refund Status
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ 
          textAlign: 'left', 
          color: '#1E293B', // Updated to text.primary color
          position: 'relative',
          display: 'inline-block',
          paddingBottom: '8px',
          marginBottom: '16px',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, #1E3A8A 0%, #10B981 100%)' // Updated to primary and secondary colors
          }
        }}>
          State Refund Status
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {stateRefundLinks.states.map((state) => (
            <Card key={state.name} sx={{ 
              minWidth: 275, 
              flex: '1 1 300px',
              background: 'rgba(16, 185, 129, 0.1)', // Updated to use secondary color with transparency
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(16, 185, 129, 0.2)', // Updated border color
              transition: 'all 0.3s ease',
              borderLeft: '4px solid #1E3A8A', // Updated to primary color
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(16, 185, 129, 0) 50%)', // Updated gradient colors
                zIndex: 0
              },
              '&:hover': {
                transform: 'translateY(-4px)',
                background: 'rgba(16, 185, 129, 0.15)', // Slightly darker on hover
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15)', // Updated shadow color
                borderLeft: '4px solid #10B981' // Updated to secondary color
              }
            }}>
              <CardContent sx={{ 
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                position: 'relative',
                zIndex: 1
              }}>
                <div>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1E293B' }}>
                    {state.name}
                  </Typography>
                </div>
                <div>
                  {state.url === "No state income tax" || state.url === "Limited state income tax" ? (
                    <Typography sx={{ color: 'rgba(16, 185, 129, 0.8)' }}>
                      {state.url}
                    </Typography>
                  ) : (
                    <Button
                      variant="outlined"
                      endIcon={<LaunchIcon />}
                      onClick={() => window.open(state.url, '_blank', 'noopener,noreferrer')}
                      sx={{
                        borderColor: '#10B981', // Updated to secondary color
                        color: '#1E293B',
                        alignSelf: 'flex-start',
                        marginTop: 'auto',
                        '&:hover': {
                          background: 'rgba(16, 185, 129, 0.1)', // Updated hover background
                          borderColor: '#1E3A8A' // Primary color on hover
                        }
                      }}
                    >
                      Check Status
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default RefundStatus;