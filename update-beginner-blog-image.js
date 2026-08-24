/**
 * Script to update the cover image for the beginner's guide blog
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const SUPABASE_URL = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];
const SUPABASE_SERVICE_ROLE_KEY = envContent.match(/VITE_SUPABASE_SERVICE_ROLE_KEY=(.+)/)?.[1];

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables in .env file');
  process.exit(1);
}

// Initialize Supabase admin client
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
  },
});

async function updateBeginnerBlogImage() {
  try {
    console.log('🖼️  Updating cover image for beginner\'s guide blog...\n');

    const { error } = await supabaseAdmin
      .from('blogs')
      .update({
        cover_image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=1200&h=600&fit=crop',
        updated_at: new Date().toISOString()
      })
      .eq('slug', 'getting-started-with-hydroponics-beginners-guide');

    if (error) {
      console.error('❌ Error updating blog image:', error);
    } else {
      console.log('✅ Successfully updated beginner\'s guide blog image!');
      console.log('📝 Blog: Getting Started with Hydroponics: A Beginner\'s Guide');
      console.log('🖼️  New Image: https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=1200&h=600&fit=crop');
      console.log('\n💡 This image shows hands working with plants in a greenhouse setting, perfect for demonstrating the learning and hands-on aspect of hydroponics without showing faces.');
    }

  } catch (error) {
    console.error('❌ Error updating beginner blog image:', error);
  }
}

updateBeginnerBlogImage();
