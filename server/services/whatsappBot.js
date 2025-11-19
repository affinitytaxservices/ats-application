const whatsappClient = require('./whatsappClient');
const pool = require('../db');

// Conversation states
const CONVERSATION_STATES = {
  MENU: 'MENU',
  TAX_QUESTION: 'TAX_QUESTION',
  APPOINTMENT_DATE: 'APPOINTMENT_DATE',
  APPOINTMENT_TIME: 'APPOINTMENT_TIME',
  APPOINTMENT_CONFIRM: 'APPOINTMENT_CONFIRM',
  DOCUMENT_UPLOAD: 'DOCUMENT_UPLOAD',
  SUPPORT: 'SUPPORT'
};

// Bot menu options
const MAIN_MENU = {
  1: { text: 'Tax Questions & Advice', state: CONVERSATION_STATES.TAX_QUESTION },
  2: { text: 'Book Appointment', state: CONVERSATION_STATES.APPOINTMENT_DATE },
  3: { text: 'Upload Documents', state: CONVERSATION_STATES.DOCUMENT_UPLOAD },
  4: { text: 'Check Tax Refund Status', action: 'check_refund' },
  5: { text: 'Contact Support', state: CONVERSATION_STATES.SUPPORT }
};

class WhatsAppBot {
  constructor() {
    this.activeConversations = new Map(); // In-memory storage for now
  }

  async handleIncomingMessage(from, message) {
    try {
      // Get or create user conversation
      let conversation = await this.getOrCreateConversation(from);
      
      // Handle different message types
      if (message.type === 'text') {
        return await this.handleTextMessage(from, message.text.body, conversation);
      } else if (message.type === 'interactive') {
        return await this.handleInteractiveMessage(from, message.interactive, conversation);
      } else if (message.type === 'document' || message.type === 'image') {
        return await this.handleDocumentMessage(from, message, conversation);
      } else {
        return await this.handleUnknownMessage(from, conversation);
      }
    } catch (error) {
      console.error('Error handling WhatsApp message:', error);
      await whatsappClient.sendTextMessage(from, 'Sorry, I encountered an error. Please try again or contact support.');
    }
  }

