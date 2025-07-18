# LVA Studio Deployment Guide

## 🎯 Current Setup Status

### ✅ Completed:
- **Railway Database**: PostgreSQL database successfully set up
- **Environment Variables**: All Strapi configuration variables configured
- **Security Keys**: Generated and configured
- **Railway Project**: Linked and ready

### 🔄 Next Steps:
- **Application Deployment**: Deploy Strapi app to Render (free hosting)

## 🚀 Deployment Options

### Option 1: Railway + Render (Recommended)
- **Database**: Railway PostgreSQL (✅ Already set up)
- **Application**: Render (Free hosting)

### Option 2: Railway Upgrade
- **Full Stack**: Upgrade Railway plan to deploy everything

### Option 3: Render Full Stack
- **Database + Application**: Both on Render

## 📋 Current Railway Database Details

```
Database URL: postgresql://postgres:rlDvLJoDRAEDOnBgKxsBanqBteYGjbkX@postgres.railway.internal:5432/railway
Public URL: postgresql://postgres:rlDvLJoDRAEDOnBgKxsBanqBteYGjbkX@turntable.proxy.rlwy.net:47370/railway
```

## 🎨 Render Deployment (Recommended)

### Step 1: Sign Up for Render
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your repository

### Step 2: Deploy Using Blueprint
1. In Render dashboard, click "New +"
2. Select "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml`
5. Click "Apply" to deploy

### Step 3: Manual Deployment (Alternative)
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `lva-studio-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd lva-studio-backend && npm install && npm run build`
   - **Start Command**: `cd lva-studio-backend && npm run start`
   - **Health Check Path**: `/api/members`

### Step 4: Set Environment Variables
Add these variables in Render dashboard:

```bash
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres:rlDvLJoDRAEDOnBgKxsBanqBteYGjbkX@turntable.proxy.rlwy.net:47370/railway
DATABASE_SSL=true
HOST=0.0.0.0
PORT=1337
APP_KEYS=LL4zOY1gQMH2nv+VSVS97ShnDzrhy0bd5OhDN3szlUI=,D3aAI2pxo4fGVYWVtff3d+ENFgXHjrHR/SLDHd9UWHo=,DZHh2pXFMkAE4P6DHcQLgZsBiv2BpVYOAIZSP1xBc6k=,7pfZNkhB+XHbQz191XBB3j7bu7EWLhJ+D9v/OF25pVI=
ADMIN_JWT_SECRET=RUFeC3SD/y0IE9xsjSbKEYa2bOTVFEO+HUzGt3AcR8k=
API_TOKEN_SALT=iCEfa5ew1TLdpf1UNWBJtw==
TRANSFER_TOKEN_SALT=TozGrf52H43NGh9AW1wIaQ==
JWT_SECRET=Nntv3YuSlJD3MscDP60Y1s9ampqEPZVaVe3HYxRNVZY=
```

## 🔧 Railway Upgrade Option

If you want to deploy everything on Railway:

1. **Upgrade Plan**: Visit [railway.com/account/plans](https://railway.com/account/plans)
2. **Choose Plan**: Select "Developer" or higher
3. **Deploy**: Run `railway up` again

## 📊 Deployment Comparison

| Platform | Database | App Hosting | Cost | Setup |
|----------|----------|-------------|------|-------|
| Railway | ✅ Free | ❌ Limited Plan | $5+/month | Complex |
| Render | ✅ Free | ✅ Free | Free | Simple |
| Railway + Render | ✅ Free | ✅ Free | Free | Medium |

## 🎯 Recommended Approach: Railway + Render

### Why This Combination?
1. **Railway Database**: Excellent PostgreSQL hosting
2. **Render App**: Free, reliable application hosting
3. **Cost**: Completely free
4. **Performance**: Both platforms are fast and reliable

### Setup Steps:
1. ✅ Railway database is ready
2. 🔄 Deploy app to Render
3. 🔄 Update frontend API URLs
4. ✅ Test everything

## 🔍 Post-Deployment Checklist

### Application Health:
- [ ] Strapi admin panel accessible at `/admin`
- [ ] Database connection working
- [ ] API endpoints responding
- [ ] Media uploads functional

### Frontend Integration:
- [ ] Update API base URL in frontend
- [ ] Test authentication flow
- [ ] Verify all API calls work
- [ ] Check media loading

### Security:
- [ ] Admin user created
- [ ] Permissions configured
- [ ] SSL certificates active
- [ ] Environment variables secure

## 🛠️ Troubleshooting

### Common Issues:

| Issue | Solution |
|-------|----------|
| Database connection failed | Check DATABASE_URL format |
| Build fails | Verify Node.js version (18+) |
| Port binding error | Ensure PORT=1337 |
| Memory issues | Optimize build process |

### Useful Commands:
```bash
# Check Railway database
railway connect

# View Railway logs
railway logs

# Check Render deployment
# Use Render dashboard
```

## 📞 Support Resources

- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Strapi Documentation](https://docs.strapi.io/)

## 🎉 Next Steps

1. **Deploy to Render** using the guide above
2. **Test the deployment** thoroughly
3. **Update frontend** to use new API URLs
4. **Monitor performance** and optimize as needed

---

**Current Status**: Database ready on Railway, ready to deploy app to Render! 🚀 