import React, { useState } from 'react';
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
} from '@mui/material';
import {
  CloudUpload,
  Description,
  Delete,
  Download,
  CheckCircle,
  Warning,
} from '@mui/icons-material';

function DocumentUpload() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'W-2 Form.pdf',
      type: 'W-2',
      status: 'verified',
      uploadDate: '2024-01-15',
    },
    {
      id: 2,
      name: '1099-INT.pdf',
      type: '1099',
      status: 'pending',
      uploadDate: '2024-01-20',
    },
    {
      id: 3,
      name: 'Deductions.pdf',
      type: 'Receipt',
      status: 'verified',
      uploadDate: '2024-01-25',
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setOpenDialog(true);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Mock upload - replace with actual API call
      const newDocument = {
        id: documents.length + 1,
        name: selectedFile.name,
        type: 'Unknown',
        status: 'pending',
        uploadDate: new Date().toISOString().split('T')[0],
      };

      setDocuments([...documents, newDocument]);
      setUploadStatus('success');
      setTimeout(() => {
        setOpenDialog(false);
        setSelectedFile(null);
        setUploadStatus('');
      }, 2000);
    }
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const getStatusChip = (status) => {
    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={status === 'verified' ? 'success' : 'warning'}
        icon={status === 'verified' ? <CheckCircle /> : <Warning />}
        size="small"
      />
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Document Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'primary.light',
              color: 'white',
            }}
          >
            <CloudUpload sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Upload Tax Documents
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{ bgcolor: 'white', color: 'primary.main' }}
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
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 0 }}>
            <List>
              {documents.map((doc) => (
                <ListItem key={doc.id} divider>
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.name}
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          {doc.type}
                        </Typography>
                        •
                        <Typography variant="body2" color="text.secondary">
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </Typography>
                        {getStatusChip(doc.status)}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="download" sx={{ mr: 1 }}>
                      <Download />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          {uploadStatus === 'success' ? (
            <Alert severity="success">Document uploaded successfully!</Alert>
          ) : (
            <Typography>
              Selected file: {selectedFile?.name}
              <br />
              Click Upload to confirm or cancel to select a different file.
            </Typography>
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

export default DocumentUpload;