  async getOrCreateConversation(from) {
    // Check in-memory storage first
    if (this.activeConversations.has(from)) {
      return this.activeConversations.get(from);
    }

    // Check database for existing conversation
    try {
      const [rows] = await pool.query(
        'SELECT * FROM whatsapp_conversations WHERE phone_number = ? ORDER BY updated_at DESC LIMIT 1',
        [from]
      );

      if (rows.length > 0) {
        const conversation = {
          phoneNumber: from,
          state: rows[0].state,
          data: JSON.parse(rows[0].data || '{}'),
          createdAt: rows[0].created_at,
          updatedAt: rows[0].updated_at
        };
        this.activeConversations.set(from, conversation);
        return conversation;
      }
    } catch (error) {
      console.error('Error fetching conversation from database:', error);
    }

    // Create new conversation
    const newConversation = {
      phoneNumber: from,
      state: CONVERSATION_STATES.MENU,
      data: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.activeConversations.set(from, newConversation);
    return newConversation;
  }

  async saveConversation(conversation) {
    conversation.updatedAt = new Date();
    this.activeConversations.set(conversation.phoneNumber, conversation);

    // Save to database
    try {
      await pool.query(
        `INSERT INTO whatsapp_conversations (phone_number, state, data, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE state = ?, data = ?, updated_at = ?`,
        [
          conversation.phoneNumber,
          conversation.state,
          JSON.stringify(conversation.data),
          conversation.createdAt,
          conversation.updatedAt,
          conversation.state,
          JSON.stringify(conversation.data),
          conversation.updatedAt
        ]
      );
    } catch (error) {
      console.error('Error saving conversation to database:', error);
    }
  }

  async handleTextMessage(from, text, conversation) {
    const message = text.trim().toLowerCase();

    // Handle special commands
    if (message === 'hi' || message === 'hello' || message === 'menu') {
      return await this.showMainMenu(from, conversation);
    }

    if (message === 'stop' || message === 'exit') {
      return await this.endConversation(from, conversation);
    }

    // Handle based on current state
    switch (conversation.state) {
      case CONVERSATION_STATES.MENU:
        return await this.handleMenuChoice(from, message, conversation);
      case CONVERSATION_STATES.TAX_QUESTION:
        return await this.handleTaxQuestion(from, message, conversation);
      case CONVERSATION_STATES.APPOINTMENT_DATE:
        return await this.handleAppointmentDate(from, message, conversation);
      case CONVERSATION_STATES.APPOINTMENT_TIME:
        return await this.handleAppointmentTime(from, message, conversation);
      case CONVERSATION_STATES.APPOINTMENT_CONFIRM:
        return await this.handleAppointmentConfirm(from, message, conversation);
      case CONVERSATION_STATES.SUPPORT:
        return await this.handleSupportMessage(from, message, conversation);
      default:
        return await this.showMainMenu(from, conversation);
    }
  }

  async handleInteractiveMessage(from, interactive, conversation) {
    const { type } = interactive;

    if (type === 'list_reply') {
      const selectedId = interactive.list_reply.id;
      return await this.handleMenuChoice(from, selectedId, conversation);
    } else if (type === 'button_reply') {
      const buttonId = interactive.button_reply.id;
      return await this.handleButtonReply(from, buttonId, conversation);
    }
  }

  async handleDocumentMessage(from, message, conversation) {
    if (conversation.state === CONVERSATION_STATES.DOCUMENT_UPLOAD) {
      return await this.handleDocumentUpload(from, message, conversation);
    } else {
      await whatsappClient.sendTextMessage(from, 
        'Please select "Upload Documents" from the menu first, or send "menu" to see options.');
    }
  }

  async handleUnknownMessage(from, conversation) {
    await whatsappClient.sendTextMessage(from, 
      'I can only process text messages, documents, and images. Please send "menu" to see available options.');
  }

  async showMainMenu(from, conversation) {
    conversation.state = CONVERSATION_STATES.MENU;
    conversation.data = {};
    await this.saveConversation(conversation);

    const menuText = `🏢 Welcome to Tax Services Bot!\n\nPlease select an option:\n\n1️⃣ Tax Questions & Advice\n2️⃣ Book Appointment\n3️⃣ Upload Documents\n4️⃣ Check Tax Refund Status\n5️⃣ Contact Support\n\nReply with the number (1-5) or send "menu" anytime to see this again.`;

    await whatsappClient.sendInteractiveList(from, {
      body: menuText,
      button: 'Choose Service',
      sections: [{
        title: 'Tax Services',
        rows: [
          { id: '1', title: 'Tax Questions & Advice', description: 'Get answers to your tax questions' },
          { id: '2', title: 'Book Appointment', description: 'Schedule a consultation' },
          { id: '3', title: 'Upload Documents', description: 'Send your tax documents' },
          { id: '4', title: 'Check Refund Status', description: 'Track your tax refund' },
          { id: '5', title: 'Contact Support', description: 'Get help from our team' }
        ]
      }]
    });
  }

  async handleMenuChoice(from, choice, conversation) {
    const menuItem = MAIN_MENU[choice];
    
    if (!menuItem) {
      await whatsappClient.sendTextMessage(from, 'Invalid choice. Please reply with a number from 1-5.');
      return;
    }

    if (menuItem.action === 'check_refund') {
      return await this.handleRefundCheck(from, conversation);
    } else if (menuItem.state) {
      conversation.state = menuItem.state;
      await this.saveConversation(conversation);

      switch (menuItem.state) {
        case CONVERSATION_STATES.TAX_QUESTION:
          await whatsappClient.sendTextMessage(from, 
            '📋 Great! Please ask your tax question. Our AI assistant will help you, and a tax professional will review if needed.');
          break;
        case CONVERSATION_STATES.APPOINTMENT_DATE:
          await this.requestAppointmentDate(from, conversation);
          break;
        case CONVERSATION_STATES.DOCUMENT_UPLOAD:
          await this.handleDocumentUploadRequest(from, conversation);
          break;
        case CONVERSATION_STATES.SUPPORT:
          await whatsappClient.sendTextMessage(from, 
            '👥 Our support team is here to help! Please describe your issue or question.');
          break;
      }
    }
  }

  async handleTaxQuestion(from, question, conversation) {
    // Store the question
    conversation.data.taxQuestion = question;
    await this.saveConversation(conversation);

    // Generate AI response (simplified for now)
    const aiResponse = await this.generateTaxResponse(question);
    
    await whatsappClient.sendTextMessage(from, `🤖 ${aiResponse}\n\nWould you like to:\n1️⃣ Ask another tax question\n2️⃣ Speak with a tax professional\n3️⃣ Return to main menu\n\nReply with 1, 2, or 3.`);
    
    conversation.state = 'TAX_RESPONSE';
    await this.saveConversation(conversation);
  }

  async generateTaxResponse(question) {
    // Simplified AI response - in production, integrate with actual AI service
    const responses = [
      "Based on general tax guidelines, this depends on your specific situation. For personalized advice, I recommend consulting with one of our tax professionals.",
      "This is a common question. The tax implications can vary based on your income bracket and filing status. Would you like to schedule a consultation?",
      "Great question! Tax regulations can be complex. Let me connect you with a tax professional for detailed guidance."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async requestAppointmentDate(from, conversation) {
    await whatsappClient.sendTextMessage(from, 
      '📅 Please provide your preferred date for the appointment (format: YYYY-MM-DD, e.g., 2024-01-15):');
  }

  async handleAppointmentDate(from, date, conversation) {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      await whatsappClient.sendTextMessage(from, 'Please use the format YYYY-MM-DD (e.g., 2024-01-15)');
      return;
    }

    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
      await whatsappClient.sendTextMessage(from, 'Please select a future date.');
      return;
    }

    conversation.data.appointmentDate = date;
    conversation.state = CONVERSATION_STATES.APPOINTMENT_TIME;
    await this.saveConversation(conversation);

    await whatsappClient.sendTextMessage(from, 
      '⏰ What time would you prefer? Please provide in 24-hour format (e.g., 14:30 for 2:30 PM):');
  }

  async handleAppointmentTime(from, time, conversation) {
    // Validate time format
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      await whatsappClient.sendTextMessage(from, 'Please use 24-hour format (e.g., 14:30 for 2:30 PM)');
      return;
    }

    conversation.data.appointmentTime = time;
    conversation.state = CONVERSATION_STATES.APPOINTMENT_CONFIRM;
    await this.saveConversation(conversation);

    const appointmentDateTime = `${conversation.data.appointmentDate} at ${time}`;
    
    await whatsappClient.sendInteractiveButtons(from, {
      body: `📋 Appointment Summary:\nDate: ${appointmentDateTime}\n\nIs this correct?`,
      buttons: [
        { type: 'reply', reply: { id: 'confirm_yes', title: 'Yes, Confirm' } },
        { type: 'reply', reply: { id: 'confirm_no', title: 'No, Change' } }
      ]
    });
  }

