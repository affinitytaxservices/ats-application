const axios = require('axios');

const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_API_URL = `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_ID}/messages`;

/**
 * Send a text message via WhatsApp Business API
 * @param {string} to - recipient phone number in E164 format
 * @param {string} text - message text
 * @returns {Promise<string>} message id
 */
async function sendTextMessage(to, text) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    throw new Error('WhatsApp credentials not configured');
  }

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: to.replace(/\D/g, ''),
    type: 'text',
    text: { body: text }
  };

  try {
    const res = await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data.messages?.[0]?.id;
  } catch (err) {
    console.error('❌ WhatsApp send text error:', err.response?.data || err.message);
    throw new Error('Failed to send WhatsApp message');
  }
}

/**
 * Send a template message via WhatsApp Business API
 * @param {string} to - recipient phone number in E164 format
 * @param {string} template - template name
 * @param {string} language - language code (default en_US)
 * @param {Array} components - optional template components
 * @returns {Promise<string>} message id
 */
async function sendTemplateMessage(to, template, language = 'en_US', components = []) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    throw new Error('WhatsApp credentials not configured');
  }

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: to.replace(/\D/g, ''),
    type: 'template',
    template: {
      name: template,
      language: { code: language },
      components
    }
  };

  try {
    const res = await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data.messages?.[0]?.id;
  } catch (err) {
    console.error('❌ WhatsApp send template error:', err.response?.data || err.message);
    throw new Error('Failed to send WhatsApp template');
  }
}

/**
 * Send an interactive list message
 * @param {string} to - recipient phone number in E164 format
 * @param {string} header - list header
 * @param {string} body - list body text
 * @param {string} footer - list footer text
 * @param {Array} sections - list sections with rows
 * @param {string} buttonText - button text
 * @returns {Promise<string>} message id
 */
async function sendInteractiveList(to, header, body, footer, sections, buttonText = 'Choose an option') {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    throw new Error('WhatsApp credentials not configured');
  }

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: to.replace(/\D/g, ''),
    type: 'interactive',
    interactive: {
      type: 'list',
      header: { type: 'text', text: header },
      body: { text: body },
      footer: { text: footer },
      action: {
        button: buttonText,
        sections: sections.map(section => ({
          title: section.title,
          rows: section.rows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description || ''
          }))
        }))
      }
    }
  };

  try {
    const res = await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data.messages?.[0]?.id;
  } catch (err) {
    console.error('❌ WhatsApp send interactive list error:', err.response?.data || err.message);
    throw new Error('Failed to send WhatsApp interactive list');
  }
}

/**
 * Send an interactive reply button message
 * @param {string} to - recipient phone number in E164 format
 * @param {string} body - message body text
 * @param {string} footer - message footer text
 * @param {Array} buttons - array of button objects {id, title}
 * @returns {Promise<string>} message id
 */
async function sendInteractiveButtons(to, body, footer, buttons) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    throw new Error('WhatsApp credentials not configured');
  }

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: to.replace(/\D/g, ''),
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: body },
      footer: { text: footer },
      action: {
        buttons: buttons.map(btn => ({
          type: 'reply',
          reply: {
            id: btn.id,
            title: btn.title
          }
        }))
      }
    }
  };

  try {
    const res = await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data.messages?.[0]?.id;
  } catch (err) {
    console.error('❌ WhatsApp send interactive buttons error:', err.response?.data || err.message);
    throw new Error('Failed to send WhatsApp interactive buttons');
  }
}

/**
 * Mark a message as read
 * @param {string} messageId - message id to mark as read
 * @returns {Promise<void>}
 */
async function markMessageAsRead(messageId) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    throw new Error('WhatsApp credentials not configured');
  }

  const payload = {
    messaging_product: 'whatsapp',
    status: 'read',
    message_id: messageId
  };

  try {
    await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('❌ WhatsApp mark read error:', err.response?.data || err.message);
  }
}

module.exports = {
  sendTextMessage,
  sendTemplateMessage,
  sendInteractiveList,
  sendInteractiveButtons,
  markMessageAsRead
};