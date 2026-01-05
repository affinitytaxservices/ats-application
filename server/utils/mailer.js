const nodemailer = require('nodemailer');

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = (process.env.SMTP_SECURE || 'false') === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
    tls: { rejectUnauthorized: (process.env.SMTP_REJECT_UNAUTH || 'true') === 'true' }
  });

  return transporter;
}

async function sendOtpEmail(to, code) {
  const from = process.env.SMTP_FROM || 'no-reply@affinitytaxservices.com';
  const subject = 'Your Affinity Tax Services verification code';
  const text = `Your verification code is ${code}. It expires in 15 minutes.`;
  const html = `
    <div style="font-family:Arial,sans-serif;">
      <h2>Verify your email</h2>
      <p>Your verification code is:</p>
      <div style="font-size:24px;font-weight:bold;letter-spacing:6px;">${code}</div>
      <p>This code expires in 15 minutes. If you did not attempt to sign up, please ignore this email.</p>
    </div>
  `;

  const t = getTransporter();
  try {
    const info = await t.sendMail({ from, to, subject, text, html });
    return { success: true, messageId: info.messageId };
  } catch (err) {
    return { success: false, error: 'EMAIL_SEND_FAILED', detail: err.message };
  }
}

module.exports = { sendOtpEmail };
// Send Contact Email notification
async function sendContactEmail({ firstName, lastName, email, phone, subject, message }) {
  const from = process.env.SMTP_FROM || 'no-reply@affinitytaxservices.com';
  const to = process.env.CONTACT_NOTIFY_EMAIL || process.env.SMTP_FROM || 'no-reply@affinitytaxservices.com';
  const mailSubject = `[Contact] ${subject || 'New message'} from ${firstName} ${lastName}`;
  const text = `New contact submission\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || '-'}\nSubject: ${subject}\n\nMessage:\n${message}`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;">
      <h2 style="margin:0 0 8px 0;">New Contact Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || '-'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p style="white-space:pre-line;"><strong>Message:</strong>\n${message}</p>
    </div>
  `;

  const t = getTransporter();
  const info = await t.sendMail({ from, to, subject: mailSubject, text, html });
  return { success: true, messageId: info.messageId };
}

module.exports.sendContactEmail = sendContactEmail;
