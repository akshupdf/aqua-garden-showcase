/**
 * Check published blog content
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const SUPABASE_URL = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];
const SUPABASE_SERVICE_ROLE_KEY = envContent.match(/VITE_SUPABASE_SERVICE_ROLE_KEY=(.+)/)?.[1];

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkBlogs() {
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2);

    if (error) throw error;

    console.log('📋 Latest 2 Blogs:\n');

    blogs.forEach((blog, index) => {
      console.log(`\n${index + 1}. ${blog.title}`);
      console.log(`   URL: ${blog.slug}`);
      console.log(`   Category: ${blog.category}`);
      console.log(`   Published: ${blog.is_published ? 'Yes' : 'No'}`);
      console.log(`   Cover Image: ${blog.cover_image ? '✅ Yes' : '❌ No'}`);
      console.log(`   Excerpt: ${blog.excerpt?.substring(0, 100)}...`);

      if (blog.content) {
        if (Array.isArray(blog.content)) {
          console.log(`   Content Blocks: ${blog.content.length} blocks`);
          console.log(`   Block Types: ${blog.content.map(b => b.type).join(', ')}`);
        } else {
          console.log(`   Content: ${typeof blog.content} (${JSON.stringify(blog.content).substring(0, 100)}...)`);
        }
      } else {
        console.log(`   Content: ❌ No content blocks`);
      }

      console.log(`   Created: ${blog.created_at}`);
    });

  } catch (error) {
    console.error('❌ Error checking blogs:', error.message);
  }
}

checkBlogs();