# Nectar - Grocery Delivery Web Application

A modern, responsive grocery delivery web application built with Next.js, TypeScript, Tailwind CSS, Zustand, and Zod.

## 🚀 Features

- **Authentication Flow**
  - Splash screen
  - Onboarding/Welcome screen
  - Phone number authentication with OTP verification
  - Email/Password login
  - Social login (Google & Facebook)
  - Sign up with validation

- **Form Validation**
  - Real-time validation using Zod schemas
  - Live error detection and display
  - Type-safe form handling with React Hook Form

- **State Management**
  - Zustand for global state management
  - Persistent storage for auth and location data
  - Separate stores for different domains

- **Responsive Design**
  - Mobile-first approach
  - Tailwind CSS utility classes
  - Clean, modern UI matching Figma design

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Validation**: Zod + React Hook Form
- **No UI Libraries**: Pure Tailwind CSS implementation

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🏃 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── splash/            # Splash screen
│   ├── onboarding/        # Welcome/onboarding screen
│   ├── sign-in/           # Sign in with phone/social
│   ├── phone-number/      # Phone number input
│   ├── otp/               # OTP verification
│   ├── location/          # Location selection
│   ├── login/             # Email/password login
│   ├── sign-up/           # User registration
│   └── home/              # Home page (after auth)
├── components/            # Reusable components
│   ├── ui/               # UI components (Button, Input, etc.)
│   └── layout/           # Layout components (Navbar, etc.)
├── store/                # Zustand stores
│   ├── authStore.ts      # Authentication state
│   ├── locationStore.ts  # Location state
│   └── otpStore.ts       # OTP state
├── types/                # TypeScript type definitions
├── lib/                  # Utility functions and schemas
│   └── zod-schemas.ts    # Zod validation schemas
└── README.md
```

## 🎨 Design System

- **Primary Color**: `#53B175` (Green)
- **Typography**: Geist Sans (Next.js default)
- **Border Radius**: `rounded-2xl` (16px) for inputs and buttons
- **Spacing**: Consistent Tailwind spacing scale

## ✅ Features Implemented

- ✅ All authentication screens from Figma
- ✅ Phone number validation (Bangladesh format: +880)
- ✅ OTP input with 4-digit code
- ✅ Email validation with live feedback
- ✅ Password visibility toggle
- ✅ Social login simulation
- ✅ Location selection with zones and areas
- ✅ Form validation with Zod
- ✅ TypeScript strict mode (no `any` types)
- ✅ Zustand state management
- ✅ Responsive design

## 🔐 Authentication Flow

1. **Splash Screen** → Shows for 2 seconds
2. **Onboarding** → Welcome screen with "Get Started" button
3. **Sign In** → Phone number or social login
4. **Phone Number** → Enter mobile number (+880 format)
5. **OTP Verification** → Enter 4-digit code
6. **Location Selection** → Select zone and area
7. **Home** → Main application

Alternative flows:
- **Login** → Direct email/password login
- **Sign Up** → Create new account

## 📝 Notes

- All authentication is **simulated** (no backend required)
- OTP accepts any 4-digit code for demo purposes
- Social login simulates API calls with delays
- Location data is mocked with predefined zones and areas
- State persists in localStorage using Zustand persist middleware

## 🚀 Deployment

This project can be deployed on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Any Node.js hosting platform**

## 📄 License

This project is created for assignment purposes.
