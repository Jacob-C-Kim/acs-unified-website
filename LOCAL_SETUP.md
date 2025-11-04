# Local Setup Guide

This guide will help you set up and run the ACS Unified Website locally on your laptop.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Setup Steps

1. **Navigate to the project directory:**
   ```bash
   cd acs-unified
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The app will automatically open at `http://localhost:3000`
   If it doesn't, manually navigate to that URL.

## Testing Routes

Once the server is running, you can test all routes:

- Home: `http://localhost:3000/`
- About Us: `http://localhost:3000/about-us`
- Calendar: `http://localhost:3000/acs-calendar`
- Mentor/Mentee: `http://localhost:3000/mentor-mentee`
- Tinikling: `http://localhost:3000/tinikling`
- Tinikling Sign-Up: `http://localhost:3000/tinikling/sign-up`
- Mentor Sign-Up: `http://localhost:3000/mentor-mentee/mentor/sign-up`
- Mentee Sign-Up: `http://localhost:3000/mentor-mentee/mentee/sign-up`

## Verification Checklist

- [ ] All pages load correctly
- [ ] Navigation bar appears on all pages
- [ ] Navigation links work correctly
- [ ] Sticky header behavior works as expected
- [ ] All sign-up forms are accessible
- [ ] Frontend looks identical to the original separate repos
- [ ] No console errors

## Build for Production

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can change it in `vite.config.ts`:
```typescript
server: {
  port: 3001, // Change to any available port
  open: true,
}
```

### Module Not Found Errors
If you encounter module not found errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
If you encounter build errors, make sure all dependencies are installed:
```bash
npm install
```

