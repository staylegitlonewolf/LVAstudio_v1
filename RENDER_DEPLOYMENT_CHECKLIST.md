# Render Deployment Checklist

Based on [Render's deployment documentation](https://render.com/docs/troubleshooting-deploys), this checklist ensures our LVA Studio backend deployment follows all best practices.

## ✅ Pre-Deployment Checklist

### 1. Version Matching
- [x] Node.js version: `18.19.0` (exact version, no ranges)
- [x] `.nvmrc` file matches package.json
- [x] NPM version: `>=8.0.0`

### 2. Build Configuration
- [x] Build command: `cd lva-studio-backend && chmod +x build-render.sh && ./build-render.sh`
- [x] Start command: `cd lva-studio-backend && chmod +x start-production.sh && ./start-production.sh`
- [x] Health check path: `/api/members`
- [x] Health check timeout: `300` seconds
- [x] Graceful shutdown delay: `60` seconds

### 3. Environment Variables
- [x] `NODE_ENV=production`
- [x] `STRAPI_DISABLE_SWC=true`
- [x] `NODE_OPTIONS=--max-old-space-size=4096`
- [x] `HOST=0.0.0.0`
- [x] `PORT=1337`
- [x] Database configuration
- [x] Security keys and secrets

### 4. SWC Disabling (Multiple Layers)
- [x] Environment variable: `STRAPI_DISABLE_SWC=true`
- [x] Package.json scripts with SWC disabled
- [x] Pre/post install scripts to remove SWC packages
- [x] Build script removes SWC packages
- [x] Admin config: `build: { swc: false }`
- [x] `.swcrc` configuration file

### 5. Error Handling
- [x] Graceful shutdown script with signal handling
- [x] Build validation and verification
- [x] Step-by-step logging in build script
- [x] Error exit codes for failed builds

## 🔧 Deployment Process

### Automatic Deployments
- [x] Auto-deploy on commit to `main` branch
- [x] Zero-downtime deployments enabled
- [x] Health checks configured

### Manual Deployment Options
- [ ] Deploy latest commit
- [ ] Deploy specific commit
- [ ] Clear build cache & deploy
- [ ] Restart service

## 📊 Monitoring & Troubleshooting

### Logs to Check
- [ ] Build logs for SWC errors
- [ ] Start command logs
- [ ] Health check responses
- [ ] Database connection logs

### Common Issues & Solutions

#### SWC Native Binding Errors
**Symptoms**: `Failed to load native binding` errors
**Solution**: Our multi-layer SWC disabling approach

#### Build Timeouts
**Symptoms**: Build fails after 120 minutes
**Solution**: Optimized build script with memory management

#### Health Check Failures
**Symptoms**: Service shows as unhealthy
**Solution**: Proper health check path and timeout configuration

#### Graceful Shutdown Issues
**Symptoms**: Service doesn't shut down properly
**Solution**: Custom start script with signal handling

## 🚀 Deployment Commands

### Local Testing
```bash
cd lva-studio-backend
chmod +x test-build.sh
./test-build.sh
```

### Manual Deploy (if needed)
```bash
# Skip auto-deploy for this commit
git commit -m "[skip render] Update documentation"

# Force deploy with cache clear
# Use Render Dashboard: Manual Deploy > Clear build cache & deploy
```

### Rollback (if needed)
```bash
# Use Render Dashboard: Manual Deploy > Deploy a specific commit
# Select previous working commit SHA
```

## 📈 Success Metrics

- [ ] Build completes within 10 minutes
- [ ] Health check passes within 5 minutes
- [ ] Service responds to API requests
- [ ] Admin panel accessible
- [ ] Database connections working
- [ ] Zero downtime during deployment

## 🔍 Post-Deployment Verification

1. **Check Render Dashboard**
   - Service status: "Live"
   - Health check: "Healthy"
   - Recent deploys: "Succeeded"

2. **Test API Endpoints**
   - `https://lva-studio-backend.onrender.com/api/members`
   - Should return JSON response

3. **Test Admin Panel**
   - `https://lva-studio-backend.onrender.com/admin`
   - Should load Strapi admin interface

4. **Check Logs**
   - No SWC-related errors
   - Successful database connections
   - Proper startup sequence

## 🆘 Emergency Procedures

### If Deployment Fails
1. Check build logs for specific errors
2. Verify environment variables are set correctly
3. Test build locally with `test-build.sh`
4. Consider rolling back to last working commit

### If Service is Unhealthy
1. Check health check endpoint manually
2. Verify database connectivity
3. Check service logs for runtime errors
4. Restart service if necessary

### If SWC Errors Persist
1. Verify all SWC disabling layers are active
2. Check if new SWC packages were installed
3. Update build script to be more aggressive
4. Consider using Docker deployment as fallback 