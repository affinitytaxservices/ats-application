import React, { useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Add, Delete, Print } from '@mui/icons-material';

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD'
});

const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const emptyItem = () => ({
  description: '',
  quantity: 1,
  unitPrice: 0
});

function InvoiceBuilder() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = useRef(null);

  const [logoSrc, setLogoSrc] = useState('/logo-horizontal.svg');
  const [logoMode, setLogoMode] = useState('preset');
  const [logoUploadError, setLogoUploadError] = useState('');

  const createInvoiceNumber = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    const uuid = typeof window !== 'undefined' ? window.crypto?.randomUUID?.() : undefined;
    const uniquePart = uuid
      ? uuid.replace(/-/g, '').slice(0, 12).toUpperCase()
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`.toUpperCase();

    return `INV-${yyyy}${mm}${dd}-${uniquePart}`;
  };

  const [company, setCompany] = useState({
    name: 'Affinity Tax Services',
    addressLine1: '',
    addressLine2: '',
    phone: '',
    email: '',
    website: 'https://www.affinitytaxservices.com'
  });

  const [client, setClient] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    email: ''
  });

  const [invoiceMeta, setInvoiceMeta] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return {
      invoiceNumber: createInvoiceNumber(today),
      invoiceDate: `${yyyy}-${mm}-${dd}`,
      dueDate: `${yyyy}-${mm}-${dd}`,
      currency: 'USD',
      taxRatePercent: 0,
      notes: 'Thank you for your business.',
      paymentInstructions: ''
    };
  });

  const [items, setItems] = useState([emptyItem()]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const qty = toNumber(item.quantity);
      const price = toNumber(item.unitPrice);
      return sum + qty * price;
    }, 0);
    const tax = subtotal * (toNumber(invoiceMeta.taxRatePercent) / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [items, invoiceMeta.taxRatePercent]);

  const formatMoney = (amount) => {
    if (invoiceMeta.currency !== 'USD') return amount.toFixed(2);
    return currencyFormatter.format(amount);
  };

  const handleLogoPreset = (value) => {
    setLogoMode('preset');
    setLogoSrc(value);
    setLogoUploadError('');
  };

  const handleLogoUpload = async (file) => {
    if (!file) return;
    setLogoUploadError('');
    try {
      const reader = new FileReader();
      const result = await new Promise((resolve, reject) => {
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.onabort = () => reject(new Error('File read aborted'));
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      if (typeof result !== 'string') {
        throw new Error('Unexpected FileReader result type');
      }

      setLogoMode('uploaded');
      setLogoSrc(result);
    } catch (err) {
      console.error('Logo upload failed:', err);
      setLogoUploadError('Failed to process logo file. Please try a different image.');
    }
  };

  const updateItem = (index, patch) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  };

  const removeItem = (index) => {
    setItems((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const addItem = () => {
    setItems((prev) => [...prev, emptyItem()]);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Box
        component="style"
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              header, footer, .no-print { display: none !important; }
              main { padding: 0 !important; }
              body { background: white !important; }
              #invoice-paper { box-shadow: none !important; border: 1px solid #e5e7eb !important; }
            }
          `
        }}
      />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }} className="no-print" sx={{ mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Invoice
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in the details, then print or save as PDF.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
          <Button variant="contained" startIcon={<Print />} onClick={() => window.print()}>
            Print / Save PDF
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5} className={isMobile ? undefined : 'no-print'}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              Invoice Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Logo"
                  value={logoMode === 'preset' ? logoSrc : 'uploaded'}
                  onChange={(e) => {
                    if (e.target.value === 'uploaded') {
                      fileInputRef.current?.click();
                      return;
                    }
                    handleLogoPreset(e.target.value);
                  }}
                >
                  <MenuItem value="/logo-horizontal.svg">Logo (horizontal)</MenuItem>
                  <MenuItem value="/logo.svg">Logo</MenuItem>
                  <MenuItem value="/logo-square.svg">Logo (square)</MenuItem>
                  <MenuItem value="/logo-icon-only.svg">Logo (icon)</MenuItem>
                  <MenuItem value="uploaded">Upload logo…</MenuItem>
                </TextField>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    handleLogoUpload(file);
                    e.target.value = '';
                  }}
                />
                {logoUploadError ? (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                    {logoUploadError}
                  </Typography>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Invoice #"
                  value={invoiceMeta.invoiceNumber}
                  onChange={(e) => setInvoiceMeta((p) => ({ ...p, invoiceNumber: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Invoice date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={invoiceMeta.invoiceDate}
                  onChange={(e) => setInvoiceMeta((p) => ({ ...p, invoiceDate: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Due date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={invoiceMeta.dueDate}
                  onChange={(e) => setInvoiceMeta((p) => ({ ...p, dueDate: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tax rate (%)"
                  type="number"
                  inputProps={{ min: 0, step: 0.01 }}
                  value={invoiceMeta.taxRatePercent}
                  onChange={(e) => setInvoiceMeta((p) => ({ ...p, taxRatePercent: e.target.value }))}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  From
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company name"
                  value={company.name}
                  onChange={(e) => setCompany((p) => ({ ...p, name: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address line 1"
                  value={company.addressLine1}
                  onChange={(e) => setCompany((p) => ({ ...p, addressLine1: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address line 2"
                  value={company.addressLine2}
                  onChange={(e) => setCompany((p) => ({ ...p, addressLine2: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={company.phone}
                  onChange={(e) => setCompany((p) => ({ ...p, phone: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={company.email}
                  onChange={(e) => setCompany((p) => ({ ...p, email: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website"
                  value={company.website}
                  onChange={(e) => setCompany((p) => ({ ...p, website: e.target.value }))}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  Bill To
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Client name"
                  value={client.name}
                  onChange={(e) => setClient((p) => ({ ...p, name: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address line 1"
                  value={client.addressLine1}
                  onChange={(e) => setClient((p) => ({ ...p, addressLine1: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address line 2"
                  value={client.addressLine2}
                  onChange={(e) => setClient((p) => ({ ...p, addressLine2: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Client email"
                  value={client.email}
                  onChange={(e) => setClient((p) => ({ ...p, email: e.target.value }))}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  Line Items
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  {items.map((item, idx) => (
                    <Paper key={idx} variant="outlined" sx={{ p: 1.5 }}>
                      <Grid container spacing={1.5} alignItems="center">
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Description"
                            value={item.description}
                            onChange={(e) => updateItem(idx, { description: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="Qty"
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            value={item.quantity}
                            onChange={(e) => updateItem(idx, { quantity: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="Unit price"
                            type="number"
                            inputProps={{ min: 0, step: 0.01 }}
                            value={item.unitPrice}
                            onChange={(e) => updateItem(idx, { unitPrice: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">
                              Line total: {formatMoney(toNumber(item.quantity) * toNumber(item.unitPrice))}
                            </Typography>
                            <IconButton
                              aria-label="Remove line item"
                              size="small"
                              onClick={() => removeItem(idx)}
                              disabled={items.length <= 1}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                  <Button variant="outlined" startIcon={<Add />} onClick={addItem}>
                    Add item
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  minRows={2}
                  value={invoiceMeta.notes}
                  onChange={(e) => setInvoiceMeta((p) => ({ ...p, notes: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Payment instructions"
                  multiline
                  minRows={2}
                  value={invoiceMeta.paymentInstructions}
                  onChange={(e) => setInvoiceMeta((p) => ({ ...p, paymentInstructions: e.target.value }))}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper id="invoice-paper" sx={{ p: { xs: 2, md: 3 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  component="img"
                  src={logoSrc}
                  alt={`${company.name} logo`}
                  sx={{
                    height: 48,
                    width: 'auto',
                    maxWidth: 220,
                    objectFit: 'contain'
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.2 }}>
                    {company.name || 'Company name'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {[
                      company.addressLine1,
                      company.addressLine2,
                      company.phone,
                      company.email,
                      company.website
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  Invoice
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Invoice #: {invoiceMeta.invoiceNumber || '—'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Invoice date: {invoiceMeta.invoiceDate || '—'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Due date: {invoiceMeta.dueDate || '—'}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2.5 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Bill To
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  {client.name || 'Client name'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {[client.addressLine1, client.addressLine2, client.email].filter(Boolean).join(' · ') || '—'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Summary
                </Typography>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Subtotal
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {formatMoney(totals.subtotal)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Tax ({toNumber(invoiceMeta.taxRatePercent).toFixed(2)}%)
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {formatMoney(totals.tax)}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1" sx={{ fontWeight: 900 }}>
                      Total
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 900 }}>
                      {formatMoney(totals.total)}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800 }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 800, width: 90 }} align="right">
                      Qty
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800, width: 140 }} align="right">
                      Unit price
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800, width: 140 }} align="right">
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((it, idx) => {
                    const lineTotal = toNumber(it.quantity) * toNumber(it.unitPrice);
                    return (
                      <TableRow key={idx}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {it.description || '—'}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">{toNumber(it.quantity)}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">{formatMoney(toNumber(it.unitPrice))}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 800 }}>
                            {formatMoney(lineTotal)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  Notes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {invoiceMeta.notes || '—'}
                </Typography>
              </Box>
              {invoiceMeta.paymentInstructions ? (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    Payment instructions
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                    {invoiceMeta.paymentInstructions}
                  </Typography>
                </Box>
              ) : null}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InvoiceBuilder;
