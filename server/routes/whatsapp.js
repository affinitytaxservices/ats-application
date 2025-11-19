const express = require('express');
const crypto = require('crypto');
const pool = require('../db');
const { handleIncomingMessage } = require('../services/whatsappBot');

const router = express.Router();

// Meta webhook verification
router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'affinity_whatsapp_token';

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ WhatsApp webhook verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// Incoming message handler
router.post('/webhook', async (req, res) => {
  try {
    const body = req.body;

    // Validate signature
    const signature = req.headers['x-hub-signature-256'];
    const expected = 'sha256=' + crypto
      .createHmac('sha256', process.env.WHATSAPP_APP_SECRET || '')
      .update(JSON.stringify(body))
      .digest('hex');

    if (signature !== expected) {
      console.warn('⚠️ Invalid webhook signature');
      return res.sendStatus(401);
    }

    // Process each entry
    if (body.object === 'whatsapp_business_account' && body.entry) {
      for (const entry of body.entry) {
        for (const change of entry.changes || []) {
          if (change.field === 'messages' && change.value?.messages) {
            for (const message of change.value.messages) {
              // Skip if message is from our business account
              if (message.from === process.env.WHATSAPP_PHONE_NUMBER_ID) continue;
              
              const from = message.from;
              await handleIncomingMessage(from, message);
            }
          }
        }
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('❌ WhatsApp webhook error:', err);
    res.sendStatus(500);
  }
});

// Admin endpoint to send template message
router.post('/send-template', async (req, res) => {
  const { to, template, language = 'en_US', components = [] } = req.body;
  if (!to || !template) return res.status(400).json({ error: 'Missing to or template' });

  try {
    const { sendTemplateMessage } = require('../services/whatsappClient');
    const msgId = await sendTemplateMessage(to, template, language, components);
    res.json({ success: true, messageId: msgId });
  } catch (err) {
    console.error('❌ Send template error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Admin endpoint to send text message
router.post('/send-text', async (req, res) => {
  const { to, text } = req.body;
  if (!to || !text) return res.status(400).json({ error: 'Missing to or text' });

  try {
    const { sendTextMessage } = require('../services/whatsappClient');
    const msgId = await sendTextMessage(to, text);
    res.json({ success: true, messageId: msgId });
  } catch (err) {
    console.error('❌ Send text error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get chat history for a user
router.get('/chats/:phone', async (req, res) => {
  const phone = req.params.phone.replace(/\D/g, '');
  try {
    const [rows] = await pool.query(
      `SELECT * FROM whatsapp_messages 
       WHERE phone = ? 
       ORDER BY created_at ASC`,
      [phone]
    );
    res.json({ data: rows });
  } catch (err) {
    console.error('❌ Fetch chat error:', err);
    res.status(500).json({ error: 'Failed to fetch chat' });
  }
});

module.exports = router;