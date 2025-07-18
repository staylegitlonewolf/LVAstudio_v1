const crypto = require('crypto');

console.log('🔐 Generating Security Keys for Railway Deployment\n');

// Generate APP_KEYS (4 keys)
const appKeys = [];
for (let i = 0; i < 4; i++) {
  appKeys.push(crypto.randomBytes(32).toString('base64'));
}

// Generate other secrets
const adminJwtSecret = crypto.randomBytes(32).toString('base64');
const apiTokenSalt = crypto.randomBytes(16).toString('base64');
const transferTokenSalt = crypto.randomBytes(16).toString('base64');
const jwtSecret = crypto.randomBytes(32).toString('base64');

console.log('📋 Copy these values to your Railway environment variables:\n');

console.log('APP_KEYS=' + appKeys.join(','));
console.log('ADMIN_JWT_SECRET=' + adminJwtSecret);
console.log('API_TOKEN_SALT=' + apiTokenSalt);
console.log('TRANSFER_TOKEN_SALT=' + transferTokenSalt);
console.log('JWT_SECRET=' + jwtSecret);

console.log('\n✅ All security keys generated successfully!');
console.log('\n📝 Next steps:');
console.log('1. Copy these values to your Railway dashboard');
console.log('2. Make sure to set DATABASE_CLIENT=postgres');
console.log('3. Set your PostgreSQL DATABASE_URL from Railway');
console.log('4. Deploy with: railway up'); 