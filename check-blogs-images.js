/**
 * Script to check all blogs and find which ones don't have cover images
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

async function checkBlogs() {
  try {
    console.log('🔍 Checking all blogs for cover images...\n');

    const { data: blogs, error } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;

    const blogsWithoutImages = blogs.filter(blog => !blog.cover_image || blog.cover_image === '' || blog.cover_image === null);

    console.log(`📊 Total published blogs: ${blogs.length}`);
    console.log(`🖼️  Blogs without cover images: ${blogsWithoutImages.length}\n`);

    if (blogsWithoutImages.length > 0) {
      console.log('Blogs that need cover images:');
      blogsWithoutImages.forEach((blog, index) => {
        console.log(`${index + 1}. "${blog.title}" (${blog.slug})`);
        console.log(`   Category: ${blog.category}`);
        console.log(`   Published: ${blog.published_at}`);
        console.log('');
      });
    } else {
      console.log('✅ All blogs have cover images!');
    }

  } catch (error) {
    console.error('❌ Error checking blogs:', error);
  }
}

checkBlogs();