  async handleAppointmentConfirm(from, confirm, conversation) {
    if (confirm === 'confirm_yes') {
      // Create appointment in database
      try {
        const [result] = await pool.query(
          'INSERT INTO appointments (phone_number, appointment_date, appointment_time, status, created_at) VALUES (?, ?, ?, ?, ?)',
          [
            conversation.phoneNumber,
            conversation.data.appointmentDate,
            conversation.data.appointmentTime,
            'scheduled',
            new Date()
          ]
        );

        await whatsappClient.sendTextMessage(from, 
          `✅ Appointment confirmed!\n\nDate: ${conversation.data.appointmentDate} at ${conversation.data.appointmentTime}\nAppointment ID: ${result.insertId}\n\nWe'll send you a reminder 24 hours before your appointment. Send "menu" to return to main menu.`);
        
        conversation.state = CONVERSATION_STATES.MENU;
        conversation.data = {};
        await this.saveConversation(conversation);
      } catch (error) {
        console.error('Error creating appointment:', error);
        await whatsappClient.sendTextMessage(from, 'Sorry, there was an error booking your appointment. Please try again or contact support.');
      }
    } else {
      // Start over
      conversation.state = CONVERSATION_STATES.APPOINTMENT_DATE;
      conversation.data = {};
      await this.saveConversation(conversation);
      await this.requestAppointmentDate(from, conversation);
    }
  }

