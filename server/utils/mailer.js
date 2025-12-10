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

