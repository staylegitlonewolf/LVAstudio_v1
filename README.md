# LVA Studio v1 - Authentication & User Management System

## 🚀 Overview

LVA Studio is a comprehensive web application with a robust authentication and user management system built on Strapi backend and modern frontend technologies.

## 🏗️ Architecture

### Backend (Strapi)
- **Location**: `lva-studio-backend/`
- **Port**: 1337
- **Database**: SQLite (development)
- **Key Features**:
  - User authentication via users-permissions plugin
  - Member profiles with role-based access control
  - RESTful API endpoints
  - Auto-member profile creation on registration

### Frontend
- **Main Site**: `index.html`
- **Login Page**: `login.html`
- **Admin Dashboard**: `admin-dashboard.html`
- **Key Scripts**:
  - `js/auth.js` - Authentication management
  - `js/user-profile.js` - User profile modal
  - `js/auth-integration.js` - System integration and debugging

## 👥 User Roles & Permissions

### Role Hierarchy
1. **Super Admin** - Full system access, golden ribbon
2. **Admin** - Administrative access, orange ribbon
3. **Moderator** - Limited admin access, orange ribbon
4. **Member** - Standard user access, blue ribbon

### Features by Role
- **All Users**: Profile viewing, basic site access
- **Moderator+**: Admin dashboard access
- **Admin+**: Member management (edit/delete)
- **Super Admin**: Full system control

## 🔧 Setup Instructions

### 1. Start Strapi Backend
```bash
# Option 1: Use batch script (Windows)
bat/start-strapi.bat

# Option 2: Manual start
cd lva-studio-backend
npm run develop
```

### 2. Access Points
- **Frontend**: Open `index.html` in browser
- **Strapi Admin**: http://localhost:1337/admin
- **API**: http://localhost:1337/api

### 3. Initial Setup
1. Create admin account in Strapi admin panel
2. Set up Member collection permissions
3. Create Super Admin member profile manually

## 🔐 Authentication Flow

### Registration
1. User fills signup form
2. Strapi creates user account
3. Auto-creates Member profile with "Member" role
4. Redirects to main site

### Login
1. User enters credentials
2. Strapi validates and returns JWT token
3. Frontend stores token and user data
4. Fetches member profile data
5. Updates UI based on role

### Profile Management
- Modal-based profile display
- Role ribbon display
- Admin dashboard access for authorized users
- Automatic member profile creation if missing

## 🛠️ Development Tools

### Debug Functions
Open browser console and use:
```javascript
// Check current auth state
debugAuthState()

// Clear all auth data (for testing)
clearAuthData()

// Check system status (auto-runs on page load)
// Look for console messages starting with 🔍
```

### API Endpoints
- `POST /api/auth/local/register` - User registration
- `POST /api/auth/local` - User login
- `GET /api/members` - List members (admin only)
- `POST /api/members` - Create member profile
- `PUT /api/members/:id` - Update member (admin only)
- `DELETE /api/members/:id` - Delete member (admin only)

## 🎨 UI Components

### Role Ribbons
- **Member**: Blue gradient
- **Admin/Moderator**: Orange gradient
- **Super Admin**: Gold gradient with border

### Profile Modal
- User information display
- Role ribbon with click-to-admin-dashboard
- Admin dashboard access button
- Logout functionality

### Admin Dashboard
- Member list with cards
- Edit/delete functionality
- Role-based access control
- Real-time updates

## 🔍 Troubleshooting

### Common Issues

1. **"No member profile found"**
   - System will auto-create profile
   - Check Strapi admin for Member collection permissions

2. **Admin dashboard access denied**
   - Verify user has admin role in member profile
   - Check browser console for role information

3. **Strapi not accessible**
   - Ensure Strapi server is running
   - Check port 1337 is available
   - Verify firewall settings

4. **Authentication errors**
   - Clear browser storage: `clearAuthData()`
   - Check Strapi logs for errors
   - Verify API permissions in Strapi admin

### Debug Steps
1. Open browser console
2. Check system status messages
3. Use `debugAuthState()` to inspect current state
4. Verify Strapi admin panel access
5. Check network tab for API errors

## 📁 File Structure

```
LVAstudio_v1/
├── lva-studio-backend/          # Strapi backend
│   ├── src/
│   │   ├── api/member/         # Member content type
│   │   └── extensions/users-permissions/  # Auth customization
│   └── package.json
├── js/
│   ├── auth.js                 # Authentication management
│   ├── user-profile.js         # Profile modal component
│   └── auth-integration.js     # System integration
├── css/                        # Stylesheets
├── bat/                        # Batch scripts
├── index.html                  # Main site
├── login.html                  # Login page
└── admin-dashboard.html        # Admin interface
```

## 🚀 Deployment

### Production Considerations
1. Change `STRAPI_URL` in `js/auth.js` to production URL
2. Set up proper database (PostgreSQL recommended)
3. Configure environment variables
4. Set up SSL certificates
5. Configure proper CORS settings

### Security Notes
- JWT tokens stored in localStorage
- Role-based access control on both frontend and backend
- API endpoints protected by authentication
- Admin functions require proper role verification

## 📞 Support

For issues or questions:
1. Check browser console for error messages
2. Review Strapi admin logs
3. Use debug functions to inspect system state
4. Verify all components are properly loaded

---

**LVA Studio v1** - Living Victorious Always™
