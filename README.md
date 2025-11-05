# ACS Unified Website

Unified repository for the Asian Culture Society website, consolidating all pages into a single React Router application.

## Routes

- `/` - Home page
- `/about-us` - About Us page
- `/acs-calendar` or `/calendar` - Calendar page
- `/mentor-mentee` - Mentor/Mentee page
- `/tinikling` - Tinikling page
- `/tinikling/sign-up` - Tinikling sign-up page
- `/mentor-mentee/mentor/sign-up` - Mentor sign-up page
- `/mentor-mentee/mentee/sign-up` - Mentee sign-up page

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

This project is configured for Vercel deployment. The `vercel.json` file handles routing configuration.

## Project Structure

- `src/components/shared/` - Shared components (NavigationHeader, PageHeader, ACSLogo)
- `src/components/` - Page-specific components
- `src/pages/` - Page components that use React Router
- `src/assets/` - Static assets
- `src/data/` - Data files
- `src/utils/` - Utility functions

## Security

This project follows secure coding principles:
- No hardcoded secrets or API keys
- Input validation on forms
- Secure navigation with React Router
- Proper error handling

