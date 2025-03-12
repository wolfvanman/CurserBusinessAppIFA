# Financial Advisor Portal

A comprehensive web-based application for a financial advisor service, tailored for businesses and their employees. This application serves as a portal for companies to access financial education and support, managed by the administrator, Phil Handley (phil@arthurbrowns.co.uk).

## Features

### For Administrators

- **Company Management**: Create and manage business profiles for client companies.
- **User Management**: Invite and manage employees for each company.
- **Video Content Management**: Upload and categorize financial education videos.
  - Company-specific videos (e.g., pension scheme, group income protection)
  - General financial education videos (applicable to all companies)
- **Blog Publishing**: Write and publish blog posts accessible to all users.
- **Email Communication**: Send targeted emails to employees.
  - Schedule emails for specific events or times
  - Send to individual users, specific businesses, or all users
- **Contact Management**: View and respond to inquiries from users.

### For Employees

- **Personalized Dashboard**: Access a company-branded portal with tailored content.
- **Video Library**: View financial education videos relevant to their company and personal situation.
- **Retirement Planning**: Access retirement-specific content based on age and preferences.
- **Blog Access**: Read financial education articles and insights.
- **Profile Management**: Update personal information and retirement preferences.

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Email**: Nodemailer
- **File Storage**: AWS S3
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB database
- AWS S3 bucket (for file uploads)
- SMTP server (for sending emails)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET_NAME=your_s3_bucket_name

# Email
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=your_smtp_port
EMAIL_SERVER_USER=your_smtp_username
EMAIL_SERVER_PASSWORD=your_smtp_password
EMAIL_FROM=Phil Handley <phil@arthurbrowns.co.uk>
```

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/financial-advisor-portal.git
   cd financial-advisor-portal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This application can be deployed to Vercel with minimal configuration:

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Configure the environment variables in the Vercel dashboard.
4. Deploy the application.

## Project Structure

```
financial-advisor-portal/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (admin)/          # Admin routes
│   │   ├── (auth)/           # Authentication routes
│   │   ├── (company)/        # Company routes
│   │   ├── (employee)/       # Employee routes
│   │   ├── api/              # API routes
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   ├── lib/                  # Utility functions
│   │   ├── auth.ts           # Authentication utilities
│   │   ├── db.ts             # Database connection
│   │   ├── email.ts          # Email utilities
│   │   └── upload.ts         # File upload utilities
│   ├── models/               # MongoDB models
│   │   ├── Blog.ts           # Blog model
│   │   ├── Company.ts        # Company model
│   │   ├── Contact.ts        # Contact model
│   │   ├── Email.ts          # Email model
│   │   ├── User.ts           # User model
│   │   ├── Video.ts          # Video model
│   │   └── index.ts          # Model exports
│   ├── hooks/                # Custom React hooks
│   └── utils/                # Helper functions
├── public/                   # Static files
├── .env.local                # Environment variables
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

For any inquiries, please contact Phil Handley at phil@arthurbrowns.co.uk. 