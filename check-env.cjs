#!/usr/bin/env node

/**
 * Helper script to check environment variables
 * Usage: node check-env.js
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

console.log('🔍 Checking environment variables...\n');

// Check if .env file exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');

  // Read .env file
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');

  // Check each required variable
  const requiredVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY', 'VITE_SUPABASE_SERVICE_ROLE_KEY'];

  requiredVars.forEach(varName => {
    const exists = envLines.some(line =>
      line.startsWith(varName + '=')
    );

    if (exists) {
      const line = envLines.find(l => l.startsWith(varName + '='));
      const value = line.split('=')[1];

      if (varName === 'VITE_SUPABASE_URL') {
        console.log(`✅ ${varName}: ${value}`);
      } else {
        // Hide sensitive keys
        const masked = value.substring(0, 20) + '...';
        console.log(`✅ ${varName}: ${masked}`);
      }
    } else {
      console.log(`❌ ${varName}: NOT FOUND`);
    }
  });

  // Check if service role key is missing (critical for admin operations)
  if (!envLines.some(line => line.startsWith('VITE_SUPABASE_SERVICE_ROLE_KEY='))) {
    console.log('\n⚠️  WARNING: Admin operations may not work properly!');
    console.log('   Get your service role key from:');
    console.log('   Supabase Dashboard → Settings → API');
    console.log('\n📝 Add this to your .env file:');
    console.log('VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here');
  }

} else {
  console.log('❌ .env file not found');
  console.log('\n📋 To create the file:');
  console.log('1. Copy .env.example to .env');
  console.log('2. Update with your Supabase credentials');
  console.log('3. Get credentials from: https://supabase.com/dashboard');
}

console.log('\n🚀 Next steps:');
console.log('1. If missing service role key, add it to .env');
console.log('2. Restart your dev server: npm run dev');
console.log('3. Test admin panel at: http://localhost:8080/admin');