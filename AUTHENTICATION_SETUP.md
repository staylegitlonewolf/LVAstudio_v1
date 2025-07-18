# LVA Studio Authentication Setup Guide

## Overview

This guide will help you set up a complete authentication system for your LVA Studio application using Google OAuth and Strapi as the backend.

## Features Included

✅ **Google OAuth Authentication** - Sign in/up with Google  
✅ **Email/Password Authentication** - Traditional login system  
✅ **Password Reset** - Forgot password functionality  
✅ **User Profile Management** - View and manage user profiles  
✅ **Session Management** - Automatic token handling  
✅ **Responsive Design** - Works on all devices  
✅ **Modern UI** - Matches your existing design system  

## Quick Start

### 1. Frontend Setup (Already Done!)

The authentication frontend is already set up in your project:

- **Login Page**: `login.html`
- **Authentication Styles**: `css/auth.css`
- **Auth Logic**: `js/auth.js`
- **Integration**: `js/auth-integration.js`

### 2. Backend Setup (Strapi)

#### Step 1: Install Strapi

```bash
# Create a new Strapi project
npx create-strapi-app@latest lva-studio-backend --quickstart

# Navigate to the project
cd lva-studio-backend
```

#### Step 2: Install Required Plugins

```bash
npm install @strapi/plugin-users-permissions
```

#### Step 3: Configure Google OAuth

1. **Google Cloud Console Setup**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Configure OAuth consent screen:
     - User Type: External
     - App name: LVA Studio
     - User support email: your-email@domain.com
   - Create OAuth 2.0 Client ID:
     - Application type: Web application
     - Authorized JavaScript origins: 
       - `http://localhost:3000`
       - `http://localhost:1337`
     - Authorized redirect URIs:
       - `http://localhost:1337/api/auth/callback/google`

2. **Update Configuration**:
   - Copy your Google Client ID and Client Secret
   - Update `js/auth.js` with your Google Client ID
   - Update `login.html` with your Google Client ID

#### Step 4: Configure Strapi Environment

Create/update `.env` file in your Strapi project:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Step 5: Configure Strapi Admin Panel

1. Start Strapi: `npm run develop`
2. Go to `http://localhost:1337/admin`
3. Create admin account
4. Go to "Settings" → "Users & Permissions Plugin" → "Providers"
5. Add Google provider:
   - Enable: Yes
   - Client ID: Your Google Client ID
   - Client Secret: Your Google Client Secret
   - Callback URL: `http://localhost:1337/api/auth/callback/google`
   - Scope: `email profile`

#### Step 6: Configure Roles & Permissions

1. Go to "Settings" → "Users & Permissions Plugin" → "Roles"
2. Configure "Authenticated" role with appropriate permissions

## Configuration Files

### Update Google Client ID

In `js/auth.js`:
```javascript
const GOOGLE_CLIENT_ID = 'YOUR_ACTUAL_GOOGLE_CLIENT_ID';
```

In `login.html`:
```html
data-client_id="YOUR_ACTUAL_GOOGLE_CLIENT_ID"
```

### Update Strapi URL

In `js/auth.js` and `js/auth-integration.js`:
```javascript
const STRAPI_URL = 'http://localhost:1337'; // Change for production
```

## Testing the Setup

### 1. Start Both Servers

**Frontend** (your current project):
```bash
# Serve your frontend files
# You can use any local server, for example:
npx http-server -p 3000
```

**Backend** (Strapi):
```bash
cd lva-studio-backend
npm run develop
```

### 2. Test Authentication

1. Navigate to `http://localhost:3000`
2. Click the "Login" button in the top menu
3. Try both Google OAuth and email/password authentication
4. Test the user profile and logout functionality

## Production Deployment

### 1. Environment Variables

Update your environment variables for production:

```env
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_HOST=your-database-host
DATABASE_PORT=5432
DATABASE_NAME=your-database-name
DATABASE_USERNAME=your-database-username
DATABASE_PASSWORD=your-database-password
DATABASE_SSL=true

# Update Google OAuth redirect URIs for production
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret
```

### 2. Update Frontend URLs

Update the Strapi URL in your JavaScript files to point to your production backend.

### 3. Build Strapi for Production

```bash
cd lva-studio-backend
npm run build
npm run start
```

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Never commit sensitive data to version control
3. **CORS**: Configure CORS properly for your domains
4. **Rate Limiting**: Consider implementing rate limiting for auth endpoints
5. **JWT Expiration**: Set appropriate JWT expiration times

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check CORS configuration in Strapi
   - Ensure frontend and backend URLs are properly configured

2. **Google OAuth Errors**:
   - Verify redirect URIs in Google Cloud Console
   - Check client ID and secret are correct
   - Ensure Google+ API is enabled

3. **Database Issues**:
   - Check database configuration
   - Ensure Strapi can connect to the database

4. **JWT Issues**:
   - Verify JWT secret configuration
   - Check token expiration settings

### Debug Mode

For Strapi debugging:
```bash
NODE_ENV=development DEBUG=strapi:* npm run develop
```

## API Endpoints

The authentication system uses these Strapi endpoints:

- `POST /api/auth/local/register` - User registration
- `POST /api/auth/local` - User login
- `POST /api/auth/forgot-password` - Password reset
- `GET /api/users/me` - Get current user
- `POST /api/auth/callback/google` - Google OAuth callback

## Customization

### Adding More OAuth Providers

You can easily add more OAuth providers (Facebook, GitHub, etc.) by:

1. Configuring them in Strapi admin panel
2. Adding the provider buttons to `login.html`
3. Updating the authentication logic in `js/auth.js`

### Custom User Fields

To add custom user fields:

1. Create content types in Strapi admin panel
2. Configure relationships with the User model
3. Update the frontend to display/edit these fields

### Role-Based Access Control

Configure different user roles in Strapi:

1. Go to "Settings" → "Users & Permissions Plugin" → "Roles"
2. Create custom roles (Admin, Premium User, etc.)
3. Set appropriate permissions for each role
4. Use `authIntegration.hasRole('role-name')` in your frontend code

## Support

If you encounter any issues:

1. Check the browser console for JavaScript errors
2. Check the Strapi server logs for backend errors
3. Verify all configuration settings
4. Ensure all required services are running

## Next Steps

Once authentication is working, you can:

1. **Add Protected Routes**: Use `authIntegration.requireAuth()` to protect features
2. **User Profiles**: Implement profile editing functionality
3. **Email Templates**: Configure welcome and reset emails in Strapi
4. **Analytics**: Track user behavior and authentication events
5. **Multi-factor Authentication**: Add additional security layers

---

**Note**: This authentication system is designed to work seamlessly with your existing LVA Studio application. The UI matches your current design system and the functionality integrates with your portal structure. 