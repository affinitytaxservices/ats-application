import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tabs,
  Tab,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  CloudUpload,
  Description,
  Delete,
  Download,
  CheckCircle,
  Warning,
  Add,
  Visibility,
  Share,
} from '@mui/icons-material';
import { clientAPI, documentAPI, apiUtils } from '../../services/api';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`documents-tabpanel-${index}`}
      aria-labelledby={`documents-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Documents() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [tabValue, setTabValue] = useState(0);
  const [documents, setDocuments] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setOpenDialog(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('documentType', 'Other');
      formData.append('taxYear', new Date().getFullYear().toString());
      await documentAPI.uploadDocument(formData);
      setUploadStatus('success');
      const res = await clientAPI.getDocuments();
      setDocuments(res.data || []);
      setTimeout(() => {
        setOpenDialog(false);
        setSelectedFile(null);
        setUploadStatus('');
      }, 1500);
    } catch (e) {
      setUploadStatus('error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await documentAPI.deleteDocument(id);
      const res = await clientAPI.getDocuments();
      setDocuments(res.data || []);
    } catch (e) {}
  };

  const handleDownload = async (id, name) => {
    try {
      const blob = await documentAPI.downloadDocument(id);
      apiUtils.downloadFile(blob, name || 'document');
    } catch (e) {}
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      verified: { color: 'success', icon: <CheckCircle /> },
      pending: { color: 'warning', icon: <Warning /> },
      completed: { color: 'primary', icon: <CheckCircle /> },
    };

    const config = statusConfig[status] || { color: 'default', icon: null };

    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={config.color}
        icon={config.icon}
        size="small"
      />
    );
  };

  useEffect(() => {
    let mounted = true;
    clientAPI.getDocuments()
      .then((res) => {
        if (mounted) setDocuments(res.data || []);
      })
      .catch(() => {})
    return () => { mounted = false };
  }, []);

  const DocumentList = ({ documents, title }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <List>
          {documents.map((doc) => (
            <ListItem key={doc.id} divider>
              <ListItemIcon>
                <Description color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={doc.name}
                secondary={
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="body2" color="text.secondary">
                      {doc.type}
                    </Typography>
                    •
                    <Typography variant="body2" color="text.secondary">
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </Typography>
                    •
                    <Typography variant="body2" color="text.secondary">
                      {doc.size}
                    </Typography>
                    {getStatusChip(doc.status)}
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton edge="end" aria-label="view" size="small">
                    <Visibility />
                  </IconButton>
                  <IconButton edge="end" aria-label="download" size="small" onClick={() => handleDownload(doc.id, doc.name)}>
                    <Download />
                  </IconButton>
                  <IconButton edge="end" aria-label="share" size="small">
                    <Share />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={800}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
            Document Management
          </Typography>

          {/* Upload Section */}
          <Paper
            sx={{
              p: 4,
              mb: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 2,
            }}
          >
            <CloudUpload sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Upload Tax Documents
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', opacity: 0.9 }}>
              Supported formats: PDF, DOC, DOCX, PNG, JPG, JPEG (Max 10MB)
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<Add />}
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' }
              }}
            >
              Select File
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
              />
            </Button>
          </Paper>

          {/* Document Categories Tabs */}
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="All Documents" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <DocumentList documents={documents} title="All Documents" />
            </TabPanel>

            
          </Paper>

          {/* Document Statistics */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {documents.length}
                  </Typography>
                  <Typography variant="body1">Total Documents</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" gutterBottom>
                    {documents.filter(doc => (doc.status || '').toLowerCase() === 'verified').length}
                  </Typography>
                  <Typography variant="body1">Verified</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" gutterBottom>
                    {documents.filter(doc => (doc.status || '').toLowerCase() === 'pending').length}
                  </Typography>
                  <Typography variant="body1">Pending Review</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Fade>

      {/* Upload Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          {uploadStatus === 'success' ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Document uploaded successfully!
            </Alert>
          ) : (
            <Box>
              <Typography gutterBottom>
                Selected file: <strong>{selectedFile?.name}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Size: {selectedFile && `${Math.round(selectedFile.size / 1024)} KB`}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Click Upload to confirm or Cancel to select a different file.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={uploadStatus === 'success'}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Documents;