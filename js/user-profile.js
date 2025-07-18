// User Profile Modal Component
class UserProfileModal {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createModal();
    this.setupEventListeners();
  }

  createModal() {
    // Remove existing modal if it exists
    const existingModal = document.getElementById('user-profile-modal');
    if (existingModal) {
      existingModal.remove();
    }

    const modalHTML = `
      <div id="user-profile-modal" class="profile-modal" style="display: none;">
        <div class="profile-modal-overlay" onclick="userProfile.close()"></div>
        <div class="profile-modal-content">
          <div class="profile-header">
            <h2><i class="fas fa-user-circle"></i> User Profile</h2>
            <button class="profile-close-btn" onclick="userProfile.close()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div id="profile-content">
            <div class="profile-loading">
              <i class="fas fa-spinner fa-spin"></i> Loading profile...
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.addStyles();
  }

  addStyles() {
    // Add styles if not already added
    if (document.getElementById('profile-modal-styles')) return;

    const styles = `
      <style id="profile-modal-styles">
        .profile-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
        }

        .profile-modal-content {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 191, 255, 0.1), rgba(0, 128, 255, 0.1));
          border: 1px solid #00bfff;
          border-radius: 15px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 50px rgba(0, 191, 255, 0.3);
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #00bfff;
        }

        .profile-header h2 {
          color: #00bfff;
          margin: 0;
          text-shadow: 0 0 10px #00e5ff;
        }

        .profile-close-btn {
          background: none;
          border: none;
          color: #00bfff;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background 0.3s ease;
        }

        .profile-close-btn:hover {
          background: rgba(0, 191, 255, 0.2);
        }

        .profile-info {
          margin-bottom: 1.5rem;
        }

        .profile-field {
          margin-bottom: 1rem;
          padding: 0.8rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(0, 191, 255, 0.3);
        }

        .profile-field label {
          display: block;
          color: #aadfff;
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
          font-weight: bold;
        }

        .profile-field .value {
          color: #ffffff;
          font-size: 1rem;
        }

        .role-ribbon {
          display: inline-block;
          background: linear-gradient(135deg, #00bfff, #0080ff);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 5px 15px rgba(0, 191, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .role-ribbon.admin {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
        }

        .role-ribbon.owner {
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #333;
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.6);
          border: 2px solid #ffd700;
        }

        .role-ribbon:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 191, 255, 0.6);
        }

        .role-ribbon.admin:hover {
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.6);
        }

        .role-ribbon.owner:hover {
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.8);
        }

        .profile-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .profile-btn {
          background: linear-gradient(135deg, #00bfff, #0080ff);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .profile-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 191, 255, 0.4);
        }

        .profile-btn.logout {
          background: linear-gradient(135deg, #ff4444, #cc0000);
        }

        .profile-btn.logout:hover {
          box-shadow: 0 8px 25px rgba(255, 68, 68, 0.4);
        }

        .profile-loading {
          text-align: center;
          color: #00bfff;
          padding: 2rem;
        }

        .profile-error {
          text-align: center;
          color: #ff4444;
          padding: 2rem;
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
  }

  setupEventListeners() {
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  async open() {
    this.isOpen = true;
    const modal = document.getElementById('user-profile-modal');
    modal.style.display = 'flex';
    
    // Load user profile data
    await this.loadProfileData();
  }

  close() {
    this.isOpen = false;
    const modal = document.getElementById('user-profile-modal');
    modal.style.display = 'none';
  }

  async loadProfileData() {
    const content = document.getElementById('profile-content');
    
    try {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      const memberData = JSON.parse(localStorage.getItem('member_data') || '{}');
      const token = localStorage.getItem('auth_token');

      if (!userData.id) {
        throw new Error('No user data found');
      }

      // If no member data, try to fetch it
      if (!memberData.id && token) {
        const fetchedMemberData = await this.fetchMemberData(userData.id, token);
        if (fetchedMemberData) {
          this.renderProfile(userData, fetchedMemberData);
        } else {
          // Try to create a default member profile
          const createdMemberData = await this.createDefaultMemberProfile(userData.id, token, userData);
          if (createdMemberData) {
            this.renderProfile(userData, createdMemberData);
          } else {
            content.innerHTML = `
              <div class="profile-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>No member profile found for your account.</p>
                <p>Please contact support or try logging out and back in.</p>
              </div>
            `;
          }
        }
      } else {
        this.renderProfile(userData, memberData);
      }

    } catch (error) {
      console.error('Error loading profile:', error);
      content.innerHTML = `
        <div class="profile-error">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Error loading profile data</p>
          <p>Please try refreshing the page or contact support.</p>
        </div>
      `;
    }
  }

  async createDefaultMemberProfile(userId, token, userData) {
    try {
      const response = await fetch('https://lvastudio-production.up.railway.app/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          data: {
            name: userData.username || 'New Member',
            bio: 'Welcome to LVA Studio!',
            ribbon_role: 'Member',
            user: userId
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('member_data', JSON.stringify(result.data));
        console.log('Default member profile created successfully');
        return result.data;
      } else {
        console.error('Failed to create default member profile:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error creating default member profile:', error);
      return null;
    }
  }

  async fetchMemberData(userId, token) {
    try {
      const response = await fetch(`https://lvastudio-production.up.railway.app/api/members?filters[user][id][$eq]=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data && result.data.length > 0) {
          const memberData = result.data[0];
          localStorage.setItem('member_data', JSON.stringify(memberData));
          return memberData;
        } else {
          console.log('No member profile found for user:', userId);
          return null;
        }
      } else if (response.status === 404) {
        console.log('Member profile not found for user:', userId);
        return null;
      } else {
        console.error('Error fetching member data:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching member data:', error);
      return null;
    }
  }

  renderProfile(userData, memberData) {
    const content = document.getElementById('profile-content');
    const role = memberData.ribbon_role || 'Member';
    const isAdmin = role === 'Super Admin' || role === 'Admin' || role === 'Moderator';

    const adminButton = isAdmin ? `
      <a href="admin-dashboard.html" class="profile-btn">
        <i class="fas fa-users-cog"></i> Admin Dashboard
      </a>
    ` : '';

    const roleClickHandler = isAdmin ? `onclick="userProfile.goToAdminDashboard()"` : '';
    const roleClass = role === 'Super Admin' ? 'owner' : (isAdmin ? 'admin' : '');

    content.innerHTML = `
      <div class="profile-info">
        <div class="profile-field">
          <label><i class="fas fa-user"></i> Name</label>
          <div class="value">${memberData.name || userData.username || 'Not provided'}</div>
        </div>
        
        <div class="profile-field">
          <label><i class="fas fa-envelope"></i> Email</label>
          <div class="value">${userData.email || 'Not provided'}</div>
        </div>
        
        <div class="profile-field">
          <label><i class="fas fa-at"></i> Username</label>
          <div class="value">${userData.username || 'Not provided'}</div>
        </div>
        
        <div class="profile-field">
          <label><i class="fas fa-info-circle"></i> Bio</label>
          <div class="value">${memberData.bio || 'No bio provided'}</div>
        </div>
        
        <div class="profile-field">
          <label><i class="fas fa-ribbon"></i> Role</label>
          <div class="value">
            <span class="role-ribbon ${roleClass}" ${roleClickHandler}>
              ${role}
            </span>
          </div>
        </div>
      </div>
      
      <div class="profile-actions">
        ${adminButton}
        <button class="profile-btn logout" onclick="userProfile.logout()">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    `;
  }

  goToAdminDashboard() {
    window.location.href = 'admin-dashboard.html';
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('member_data');
      window.location.href = 'login.html';
    }
  }
}

// Initialize user profile modal
const userProfile = new UserProfileModal();

// Export for global access
window.userProfile = userProfile; 
