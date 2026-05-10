#!/usr/bin/env node

/**
 * Helper script to update Supabase environment variables
 * Usage: node update-env.js <your-supabase-url> <your-anon-key>
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

console.log('🔧 Updating Supabase environment variables...\n');

// Get arguments from command line
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('❌ Error: Missing required arguments');
  console.log('\n📖 Usage:');
  console.log('  node update-env.js <your-supabase-url> <your-anon-key>');
  console.log('\n📝 Example:');
  console.log('  node update-env.js https://xxxxx.supabase.co eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
  console.log('\n🌐 Or visit: https://supabase.com to get your credentials\n');
  process.exit(1);
}

const [supabaseUrl, anonKey] = args;

// Validate inputs
if (!supabaseUrl.startsWith('https://')) {
  console.log('❌ Error: Supabase URL must start with https://');
  process.exit(1);
}

console.log('📝 New Credentials:');
console.log('  URL:', supabaseUrl);
console.log('  Key:', anonKey.substring(0, 20) + '...');
console.log('');

// Create new .env content
const envContent = `
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${anonKey}
`;

// Write to .env file
try {
  fs.writeFileSync(envPath, envContent.trim());
  console.log('✅ Successfully updated .env file!');
  console.log('\n🚀 Next steps:');
  console.log('  1. Restart your dev server: npm run dev');
  console.log('  2. Visit: http://localhost:8080/articles');
  console.log('  3. Check browser console for connection status\n');
} catch (error) {
  console.log('❌ Error updating .env file:', error.message);
  process.exit(1);
}
