#!/usr/bin/env node

/**
 * 🌱 ASquare Hydroponics - Test Database Schema
 * This script checks the current database schema
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
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
  },
});

async function testDatabaseSchema() {
  console.log('🔍 Testing database schema...\n');

  try {
    // Check blogs table structure
    const { data: columns, error: columnsError } = await supabase
      .from('blogs')
      .select('id')
      .limit(1);

    if (columnsError) {
      console.error('❌ Error accessing blogs table:', columnsError);
      return;
    }

    // Get detailed column information
    const { data: blogsInfo, error: blogsInfoError } = await supabase
      .rpc('query', {
        query: `
          SELECT
            column_name,
            data_type,
            is_nullable,
            column_default
          FROM information_schema.columns
          WHERE table_name = 'blogs'
          ORDER BY ordinal_position;
        `
      });

    if (blogsInfoError) {
      // Alternative approach using direct query
      const { data: sampleBlog, error: sampleError } = await supabase
        .from('blogs')
        .select('*')
        .limit(1);

      if (sampleError) {
        console.error('❌ Error fetching sample blog:', sampleError);
        return;
      }

      if (sampleBlog && sampleBlog.length > 0) {
        console.log('📊 Current blogs table columns:');
        Object.keys(sampleBlog[0]).forEach(key => {
          console.log(`   - ${key}: ${typeof sampleBlog[0][key]}`);
        });
      }
    } else {
      console.log('📊 Current blogs table columns:');
      blogsInfo.forEach(column => {
        console.log(`   - ${column.column_name}: ${column.data_type} ${column.is_nullable === 'YES' ? '(nullable)' : '(not null)'} ${column.column_default ? `default: ${column.column_default}` : ''}`);
      });
    }

    // Try to insert a test blog with the current structure
    console.log('\n🧪 Testing blog insertion...');

    const testBlog = {
      title: 'Test Blog',
      slug: 'test-blog',
      excerpt: 'Test excerpt',
      category: 'basics',
      is_published: false,
      content: []
    };

    const { data, error } = await supabase
      .from('blogs')
      .insert([testBlog])
      .select();

    if (error) {
      console.error('❌ Insert error:', error);

      if (error.message.includes('column') && error.message.includes('does not exist')) {
        console.log('\n🔍 Possible missing columns based on error message');
      }
    } else {
      console.log('✅ Test blog created successfully!');
      console.log('Blog ID:', data[0].id);

      // Clean up - delete the test blog
      await supabase
        .from('blogs')
        .delete()
        .eq('id', data[0].id);

      console.log('✅ Test blog deleted');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testDatabaseSchema();