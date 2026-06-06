-- ==========================================
-- 🌱 ASquare Hydroponics - Storage RLS Policies
-- ==========================================
-- Run this script in your Supabase SQL Editor after creating the bucket
-- ==========================================

-- Policy for public read access to blog-images
DROP POLICY IF EXISTS "Public access to blog-images" ON storage.objects;
CREATE POLICY "Public access to blog-images"
ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

-- Policy for authenticated users to upload files
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
CREATE POLICY "Authenticated users can upload"
ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'blog-images'
  AND auth.role() = 'authenticated'
);

-- Policy for authenticated users to update their own files
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
CREATE POLICY "Authenticated users can update"
ON storage.objects
FOR UPDATE USING (
  bucket_id = 'blog-images'
  AND auth.role() = 'authenticated'
  AND (auth.uid() = owner or bucket_owner = auth.uid())
);

-- Policy for authenticated users to delete their own files
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
CREATE POLICY "Authenticated users can delete"
ON storage.objects
FOR DELETE USING (
  bucket_id = 'blog-images'
  AND auth.role() = 'authenticated'
  AND (auth.uid() = owner or bucket_owner = auth.uid())
);

-- Grant service role access for admin operations
GRANT ALL ON storage.objects IN STORAGE_BUCKET blog-images TO authenticated WITH GRANT OPTION;
GRANT ALL ON storage.objects IN STORAGE_BUCKET blog-images TO service_role WITH GRANT OPTION;