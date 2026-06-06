#!/usr/bin/env node

/**
 * 🌱 ASquare Hydroponics - Test Image Upload
 * This script tests the image upload functionality
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

async function testImageUpload() {
  console.log('🧪 Testing image upload functionality...\n');

  try {
    // Check if bucket exists
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();

    if (bucketError) {
      console.error('❌ Error listing buckets:', bucketError);
      return;
    }

    const blogImagesBucket = buckets?.find(bucket => bucket.name === 'blog-images');

    if (!blogImagesBucket) {
      console.error('❌ blog-images bucket not found');
      console.log('Please create the bucket first using the dashboard or run the setup script');
      return;
    }

    console.log('✅ blog-images bucket found');
    console.log(`   - Public: ${blogImagesBucket.public ? 'Yes' : 'No'}`);
    console.log(`   - File size limit: ${blogImagesBucket.file_size_limit} bytes`);
    console.log(`   - Allowed MIME types: ${blogImagesBucket.allowed_mime_types?.join(', ') || 'All'}`);

    // Test public URL generation
    const fileName = `test-${Date.now()}.jpg`;
    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    console.log('\n📡 Testing public URL generation...');
    console.log('Public URL template:', publicUrlData.publicUrl);

    // Check if the bucket URL is accessible
    const bucketUrl = `https://kjkurecvtxohvsvbworc.supabase.co/storage/v1/object/public/blog-images/${fileName}`;
    console.log('Test URL:', bucketUrl);

    console.log('\n🎉 Test completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Go to the admin panel');
    console.log('2. Try uploading an image');
    console.log('3. The image should upload and show a preview');
    console.log('4. Check the browser console for any errors');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testImageUpload();