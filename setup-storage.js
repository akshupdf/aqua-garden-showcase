#!/usr/bin/env node

/**
 * 🌱 ASquare Hydroponics - Storage Setup Script
 * This script creates the blog-images storage bucket in Supabase
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

async function createStorageBucket() {
  console.log('🚀 Creating blog-images storage bucket...\n');

  try {
    // Check if bucket already exists
    const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('❌ Error listing buckets:', listError);
      return;
    }

    const bucketExists = existingBuckets?.some(bucket => bucket.name === 'blog-images');

    if (bucketExists) {
      console.log('✅ blog-images bucket already exists');

      // Check if it's public
      const bucket = existingBuckets.find(b => b.name === 'blog-images');
      if (bucket?.public) {
        console.log('✅ Bucket is already public');
      } else {
        console.log('⚠️  Bucket exists but is not public. Please make it public in the Supabase dashboard.');
      }
      return;
    }

    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('blog-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      fileSizeLimit: 5242880, // 5MB
    });

    if (error) {
      console.error('❌ Error creating bucket:', error);
      return;
    }

    console.log('✅ blog-images bucket created successfully!');
    console.log('📋 Bucket configuration:');
    console.log('   - Public: Yes');
    console.log('   - File size limit: 5MB');
    console.log('   - Allowed MIME types: image/jpeg, image/png, image/gif, image/webp');

    // Set up RLS policies
    console.log('\n🔐 Setting up Row Level Security policies...');

    // Policy for public read access
    const { error: publicPolicyError } = await supabase.rpc('exec', {
      sql: `CREATE POLICY IF NOT EXISTS "Public access to blog-images" ON storage.objects
            FOR SELECT USING (bucket_id = 'blog-images');`
    });

    if (publicPolicyError) {
      console.error('❌ Error creating public policy:', publicPolicyError);
    } else {
      console.log('✅ Public access policy created');
    }

    // Policy for authenticated users to upload
    const { error: uploadPolicyError } = await supabase.rpc('exec', {
      sql: `CREATE POLICY IF NOT EXISTS "Authenticated users can upload" ON storage.objects
            FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');`
    });

    if (uploadPolicyError) {
      console.error('❌ Error creating upload policy:', uploadPolicyError);
    } else {
      console.log('✅ Upload policy created');
    }

    console.log('\n🎉 Storage bucket setup complete!');
    console.log('\nNext steps:');
    console.log('1. Restart your development server');
    console.log('2. Try uploading an image in the admin panel');
    console.log('3. The image should now upload and show a preview');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the function
createStorageBucket();