  async handleDocumentUploadRequest(from, conversation) {
    await whatsappClient.sendTextMessage(from, 
      '📄 Please upload your tax documents (PDF, JPG, PNG). You can send multiple files.\n\nSend "done" when finished, or "menu" to return to main menu.');
    
    conversation.data.documents = [];
    conversation.state = CONVERSATION_STATES.DOCUMENT_UPLOAD;
    await this.saveConversation(conversation);
  }

  async handleDocumentUpload(from, message, conversation) {
    try {
      // Get file info
      const fileId = message.document?.id || message.image?.id;
      const fileName = message.document?.filename || `image_${Date.now()}.jpg`;
      const mimeType = message.document?.mime_type || message.image?.mime_type;

      if (!fileId) {
        await whatsappClient.sendTextMessage(from, 'Could not process the file. Please try again.');
        return;
      }

      // Store document info
      conversation.data.documents.push({
        fileId,
        fileName,
        mimeType,
        uploadedAt: new Date()
      });
      
      await this.saveConversation(conversation);

      await whatsappClient.sendTextMessage(from, 
        `✅ Received: ${fileName}\n\nSend more documents or type "done" when finished.`);
    } catch (error) {
      console.error('Error handling document upload:', error);
      await whatsappClient.sendTextMessage(from, 'Sorry, there was an error processing your document.');
    }
  }

  async handleRefundCheck(from, conversation) {
    // Check if user has any recent tax filings
    try {
      const [rows] = await pool.query(
        'SELECT * FROM tax_returns WHERE phone_number = ? ORDER BY created_at DESC LIMIT 1',
        [from]
      );

      if (rows.length > 0) {
        const taxReturn = rows[0];
        await whatsappClient.sendTextMessage(from, 
          `📊 Your Tax Refund Status:\n\nFiling Year: ${taxReturn.tax_year}\nStatus: ${taxReturn.refund_status}\nExpected Refund: $${taxReturn.expected_refund}\n\nSend "menu" to return to main menu.`);
      } else {
        await whatsappClient.sendTextMessage(from, 
          'We could not find any recent tax filings associated with your number. Please contact support for assistance.\n\nSend "menu" to return to main menu.');
      }
    } catch (error) {
      console.error('Error checking refund status:', error);
      await whatsappClient.sendTextMessage(from, 'Sorry, there was an error checking your refund status.');
    }
  }

  async handleSupportMessage(from, message, conversation) {
    // Store support ticket
    try {
      const [result] = await pool.query(
        'INSERT INTO support_tickets (phone_number, message, status, created_at) VALUES (?, ?, ?, ?)',
        [from, message, 'open', new Date()]
      );

      await whatsappClient.sendTextMessage(from, 
        `🎫 Support ticket created!\nTicket ID: ${result.insertId}\n\nOur support team will respond within 24 hours. Send "menu" to return to main menu.`);
      
      conversation.state = CONVERSATION_STATES.MENU;
      await this.saveConversation(conversation);
    } catch (error) {
      console.error('Error creating support ticket:', error);
      await whatsappClient.sendTextMessage(from, 'Sorry, there was an error creating your support ticket.');
    }
  }

  async handleButtonReply(from, buttonId, conversation) {
    // Handle button replies based on current state
    if (conversation.state === 'TAX_RESPONSE') {
      switch (buttonId) {
        case 'ask_another':
          conversation.state = CONVERSATION_STATES.TAX_QUESTION;
          await this.saveConversation(conversation);
          await whatsappClient.sendTextMessage(from, 'Please ask your next tax question:');
          break;
        case 'speak_professional':
          await this.handleSupportMessage(from, 'Request to speak with tax professional', conversation);
          break;
        case 'return_menu':
          await this.showMainMenu(from, conversation);
          break;
      }
    } else {
      await this.showMainMenu(from, conversation);
    }
  }

  async endConversation(from, conversation) {
    conversation.state = 'ENDED';
    conversation.data = {};
    await this.saveConversation(conversation);
    
    this.activeConversations.delete(from);
    
    await whatsappClient.sendTextMessage(from, 
      'Thank you for using Tax Services Bot! Send "hi" or "hello" anytime to start a new conversation.');
  }
}

module.exports = new WhatsAppBot();