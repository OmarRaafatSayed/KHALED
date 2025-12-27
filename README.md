# TailAdmin Marketplace Frontend

Next.js frontend application for TailAdmin Marketplace.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js 13+ App Router
├── components/          # Reusable components
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 🔐 Authentication with Zustand
- 📱 Responsive design
- 🛒 Shopping cart functionality
- 👤 User dashboard
- 🏪 Vendor dashboard
- 📦 Order management
- ⭐ Product reviews
- 🔍 Product search and filtering

## API Integration

The frontend connects to the Laravel backend API running on `http://localhost:8000/api`.

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=TailAdmin Marketplace
```