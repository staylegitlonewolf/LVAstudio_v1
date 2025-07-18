# Railway Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Railway Account & CLI
- [ ] Railway account created at [railway.app](https://railway.app)
- [ ] Railway CLI installed: `npm install -g @railway/cli`
- [ ] Logged into Railway: `railway login`

### 2. Project Setup
- [ ] Railway project initialized: `railway init`
- [ ] Project linked to Railway dashboard
- [ ] Git repository is up to date

### 3. Database Setup
- [ ] PostgreSQL database service added in Railway
- [ ] Database connection string copied from Railway dashboard
- [ ] Database is accessible and running

### 4. Environment Variables
- [ ] `DATABASE_CLIENT=postgres`
- [ ] `DATABASE_URL=your_railway_postgres_connection_string`
- [ ] `DATABASE_SSL=true`
- [ ] `HOST=0.0.0.0`
- [ ] `PORT=1337`
- [ ] `NODE_ENV=production`
- [ ] `APP_KEYS=key1,key2,key3,key4` (generated)
- [ ] `ADMIN_JWT_SECRET=your_secret` (generated)
- [ ] `API_TOKEN_SALT=your_salt` (generated)
- [ ] `TRANSFER_TOKEN_SALT=your_salt` (generated)
- [ ] `JWT_SECRET=your_secret` (generated)

### 5. Security Keys Generation
- [ ] Run `node generate-keys.js` to generate all security keys
- [ ] Copy generated keys to Railway environment variables
- [ ] Verify all keys are properly set

### 6. Code Verification
- [ ] `railway.json` is properly configured
- [ ] `package.json` includes all necessary dependencies
- [ ] Strapi configuration supports PostgreSQL
- [ ] No sensitive data in code (use environment variables)

## 🚀 Deployment Steps

### Step 1: Generate Security Keys
```bash
node generate-keys.js
```

### Step 2: Set Environment Variables
1. Go to Railway dashboard
2. Select your service
3. Go to "Variables" tab
4. Add all required environment variables

### Step 3: Deploy
```bash
railway up
```

### Step 4: Verify Deployment
- [ ] Check deployment logs for errors
- [ ] Visit application URL
- [ ] Access Strapi admin at `/admin`
- [ ] Create first admin user

## 🔍 Post-Deployment Verification

### 1. Application Health
- [ ] Application loads without errors
- [ ] Strapi admin panel is accessible
- [ ] Database connection is working
- [ ] API endpoints respond correctly

### 2. Content Management
- [ ] Can create admin user
- [ ] Can access content types
- [ ] Can create and edit content
- [ ] Media uploads work

### 3. Frontend Integration
- [ ] Update frontend API URLs to use Railway domain
- [ ] Test API calls from frontend
- [ ] Verify authentication works
- [ ] Check all features function correctly

## 🛠️ Troubleshooting

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Build fails | Check `package.json` dependencies |
| Database connection error | Verify `DATABASE_URL` format |
| Port binding error | Ensure `PORT` is set to `1337` |
| Memory issues | Optimize build process |
| SSL errors | Set `DATABASE_SSL=true` |

### Useful Commands
```bash
# View logs
railway logs

# Check status
railway status

# Redeploy
railway up

# Open dashboard
railway open

# Connect to database
railway connect
```

## 📞 Support Resources

- [Railway Documentation](https://docs.railway.app/)
- [Strapi Documentation](https://docs.strapi.io/)
- [Railway Discord](https://discord.gg/railway)
- [Strapi Community](https://forum.strapi.io/)

## 🎯 Next Steps After Deployment

1. **Set up monitoring** - Use Railway's built-in monitoring
2. **Configure backups** - Set up database backups
3. **Set up custom domain** - Add your domain in Railway
4. **Optimize performance** - Monitor and optimize as needed
5. **Set up CI/CD** - Configure automatic deployments

---

**Note**: Keep your security keys safe and never commit them to version control! 