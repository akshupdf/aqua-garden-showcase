/**
 * 🫀 Supabase Heartbeat Monitor (Dependency-Free)
 * Prevents Free Tier project pausing by sending regular requests
 *
 * This version uses native fetch API - no npm dependencies required!
 */

// Try to load from .env file for local development
let SUPABASE_URL = process.env.VITE_SUPABASE_URL;
let SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

// If not in environment variables, try to load from .env file
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const envPath = path.join(process.cwd(), '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');

    SUPABASE_URL = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];
    SUPABASE_ANON_KEY = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1];
  } catch (error) {
    // .env file not found or not readable
  }
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing required environment variables');
  console.error('Need: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  console.error('Either:');
  console.error('  1. Set environment variables (for GitHub Actions)');
  console.error('  2. Create .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (for local)');
  process.exit(1);
}

async function sendHeartbeat() {
  const timestamp = new Date().toISOString();
  console.log(`🫀 Sending heartbeat to Supabase at ${timestamp}`);

  try {
    // Simple health check using Supabase REST API
    const startTime = Date.now();
    const response = await fetch(`${SUPABASE_URL}/rest/v1/blogs?select=id&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      console.error('❌ Heartbeat failed:', response.status, response.statusText);
      process.exit(1);
    }

    console.log('✅ Heartbeat successful - Supabase project is active');
    console.log(`📊 Response time: ${responseTime}ms`);
    console.log(`🔗 Connected to: ${SUPABASE_URL}`);

  } catch (error) {
    console.error('❌ Heartbeat error:', error.message);
    process.exit(1);
  }
}

// Run the heartbeat
sendHeartbeat();