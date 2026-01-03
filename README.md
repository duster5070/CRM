# CRM Project - Client & Project Management System

A comprehensive Customer Relationship Management (CRM) system built with Next.js 15, TypeScript, and MongoDB. This application provides a complete dashboard for managing clients, projects, payments, invoices, team members, and more.

## 🚀 Features

### Dashboard Overview
- **Analytics Dashboard**: Real-time overview of key metrics including total clients, projects, payments, and revenue
- **Recent Activity**: Quick access to recent projects and clients
- **Visual Insights**: Interactive cards displaying important business metrics

### Core Modules

#### 👥 Client Management
- Create, view, update, and delete client profiles
- Store comprehensive client information (name, email, phone, location, company details)
- Track client-specific projects and payments
- View client history and activity

#### 📊 Project Management
- Create and manage projects with detailed information
- Project properties include:
  - Name, slug, description, and notes
  - Thumbnail and banner images
  - Budget tracking and deadline management
  - Project status (ONGOING, COMPLETE)
  - Custom and free domain links
  - Start and end dates
- Associate projects with clients
- Manage project modules and tasks
- Track project progress with visual indicators

#### 📝 Module & Task Management
- Organize projects into modules
- Create and manage tasks within each module
- Task statuses: TODO, IN PROGRESS, COMPLETED
- Drag-and-drop task organization (using @dnd-kit)
- Assign tasks to team members
- Track task completion and progress

#### 💰 Payments & Invoicing
- Record and track all payments
- Payment details include:
  - Amount and tax
  - Payment method
  - Invoice number generation
  - Payment date tracking
- Link payments to specific projects and clients
- Generate payment reports

#### 📧 Email Management
- Built-in email composer
- Send emails directly from the dashboard
- Email templates using React Email
- Email integration for client communication

#### 📁 File Manager
- Upload and organize files in folders
- File management with UploadThing integration
- Store files associated with projects
- Track file metadata (name, type, size)
- Secure file storage and retrieval

#### 👨‍💼 Team Members
- Add and manage team members
- Assign members to specific projects
- Define member roles and responsibilities
- Track member contributions

#### 🎨 Portfolio Management
- Create and showcase portfolio items
- Display project work publicly
- Portfolio profile customization
- Social media integration (Twitter, LinkedIn, Instagram, GitHub, YouTube)

#### ⚙️ Brand Settings
- Customize company branding
- Update company logo and description
- Manage business profile information

#### 📬 Subscribers
- Manage email subscribers
- Track subscription dates
- Email list management for newsletters

#### 🔗 Guest Projects
- Share project links with external guests
- Allow guest access without full authentication
- Track guest project views

## 🛠 Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **TanStack Table**: Powerful table library for data display
- **React Hook Form**: Form state management and validation

### Backend & Database
- **MongoDB**: NoSQL database via Prisma ORM
- **Prisma**: Type-safe database ORM
- **NextAuth.js**: Authentication with GitHub and Google OAuth

