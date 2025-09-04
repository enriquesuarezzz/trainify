
# Trainify 🏋️‍♂️
**Next.js + Tailwind CSS Ecommerce with Firebase and Stripe**
**Next.js + NextAuth + Prisma Gym Class Management**

This is a secure admin dashboard built with Next.js that allows gym administrators to manage gym classes, featuring Google OAuth authentication with role-based access control via NextAuth and Prisma.

## 🚀 Feature

- **Google OAuth Authentication** with NextAuth.js
- **Role-based Access Control** — Admin and User roles supported
- **Prisma Adapter** for seamless database integration
- **JWT Session Strategy** including user roles in session tokens
- **Protected Admin Pages** with client-side role checks
- **Fetch and Display Gym Classes** for admins only

## 📦 Tech Stack

- **Frontend**: Next.js, React
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: Prisma ORM with PostgreSQL (or any supported DB)
- **Styling**: Tailwind CSS (optional, adjust as needed)

---

##  🔐 Authentication & Authorization
Uses NextAuth.js with Google OAuth.

Session strategy is JWT, enriched with user ID and role.

Admin-only pages check session.user.role === 'admin'.

Prisma stores user and session data.

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/enriquesuarezzz/trainify.git
cd trainify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

- Add Firebase config to your `.env.local`:

```bash
DATABASE_URL="your_database_connection_string"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev --name init

```

### 5. Set Up Nodemailer

- Choose an SMTP provider (Gmail, SendGrid, etc.)
- Install Nodemailer:

```bash
npm install nodemailer
```

- Add email configuration to `.env.local`:

```bash
BASE_URL=http://localhost:3000   # Update this in production
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 6. Run the Development Server

```bash
npm run dev
```

The application will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🧠 Sample Prisma User Model

```
model User {
  id            String   @id @default(cuid())
  name          String?
  email         String   @unique
  emailVerified DateTime?
  image         String?
  role          String   @default("user")
  sessions      Session[]
  accounts      Account[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

```

---

## 📄 License

This project is licensed under the **MIT License** — see the LICENSE file for more details.
