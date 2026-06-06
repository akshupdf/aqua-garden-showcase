-- ==========================================
-- 🌱 ASquare Hydroponics - Storage Bucket Setup
-- ==========================================
-- Run this entire script in your Supabase SQL Editor
-- This creates the storage bucket for blog images
-- ==========================================

-- Step 1: Create the blog-images storage bucket
-- Note: Storage buckets must be created through the Supabase dashboard or using the storage API
-- SQL cannot create buckets directly, but here's the configuration:

/*
Go to your Supabase Dashboard:
1. Navigate to your project
2. Click on 'Storage' in the left sidebar
3. Click 'New bucket'
4. Enter the following details:
   - Name: blog-images
   - Public bucket: ✅ Checked
   - File size limit: 5 (MB)
   - Allowed MIME types: image/jpeg, image/png, image/gif, image/webp
5. Click 'Create bucket'

After creating the bucket, run the following RLS policies:
*/

-- Step 2: Create Row Level Security policies for the blog-images bucket
-- These policies will allow public read access and authenticated users to upload

-- Allow public read access for all files in blog-images
CREATE POLICY IF NOT EXISTS "Public access to blog-images" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

-- Allow authenticated users to upload files
CREATE POLICY IF NOT EXISTS "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'blog-images'
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their own files
CREATE POLICY IF NOT EXISTS "Authenticated users can update" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'blog-images'
  AND auth.role() = 'authenticated'
  AND (auth.uid() = owner or bucket_owner = auth.uid())
);

-- Allow authenticated users to delete their own files
CREATE POLICY IF NOT EXISTS "Authenticated users can delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'blog-images'
  AND auth.role() = 'authenticated'
  AND (auth.uid() = owner or bucket_owner = auth.uid())
);

-- Step 3: Enable storage bucket for public access
-- This allows the public URL generation to work properly

-- Note: After creating the bucket in the dashboard, you need to:
-- 1. Go to the bucket settings
-- 2. Enable "Make public" option
-- 3. Or set the public bucket option when creating

-- Step 4: Test the bucket creation
-- You can test by running this query after creating the bucket:
/*
SELECT
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE name = 'blog-images';
*/