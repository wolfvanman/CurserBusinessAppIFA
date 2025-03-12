import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

// Create a transporter
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  return transporter;
};

// Send email
export const sendEmail = async (options: EmailOptions) => {
  const { to, subject, html, from = process.env.EMAIL_FROM || 'Phil Handley <phil@arthurbrowns.co.uk>' } = options;

  const transporter = createTransporter();

  const mailOptions = {
    from,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

// Send welcome email to new user
export const sendWelcomeEmail = async (to: string, firstName: string, companyName: string) => {
  const subject = `Welcome to ${companyName}'s Financial Portal`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to ${companyName}'s Financial Portal</h2>
      <p>Hello ${firstName},</p>
      <p>Welcome to your company's financial portal. Here you can access financial education resources and videos tailored for your company.</p>
      <p>If you have any questions, please don't hesitate to contact me.</p>
      <p>Best regards,</p>
      <p>Phil Handley<br>phil@arthurbrowns.co.uk</p>
    </div>
  `;

  return sendEmail({ to, subject, html });
};

// Send retirement planning email
export const sendRetirementPlanningEmail = async (to: string, firstName: string, retirementAge: number) => {
  const subject = 'Your Retirement Planning Resources';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Retirement Planning Resources</h2>
      <p>Hello ${firstName},</p>
      <p>As you're approaching your retirement age of ${retirementAge}, we've prepared some resources to help you plan for this important life stage.</p>
      <p>Please log in to your portal to access retirement-specific videos and resources.</p>
      <p>If you have any questions, please don't hesitate to contact me.</p>
      <p>Best regards,</p>
      <p>Phil Handley<br>phil@arthurbrowns.co.uk</p>
    </div>
  `;

  return sendEmail({ to, subject, html });
};

// Send tax year reminder email
export const sendTaxYearReminderEmail = async (to: string | string[], firstName?: string) => {
  const subject = 'End of Tax Year Reminder';
  const personalGreeting = firstName ? `Hello ${firstName},` : 'Hello,';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>End of Tax Year Reminder</h2>
      <p>${personalGreeting}</p>
      <p>This is a friendly reminder that the end of the tax year is approaching. Now is a good time to consider topping up your ISA or making any other tax-efficient investments before the deadline.</p>
      <p>If you have any questions, please don't hesitate to contact me.</p>
      <p>Best regards,</p>
      <p>Phil Handley<br>phil@arthurbrowns.co.uk</p>
    </div>
  `;

  return sendEmail({ to, subject, html });
}; 