# Simple Strapi Authentication Setup

## Overview

This guide will help you set up Strapi's native authentication system for your LVA Studio application. This is much simpler than OAuth and provides robust email/password authentication.

## Features

✅ **Email/Password Registration** - User signup with email verification  
✅ **Email/Password Login** - Secure user authentication  
✅ **Password Reset** - Forgot password functionality  
✅ **User Profile Management** - View and manage user profiles  
✅ **Session Management** - JWT token handling  
✅ **Admin Panel** - Easy user management  

## Quick Setup

### 1. Install Strapi

```bash
# Create a new Strapi project
npx create-strapi-app@latest lva-studio-backend --quickstart

# Navigate to the project
cd lva-studio-backend
```

### 2. Start Strapi

```bash
npm run develop
```

### 3. Create Admin Account

1. Go to `http://localhost:1337/admin`
2. Create your admin account
3. Complete the setup

### 4. Configure Authentication

1. Go to "Settings" → "Users & Permissions Plugin" → "Roles"
2. Click on "Authenticated" role
3. Configure permissions for your content types
4. Save the changes

### 5. Test the API

Your Strapi backend now provides these authentication endpoints:

- `POST /api/auth/local/register` - User registration
- `POST /api/auth/local` - User login  
- `POST /api/auth/forgot-password` - Password reset
- `GET /api/users/me` - Get current user

## Frontend Integration

The frontend is already configured to work with Strapi's native authentication:

- **Login Page**: `login.html`
- **Auth Logic**: `js/auth.js`
- **Integration**: `js/auth-integration.js`

### Configuration

Update the Strapi URL in your JavaScript files:

```javascript
// In js/auth.js and js/auth-integration.js
const STRAPI_URL = 'http://localhost:1337'; // Change for production
```

## Testing

### 1. Start Both Servers

**Frontend** (your current project):
```bash
# Serve your frontend files
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
3. Try creating a new account
4. Test login with the created account
5. Test password reset functionality

## API Examples

### User Registration

```javascript
const response = await fetch('http://localhost:1337/api/auth/local/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123'
  })
});

const result = await response.json();
// result.jwt contains the authentication token
// result.user contains the user data
```

### User Login

```javascript
const response = await fetch('http://localhost:1337/api/auth/local', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    identifier: 'john@example.com', // or username
    password: 'password123'
  })
});

const result = await response.json();
// result.jwt contains the authentication token
// result.user contains the user data
```

### Get Current User

```javascript
const response = await fetch('http://localhost:1337/api/users/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const user = await response.json();
```

## Production Deployment

### 1. Environment Variables

Create `.env` file in your Strapi project:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt

# Database (for production, use PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=your-database-host
DATABASE_PORT=5432
DATABASE_NAME=your-database-name
DATABASE_USERNAME=your-database-username
DATABASE_PASSWORD=your-database-password
DATABASE_SSL=true
```

### 2. Build for Production

```bash
cd lva-studio-backend
npm run build
npm run start
```

### 3. Update Frontend URLs

Update the Strapi URL in your JavaScript files to point to your production backend.

## Security Features

Strapi provides built-in security features:

- **Password Hashing** - Passwords are automatically hashed
- **JWT Tokens** - Secure session management
- **Input Validation** - Automatic validation of user input
- **CORS Protection** - Configurable cross-origin requests
- **Rate Limiting** - Built-in protection against brute force attacks

## Customization

### Email Templates

Configure email templates in Strapi admin panel:

1. Go to "Settings" → "Users & Permissions Plugin" → "Email Templates"
2. Customize welcome emails, password reset emails, etc.

### User Roles

Create custom user roles:

1. Go to "Settings" → "Users & Permissions Plugin" → "Roles"
2. Create new roles (Admin, Premium User, etc.)
3. Set appropriate permissions for each role

### User Fields

Add custom user fields:

1. Go to "Content-Type Builder" → "User"
2. Add custom fields (phone, address, etc.)
3. Save and restart Strapi

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check CORS configuration in Strapi admin panel
   - Ensure frontend URL is allowed

2. **Database Issues**:
   - Check database configuration
   - Ensure database is running

3. **JWT Issues**:
   - Verify JWT secret in environment variables
   - Check token expiration settings

### Debug Mode

```bash
NODE_ENV=development DEBUG=strapi:* npm run develop
```

## Benefits of Native Authentication

- **Simpler Setup** - No OAuth configuration needed
- **Better Control** - Full control over user data
- **Easier Maintenance** - Less external dependencies
- **Better Performance** - Direct database queries
- **More Secure** - No third-party token handling

## Next Steps

Once authentication is working, you can:

1. **Add User Profiles** - Create custom user content types
2. **Implement Role-Based Access** - Use different user roles
3. **Add Email Verification** - Configure email verification
4. **Create User Dashboard** - Build user-specific features
5. **Add Analytics** - Track user behavior

---

This simplified setup provides a robust, secure authentication system that's easy to maintain and customize for your LVA Studio application. 