### Additional Libraries
- **Tiptap**: Rich text editor
- **Recharts**: Data visualization and charts
- **UploadThing**: File upload handling
- **PostHog**: Product analytics
- **Zod**: Schema validation
- **date-fns/dayjs**: Date manipulation
- **React Hot Toast / Sonner**: Toast notifications

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm, yarn, or pnpm package manager
- MongoDB Atlas account (or local MongoDB instance)
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/duster5070/CRM.git
   cd "CRM Project Main"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add the following variables:

   ```env
   # Database
   DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"

   # NextAuth
   NEXTAUTH_SECRET="<generate-a-secure-random-string>"
   NEXTAUTH_URL="http://localhost:3000"

   # GitHub OAuth
   GITHUB_CLIENT_ID="<your-github-client-id>"
   GITHUB_SECRET="<your-github-secret>"

   # Google OAuth
   GOOGLE_CLIENT_ID="<your-google-client-id>"
   GOOGLE_CLIENT_SECRET="<your-google-client-secret>"

   # UploadThing
   UPLOADTHING_SECRET="<your-uploadthing-secret>"
   UPLOADTHING_APP_ID="<your-uploadthing-app-id>"

   # PostHog Analytics
   NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
   NEXT_PUBLIC_POSTHOG_KEY="<your-posthog-key>"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
CRM Project Main/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Dashboard pages
│   │   └── dashboard/
│   │       ├── clients/          # Client management
│   │       ├── projects/         # Project management
│   │       ├── payments/         # Payment tracking
│   │       ├── emails/           # Email composer
│   │       ├── file-manager/     # File management
│   │       ├── members/          # Team members
│   │       ├── portfolio/        # Portfolio items
│   │       ├── brand-settings/   # Brand customization
│   │       ├── subscribers/      # Subscriber management
│   │       ├── guest-projects/   # Guest project links
│   │       └── page.tsx          # Dashboard home
│   ├── (project)/                # Project detail pages
│   │   └── project/
│   │       └── modules/[id]/     # Module and task management
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth configuration
│   │   └── uploadthing/          # File upload endpoints
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── dashboard/                # Dashboard-specific components
│   ├── FormInputs/               # Form input components
│   ├── Forms/                    # Form components
│   ├── ui/                       # Shadcn UI components
│   ├── DataTableColumns/         # Table column definitions
│   └── DataTableComponents/      # Table components
├── actions/                      # Server actions
│   ├── analytics.ts              # Analytics calculations
│   ├── clients.ts                # Client operations
│   ├── projects.ts               # Project operations
│   ├── payments.ts               # Payment operations
│   ├── emails.ts                 # Email operations
│   ├── filemanager.ts            # File operations
│   ├── module.ts                 # Module operations
│   ├── tasks.ts                  # Task operations
│   └── users.ts                  # User operations
├── prisma/
│   └── schema.prisma             # Database schema
├── types/
│   └── types.ts                  # TypeScript type definitions
├── lib/                          # Utility functions
├── config/                       # Configuration files
└── public/                       # Static assets
```

## 🔐 Environment Variables Setup Guide

### Database URL (MongoDB)
1. Sign up for MongoDB Atlas at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string and replace `<username>`, `<password>`, and `<database>`

### NextAuth Configuration
1. Generate `NEXTAUTH_SECRET` using [generate-secret.vercel.app](https://generate-secret.vercel.app/)
2. Set `NEXTAUTH_URL` to your application URL (e.g., `http://localhost:3000`)

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set Authorization callback URL to `{NEXTAUTH_URL}/api/auth/callback/github`
4. Copy the Client ID and Client Secret

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project → "APIs & Services" → "Credentials"
3. Create "OAuth client ID" (Web application)
4. Add authorized redirect URI: `{NEXTAUTH_URL}/api/auth/callback/google`
5. Copy Client ID and Client Secret

### UploadThing
1. Visit [UploadThing](https://uploadthing.com/) and create an account
2. Create a new project
3. Copy `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` from project settings

### PostHog Analytics
1. Sign up at [PostHog](https://posthog.com/)
2. Create a new project
3. Copy the API host and project API key from settings

## 📊 Database Schema

The application uses MongoDB with Prisma ORM. Key models include:

- **User**: System users with roles (USER, ADMIN, CLIENT, MEMBER)
- **Project**: Project information and tracking
- **Module**: Project modules for organization
- **Task**: Individual tasks within modules
- **Payment**: Payment records and tracking
- **Invoice**: Invoice generation and management
- **Member**: Team members assigned to projects
- **ProjectComment**: Comments on projects
- **Folder**: File organization folders
- **File**: Uploaded files and documents
- **PortfolioItem**: Portfolio showcase items
- **PortfolioProfile**: User portfolio profiles
- **Subscriber**: Email subscribers
- **GuestProject**: Shared project links

## 🎨 UI Components

Built with Radix UI and styled with Tailwind CSS:
- Forms with validation
- Data tables with sorting and filtering
- Modal dialogs
- Dropdown menus
- Tooltips and popovers
- Accordions and tabs
- Progress indicators
- Toast notifications

## 🔒 Security Features

- NextAuth.js authentication
- Role-based access control (USER, ADMIN, CLIENT, MEMBER)
- Secure password hashing with bcrypt
- OAuth integration (GitHub, Google)
- Protected API routes
- Environment variable protection

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

For contribution guidelines, please contact the project maintainers.

## 📧 Support

For issues and questions, please create an issue in the repository or contact the development team.

---
