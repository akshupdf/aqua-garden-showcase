-- ==========================================================
-- 🌱 ASquare Hydroponics - Photo Gallery Setup
-- ==========================================================
-- Run this entire script in your Supabase SQL Editor:
-- 1. Go to your Supabase Dashboard
-- 2. Click on 'SQL Editor' in the left sidebar
-- 3. Click 'New query'
-- 4. Paste this script and click 'Run'
-- ==========================================================

-- Step 1: Create the gallery_images table
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'all',
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT,
  width INT,
  height INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Step 2: Create indexes for fast filtering and ordering
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON public.gallery_images(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery_images(category);

-- Step 3: Enable Row Level Security (RLS)
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Step 4: Allow public read access (any visitor can view photos)
DROP POLICY IF EXISTS "Public can view gallery images" ON public.gallery_images;
CREATE POLICY "Public can view gallery images"
ON public.gallery_images FOR SELECT
USING (true);

-- Step 5: Allow insert, update, delete for authenticated users and service role
DROP POLICY IF EXISTS "Allow manage for all users" ON public.gallery_images;
CREATE POLICY "Allow manage for all users"
ON public.gallery_images FOR ALL
USING (true)
WITH CHECK (true);

-- ==========================================================
-- Storage policies for the gallery-images bucket
-- ==========================================================
-- Allow public read access to all files in gallery-images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public access to gallery-images'
  ) THEN
    CREATE POLICY "Public access to gallery-images" ON storage.objects
    FOR SELECT USING (bucket_id = 'gallery-images');
  END IF;
END $$;

-- Allow insert/upload for all in gallery-images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow upload to gallery-images'
  ) THEN
    CREATE POLICY "Allow upload to gallery-images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'gallery-images');
  END IF;
END $$;

-- Allow delete from gallery-images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow delete from gallery-images'
  ) THEN
    CREATE POLICY "Allow delete from gallery-images" ON storage.objects
    FOR DELETE USING (bucket_id = 'gallery-images');
  END IF;
END $$;
