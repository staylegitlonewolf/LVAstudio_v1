# Strapi Backend Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Cloud Console account

## 1. Install Strapi

```bash
npx create-strapi-app@latest lva-studio-backend --quickstart
cd lva-studio-backend
```

## 2. Install Required Plugins

```bash
npm install @strapi/plugin-users-permissions
npm install strapi-provider-upload-cloudinary
```

## 3. Configure Google OAuth

### Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure OAuth consent screen:
   - User Type: External
   - App name: LVA Studio
   - User support email: your-email@domain.com
   - Developer contact information: your-email@domain.com
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized JavaScript origins: 
     - `http://localhost:3000`
     - `http://localhost:1337`
     - Your production domain
   - Authorized redirect URIs:
     - `http://localhost:1337/api/auth/callback/google`
     - Your production callback URL

### Step 2: Configure Strapi

Create/update `config/plugins.js`:

```javascript
module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  upload: {
    config: {
      provider: 'strapi-provider-upload-cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
  },
});
```

Create/update `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

Create/update `.env`:

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

# Cloudinary (optional)
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

## 4. Configure Users & Permissions

### Step 1: Access Admin Panel
1. Start Strapi: `npm run develop`
2. Go to `http://localhost:1337/admin`
3. Create admin account

### Step 2: Configure Authentication
1. Go to "Settings" → "Users & Permissions Plugin" → "Providers"
2. Add Google provider:
   - Enable: Yes
   - Client ID: Your Google Client ID
   - Client Secret: Your Google Client Secret
   - Callback URL: `http://localhost:1337/api/auth/callback/google`
   - Scope: `email profile`

### Step 3: Configure Roles & Permissions
1. Go to "Settings" → "Users & Permissions Plugin" → "Roles"
2. Configure "Authenticated" role:
   - Enable permissions for your content types
   - Common permissions: `find`, `findOne`, `create`, `update`, `delete`

## 5. Custom Authentication Controller

Create `src/api/auth/controllers/auth.js`:

```javascript
'use strict';

const { sanitizeEntity } = require('@strapi/utils');

module.exports = {
  async callback(ctx) {
    const { provider } = ctx.params;
    const { query } = ctx;

    const passport = require('passport');

    const authenticate = (req, res) =>
      new Promise((resolve, reject) => {
        passport.authenticate(provider, (err, user, info) => {
          if (err) {
            reject(err);
          } else {
            resolve({ user, info });
          }
        })(req, res);
      });

    try {
      const { user, info } = await authenticate(ctx.request, ctx.response);

      if (!user) {
        return ctx.badRequest(info.message);
      }

      ctx.send({
        jwt: strapi.plugins['users-permissions'].services.jwt.issue({
          id: user.id,
        }),
        user: sanitizeEntity(user, { model: strapi.getModel('plugin::users-permissions.user') }),
      });
    } catch (err) {
      ctx.badRequest(err.message);
    }
  },

  async connect(ctx) {
    const grant = require('grant-koa');

    const providers = await strapi
      .store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'grant',
      })
      .get();

    const apiPrefix = strapi.config.get('api.rest.prefix');

    const grantConfig = {
      defaults: {
        prefix: `${apiPrefix}/connect`,
      },
      ...providers,
    };

    const [request, response] = await grant(grantConfig)(ctx.request, ctx.response);
    const { body } = request;

    // Here you can customize the user creation/update logic
    const user = await strapi.plugins['users-permissions'].services.user.fetch({
      id: body.id,
    });

    ctx.send({
      jwt: strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
      }),
      user: sanitizeEntity(user, { model: strapi.getModel('plugin::users-permissions.user') }),
    });
  },
};
```

## 6. Custom Routes

Create `src/api/auth/routes/auth.js`:

```javascript
'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/auth/:provider/callback',
      handler: 'auth.callback',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/auth/:provider/callback',
      handler: 'auth.callback',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/connect/:provider',
      handler: 'auth.connect',
      config: {
        auth: false,
      },
    },
  ],
};
```

## 7. Start the Server

```bash
npm run develop
```

## 8. Test the Setup

1. Frontend: Navigate to `http://localhost:3000/login.html`
2. Backend: Admin panel at `http://localhost:1337/admin`
3. API: Test endpoints at `http://localhost:1337/api`

## 9. Production Deployment

### Environment Variables for Production
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

### Build for Production
```bash
npm run build
npm run start
```

## 10. Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **CORS**: Configure CORS properly for your domains
3. **Rate Limiting**: Implement rate limiting for auth endpoints
4. **JWT Expiration**: Set appropriate JWT expiration times
5. **Environment Variables**: Never commit sensitive data to version control

## 11. Troubleshooting

### Common Issues:
1. **CORS Errors**: Check CORS configuration in `config/middlewares.js`
2. **Google OAuth Errors**: Verify redirect URIs and client credentials
3. **Database Issues**: Ensure database is properly configured
4. **JWT Issues**: Check JWT secret configuration

### Debug Mode:
```bash
NODE_ENV=development DEBUG=strapi:* npm run develop
```

## 12. Additional Features

### Email Templates
Configure email templates in Strapi admin panel for:
- Welcome emails
- Password reset emails
- Email verification

### User Profile Management
Create custom content types for:
- User profiles
- User preferences
- User activity logs

### Role-Based Access Control
Configure different user roles:
- Admin
- Premium User
- Basic User
- Guest

This setup provides a complete authentication system with Google OAuth integration for your LVA Studio application. 