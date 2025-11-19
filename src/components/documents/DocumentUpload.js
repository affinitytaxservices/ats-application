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
} from '@mui/material';
import {
  CloudUpload,
  Description,
  Delete,
  Download,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { clientAPI, documentAPI, apiUtils } from '../../services/api';

function DocumentUpload() {
  const [documents, setDocuments] = useState([]);

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
    const s = (status || '').toLowerCase();
    return (
      <Chip
        label={s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Unknown'}
        color={s === 'verified' ? 'success' : s === 'pending' ? 'warning' : 'default'}
        icon={s === 'verified' ? <CheckCircle /> : <Warning />}
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
                    <IconButton edge="end" aria-label="download" sx={{ mr: 1 }} onClick={() => handleDownload(doc.id, doc.name)}>
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
