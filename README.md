# LeadPal Dashboard

A modern CRM dashboard for managing leads, built with React, TypeScript, and Vite.

## Features

- 🔐 Authentication with protected routes
- 📊 Lead management and tracking
- 🔍 Search and filter functionality
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast development with Vite
- 🧪 Unit testing with Vitest

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Testing**: Vitest
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Or Bun for faster package management

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd leadpal-dashboard

# Install dependencies
npm install
# or with bun
bun install
```

### Development

```sh
# Start the development server
npm run dev
# or with bun
bun run dev
```

The application will be available at `http://localhost:5173`

### Build

```sh
# Build for production
npm run build
# or with bun
bun run build
```

### Testing

```sh
# Run tests
npm run test
# or with bun
bun run test
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── auth/        # Authentication components
│   ├── dashboard/   # Dashboard-specific components
│   ├── layout/      # Layout components
│   ├── leads/       # Lead management components
│   └── ui/          # UI library components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── data/            # Mock data and utilities
└── lib/             # Utility functions
```

## Contributing

Feel free to submit issues and pull requests to improve the project.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

