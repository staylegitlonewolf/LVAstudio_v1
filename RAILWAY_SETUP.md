# Railway Deployment Setup Guide

This guide will help you complete the Railway deployment setup for your LVA Studio project.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **Railway CLI**: Install the Railway CLI tool
3. **Git Repository**: Your code should be in a Git repository

## Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

## Step 2: Login to Railway

```bash
railway login
```

This will open your browser to authenticate with Railway.

## Step 3: Initialize Railway Project

```bash
railway init
```

This will create a new Railway project and link it to your current directory.

## Step 4: Add PostgreSQL Database

1. Go to your Railway dashboard
2. Click "New Service" → "Database" → "PostgreSQL"
3. Note the connection details (you'll need them for environment variables)

## Step 5: Configure Environment Variables

In your Railway dashboard, go to your service and add these environment variables:

### Required Variables:

```bash
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_URL=your_postgresql_connection_string_from_railway
DATABASE_SSL=true

# Strapi Configuration
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Security Keys (generate these using the commands below)
APP_KEYS=key1,key2,key3,key4
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
```

### Generate Security Keys:

Run these commands to generate secure keys:

```bash
# Generate APP_KEYS (run 4 times and combine with commas)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate ADMIN_JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate API_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Generate TRANSFER_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 6: Deploy to Railway

```bash
railway up
```

This will build and deploy your application to Railway.

## Step 7: Verify Deployment

1. Check the deployment logs in Railway dashboard
2. Visit your application URL (provided by Railway)
3. Access Strapi admin panel at `your-url/admin`

## Step 8: Set Up Custom Domain (Optional)

1. In Railway dashboard, go to your service
2. Click "Settings" → "Domains"
3. Add your custom domain

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check that all dependencies are in `package.json`
2. **Database Connection**: Verify `DATABASE_URL` is correct
3. **Port Issues**: Ensure `PORT` environment variable is set
4. **Memory Issues**: Railway provides limited memory, optimize your build

### Useful Commands:

```bash
# View logs
railway logs

# Open dashboard
railway open

# Check status
railway status

# Redeploy
railway up

# Connect to database
railway connect
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_CLIENT` | Database type (postgres) | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `DATABASE_SSL` | Enable SSL for database | Yes |
| `HOST` | Server host (0.0.0.0) | Yes |
| `PORT` | Server port (1337) | Yes |
| `NODE_ENV` | Environment (production) | Yes |
| `APP_KEYS` | Strapi app keys | Yes |
| `ADMIN_JWT_SECRET` | Admin JWT secret | Yes |
| `API_TOKEN_SALT` | API token salt | Yes |
| `TRANSFER_TOKEN_SALT` | Transfer token salt | Yes |
| `JWT_SECRET` | JWT secret | Yes |

## Next Steps

After successful deployment:

1. **Create Admin User**: Visit `/admin` and create your first admin user
2. **Configure Content Types**: Set up your content types in Strapi
3. **Set Up Frontend**: Update your frontend to use the new API URL
4. **Monitor**: Use Railway's monitoring tools to track performance

## Support

- [Railway Documentation](https://docs.railway.app/)
- [Strapi Documentation](https://docs.strapi.io/)
- [Railway Discord](https://discord.gg/railway) 