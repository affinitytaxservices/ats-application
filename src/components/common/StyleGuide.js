import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Chip,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Divider,
  Switch,
  Alert,
  IconButton,
  Tooltip,
  useTheme,
  Stack,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Slider,
  Tab,
  Tabs
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const ColorSwatch = ({ color, name, hex }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2
    }}
  >
    <Box
      sx={{
        width: '100%',
        height: 80,
        backgroundColor: color,
        borderRadius: 1,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    />
    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{name}</Typography>
    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
      {hex}
    </Typography>
  </Paper>
);

const StyleGuide = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom>
            Design System
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            A comprehensive guide to the visual language, components, and patterns used across the application.
          </Typography>
        </Box>

        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
          >
            <Tab label="Colors" />
            <Tab label="Typography" />
            <Tab label="Buttons & Actions" />
            <Tab label="Forms & Inputs" />
            <Tab label="Cards & Surfaces" />
            <Tab label="Feedback & Alerts" />
          </Tabs>
        </Paper>

        {/* Colors Section */}
        {tabValue === 0 && (
          <motion.div variants={itemVariants}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Color Palette</Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Primary (Royal Navy)</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.primary.light} name="Primary Light" hex={theme.palette.primary.light} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.primary.main} name="Primary Main" hex={theme.palette.primary.main} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.primary.dark} name="Primary Dark" hex={theme.palette.primary.dark} />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Secondary (Cool Slate)</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.secondary.light} name="Secondary Light" hex={theme.palette.secondary.light} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.secondary.main} name="Secondary Main" hex={theme.palette.secondary.main} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.secondary.dark} name="Secondary Dark" hex={theme.palette.secondary.dark} />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Status & Feedback</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.success.main} name="Success" hex={theme.palette.success.main} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.warning.main} name="Warning" hex={theme.palette.warning.main} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.error.main} name="Error" hex={theme.palette.error.main} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.info.main} name="Info" hex={theme.palette.info.main} />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Neutrals</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.text.primary} name="Text Primary" hex={theme.palette.text.primary} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.text.secondary} name="Text Secondary" hex={theme.palette.text.secondary} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.background.default} name="Background" hex={theme.palette.background.default} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <ColorSwatch color={theme.palette.divider} name="Divider" hex={theme.palette.divider} />
              </Grid>
            </Grid>
          </motion.div>
        )}

        {/* Typography Section */}
        {tabValue === 1 && (
          <motion.div variants={itemVariants}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Typography</Typography>
            <Paper sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h1" gutterBottom>Display H1 Heading</Typography>
                  <Typography variant="h2" gutterBottom>Display H2 Heading</Typography>
                  <Typography variant="h3" gutterBottom>Display H3 Heading</Typography>
                  <Typography variant="h4" gutterBottom>Display H4 Heading</Typography>
                  <Typography variant="h5" gutterBottom>Display H5 Heading</Typography>
                  <Typography variant="h6" gutterBottom>Display H6 Heading</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Subtitle 1 - Used for emphasis</Typography>
                  <Typography variant="subtitle2" gutterBottom>Subtitle 2 - Used for smaller emphasis</Typography>
                  <Typography variant="body1" paragraph>
                    Body 1 - The quick brown fox jumps over the lazy dog. This is the default body text used throughout the application. It is designed for maximum readability on all devices.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Body 2 - The quick brown fox jumps over the lazy dog. This is smaller body text, often used for secondary information or dense content areas.
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Caption - Used for timestamps, hints, and footnotes.
                  </Typography>
                  <Typography variant="overline" display="block" gutterBottom>
                    Overline - Used for kickers and uppercase labels.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        )}

        {/* Buttons Section */}
        {tabValue === 2 && (
          <motion.div variants={itemVariants}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Buttons & Actions</Typography>
            <Paper sx={{ p: 4, mb: 4 }}>
              <Stack spacing={4}>
                <Box>
                  <Typography variant="h6" gutterBottom>Variants</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <Button variant="contained">Primary</Button>
                    <Button variant="contained" color="secondary">Secondary</Button>
                    <Button variant="outlined">Outlined</Button>
                    <Button variant="text">Text</Button>
                    <Button variant="contained" disabled>Disabled</Button>
                  </Stack>
                </Box>
                
                <Box>
                  <Typography variant="h6" gutterBottom>Sizes</Typography>
                  <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    <Button variant="contained" size="small">Small</Button>
                    <Button variant="contained" size="medium">Medium</Button>
                    <Button variant="contained" size="large">Large</Button>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="h6" gutterBottom>With Icons</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <Button variant="contained" startIcon={<AddIcon />}>Create New</Button>
                    <Button variant="outlined" endIcon={<DeleteIcon />} color="error">Delete</Button>
                    <IconButton color="primary"><EditIcon /></IconButton>
                    <IconButton color="secondary"><ShareIcon /></IconButton>
                    <IconButton disabled><FavoriteIcon /></IconButton>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="h6" gutterBottom>Chips</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <Chip label="Default" />
                    <Chip label="Primary" color="primary" />
                    <Chip label="Secondary" color="secondary" />
                    <Chip label="Success" color="success" />
                    <Chip label="Error" color="error" />
                    <Chip label="Outlined" variant="outlined" />
                    <Chip label="Deletable" onDelete={() => {}} />
                    <Chip icon={<FavoriteIcon />} label="With Icon" color="primary" variant="outlined" />
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </motion.div>
        )}

        {/* Forms Section */}
        {tabValue === 3 && (
          <motion.div variants={itemVariants}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Forms & Inputs</Typography>
            <Paper sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>
                    <TextField label="Standard Input" fullWidth />
                    <TextField label="Filled Input" variant="filled" fullWidth />
                    <TextField label="Error State" error helperText="Incorrect entry" fullWidth />
                    <TextField label="With Placeholder" placeholder="Enter text here..." fullWidth />
                    <TextField label="Multiline" multiline rows={4} fullWidth />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Toggle Switch" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
                    <FormControlLabel control={<Checkbox />} label="Unchecked" />
                    <RadioGroup defaultValue="option1" row>
                      <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                      <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                    </RadioGroup>
                    <Box sx={{ pt: 2 }}>
                      <Typography gutterBottom>Slider</Typography>
                      <Slider defaultValue={30} />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        )}

        {/* Cards Section */}
        {tabValue === 4 && (
          <motion.div variants={itemVariants}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Cards & Surfaces</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader
                    avatar={
                      <Box sx={{ width: 40, height: 40, bgcolor: 'primary.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        A
                      </Box>
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title="Standard Card"
                    subheader="September 14, 2023"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This is a standard card component showcasing the shadow and border radius properties.
                      Perfect for displaying content blocks.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button size="small">Action</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4, textAlign: 'center' }}>
                  <Box sx={{ mb: 2, p: 2, bgcolor: 'primary.light', borderRadius: '50%', color: 'white' }}>
                    <FavoriteIcon fontSize="large" />
                  </Box>
                  <Typography variant="h5" gutterBottom>Feature Card</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Highlighted content with centered alignment and custom iconography.
                  </Typography>
                  <Button variant="outlined">Get Started</Button>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>Paper Surface</Typography>
                  <Typography paragraph>
                    Paper components can be used for general layout areas, sidebars, or content grouping.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2">
                    They blend seamlessly with the background while providing structure.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {/* Feedback Section */}
        {tabValue === 5 && (
          <motion.div variants={itemVariants}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Feedback & Alerts</Typography>
            <Stack spacing={2}>
              <Alert severity="success" onClose={() => {}}>
                This is a success alert — check it out!
              </Alert>
              <Alert severity="info" onClose={() => {}}>
                This is an info alert — check it out!
              </Alert>
              <Alert severity="warning" onClose={() => {}}>
                This is a warning alert — check it out!
              </Alert>
              <Alert severity="error" onClose={() => {}}>
                This is an error alert — check it out!
              </Alert>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>Tooltips</Typography>
                <Tooltip title="Add">
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </motion.div>
        )}

      </motion.div>
    </Container>
  );
};

export default StyleGuide;
