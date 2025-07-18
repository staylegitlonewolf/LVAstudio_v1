// Authentication Configuration
const STRAPI_URL = 'https://lvastudio-production.up.railway.app'; // Change this to your Strapi URL

// Auth State Management
class AuthManager {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
    this.token = localStorage.getItem('auth_token');
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.checkAuthStatus();
  }

  setupEventListeners() {
    // Form navigation
    document.getElementById('signup-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showForm('signup');
    });

    document.getElementById('login-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showForm('login');
    });

    document.getElementById('forgot-password-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showForm('forgot-password');
    });

    document.getElementById('back-to-login-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showForm('login');
    });

    // Form submissions
    document.getElementById('email-login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleEmailLogin();
    });

    document.getElementById('email-signup-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleEmailSignup();
    });

    document.getElementById('reset-password-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handlePasswordReset();
    });
  }

  showForm(formType) {
    const forms = ['login', 'signup', 'forgot-password'];
    forms.forEach(form => {
      const element = document.getElementById(`${form}-form`);
      if (element) {
        element.style.display = form === formType ? 'block' : 'none';
      }
    });
  }

  showLoading(show = true) {
    const loading = document.getElementById('auth-loading');
    const forms = document.querySelectorAll('.auth-form');
    
    if (loading) {
      loading.style.display = show ? 'block' : 'none';
    }
    
    forms.forEach(form => {
      form.style.display = show ? 'none' : form.style.display;
    });
  }

  showMessage(message, type = 'error') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.auth-error, .auth-success');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-${type}`;
    messageDiv.textContent = message;

    // Insert at the top of the current form
    const currentForm = document.querySelector('.auth-form[style*="block"]') || 
                       document.querySelector('.auth-form:not([style*="none"])');
    if (currentForm) {
      currentForm.insertBefore(messageDiv, currentForm.firstChild);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }



  async handleEmailLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      this.showMessage('Please fill in all fields');
      return;
    }

    try {
      this.showLoading(true);
      
      const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password
        })
      });

      const result = await response.json();

      if (response.ok) {
        this.onAuthSuccess(result.user, result.jwt);
      } else {
        this.showMessage(result.error?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Email login error:', error);
      this.showMessage('Login failed. Please check your credentials.');
    } finally {
      this.showLoading(false);
    }
  }

  async handleEmailSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (!name || !email || !password || !confirmPassword) {
      this.showMessage('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      this.showMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      this.showMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      this.showLoading(true);
      
      const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password
        })
      });

      const result = await response.json();

      if (response.ok) {
        this.onAuthSuccess(result.user, result.jwt);
      } else {
        this.showMessage(result.error?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Email signup error:', error);
      this.showMessage('Registration failed. Please try again.');
    } finally {
      this.showLoading(false);
    }
  }

  async handlePasswordReset() {
    const email = document.getElementById('reset-email').value;

    if (!email) {
      this.showMessage('Please enter your email address');
      return;
    }

    try {
      this.showLoading(true);
      
      const response = await fetch(`${STRAPI_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (response.ok) {
        this.showMessage('Password reset link sent to your email', 'success');
        this.showForm('login');
      } else {
        this.showMessage(result.error?.message || 'Failed to send reset link');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      this.showMessage('Failed to send reset link. Please try again.');
    } finally {
      this.showLoading(false);
    }
  }



  async onAuthSuccess(user, token) {
    this.isAuthenticated = true;
    this.user = user;
    this.token = token;
    
    // Store token in localStorage
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    
    // Fetch member profile data
    await this.fetchMemberProfile(user.id, token);
    
    // Show success message
    this.showMessage('Authentication successful! Redirecting...', 'success');
    
    // Redirect to main site after a short delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }

  async fetchMemberProfile(userId, token) {
    try {
      const response = await fetch(`${STRAPI_URL}/api/members?filters[user][id][$eq]=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data && result.data.length > 0) {
          const memberData = result.data[0];
          localStorage.setItem('member_data', JSON.stringify(memberData));
          console.log('Member profile loaded successfully:', memberData);
        } else {
          // No member profile found - this is expected for new users
          console.log('No member profile found for user:', userId);
          // Try to create a default member profile
          await this.createDefaultMemberProfile(userId, token);
        }
      } else if (response.status === 404) {
        // Member profile doesn't exist - this is normal for existing users
        console.log('Member profile not found for user:', userId);
        // Try to create a default member profile
        await this.createDefaultMemberProfile(userId, token);
      } else {
        console.error('Error fetching member profile:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching member profile:', error);
    }
  }

  async createDefaultMemberProfile(userId, token) {
    try {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      const response = await fetch(`${STRAPI_URL}/api/members`, {
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
      } else {
        console.error('Failed to create default member profile:', response.status);
      }
    } catch (error) {
      console.error('Error creating default member profile:', error);
    }
  }

  async checkAuthStatus() {
    if (!this.token) {
      return;
    }

    try {
      const response = await fetch(`${STRAPI_URL}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (response.ok) {
        const user = await response.json();
        this.isAuthenticated = true;
        this.user = user;
      } else {
        this.logout();
      }
    } catch (error) {
      console.error('Auth status check error:', error);
      this.logout();
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    this.token = null;
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // Redirect to login page if not already there
    if (!window.location.pathname.includes('login.html')) {
      window.location.href = 'login.html';
    }
  }
}

// Initialize Auth Manager
const authManager = new AuthManager();



// Export for use in other files
window.authManager = authManager; 
