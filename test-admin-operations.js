#!/usr/bin/env node

/**
 * 🌱 ASquare Hydroponics - Test Admin Operations
 * This script tests the operations that the admin panel performs
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

// Create Supabase client with service role key
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
  },
});

async function testAdminOperations() {
  console.log('🚀 Testing admin operations...\n');

  try {
    // Test 1: Create a new blog
    console.log('Test 1: Creating a new blog...');
    const newBlog = {
      title: 'Test Admin Blog',
      slug: 'test-admin-blog',
      excerpt: 'This is a test blog created via admin operations',
      category: 'basics',
      is_published: false,
      content: []
    };

    const { data: createdBlog, error: createError } = await supabaseAdmin
      .from('blogs')
      .insert([newBlog])
      .select();

    if (createError) {
      console.error('❌ Create error:', createError);
      return;
    }

    console.log('✅ Blog created successfully:', createdBlog[0].id);

    // Test 2: Update the blog
    console.log('\nTest 2: Updating the blog...');
    const updatedData = {
      title: 'Updated Test Admin Blog',
      excerpt: 'This blog has been updated',
      is_published: true,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: updatedBlog, error: updateError } = await supabaseAdmin
      .from('blogs')
      .update(updatedData)
      .eq('id', createdBlog[0].id)
      .select();

    if (updateError) {
      console.error('❌ Update error:', updateError);
      return;
    }

    console.log('✅ Blog updated successfully');

    // Test 3: Toggle publish status
    console.log('\nTest 3: Toggling publish status...');
    const { data: toggledBlog, error: toggleError } = await supabaseAdmin
      .from('blogs')
      .update({
        is_published: false,
        published_at: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', createdBlog[0].id)
      .select();

    if (toggleError) {
      console.error('❌ Toggle error:', toggleError);
      return;
    }

    console.log('✅ Publish status toggled successfully');

    // Test 4: Delete the blog
    console.log('\nTest 4: Deleting the blog...');
    const { error: deleteError } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', createdBlog[0].id);

    if (deleteError) {
      console.error('❌ Delete error:', deleteError);
      return;
    }

    console.log('✅ Blog deleted successfully');

    console.log('\n🎉 All admin operations test passed!');
    console.log('The admin panel should now work correctly.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testAdminOperations();