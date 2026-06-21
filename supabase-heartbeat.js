/**
 * 🫀 Supabase Heartbeat Monitor
 * Prevents Free Tier project pausing by sending regular requests
 *
 * Setup Instructions:
 * 1. Create a GitHub repository for your project
 * 2. Add this file to your project
 * 3. Create GitHub Actions workflow (see below)
 * 4. Configure cron schedule (recommend every 6 hours)
 *
 * Alternative: Use services like cron-job.org or uptimerobot.com
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const SUPABASE_URL = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];
const SUPABASE_ANON_KEY = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1];

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing required environment variables in .env file');
  process.exit(1);
}

// Create Supabase client with anon key (safer for heartbeat)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function sendHeartbeat() {
  const timestamp = new Date().toISOString();
  console.log(`🫀 Sending heartbeat to Supabase at ${timestamp}`);

  try {
    // Simple health check - query a lightweight table
    const { data, error } = await supabase
      .from('blogs')
      .select('id')
      .limit(1);

    if (error) {
      console.error('❌ Heartbeat failed:', error.message);
      process.exit(1);
    }

    console.log('✅ Heartbeat successful - Supabase project is active');
    console.log(`📊 Response time: ${Date.now() - new Date(timestamp).getTime()}ms`);

  } catch (error) {
    console.error('❌ Heartbeat error:', error.message);
    process.exit(1);
  }
}

// Run the heartbeat
sendHeartbeat();