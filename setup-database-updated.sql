-- ==========================================
-- 🌱 ASquare Hydroponics - Updated Blog Setup
-- ==========================================
-- Run this entire script in your Supabase SQL Editor
-- This creates an updated schema with content blocks support
-- ==========================================

-- Step 1: Create the blogs table with content blocks support
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content JSONB, -- Store content as structured blocks
  cover_image TEXT,
  category TEXT DEFAULT 'basics',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_is_published ON blogs(is_published);

-- Step 3: Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Step 4: Create policies for blog access
-- Allow public read access for published blogs
DROP POLICY IF EXISTS "Allow public read access for published blogs" ON blogs;
CREATE POLICY "Allow public read access for published blogs"
ON blogs FOR SELECT
USING (is_published = true);

-- Allow anyone to insert new blogs
DROP POLICY IF EXISTS "Allow insert for all users" ON blogs;
CREATE POLICY "Allow insert for all users"
ON blogs FOR INSERT
WITH CHECK (true);

-- Allow anyone to update blogs
DROP POLICY IF EXISTS "Allow update for all users" ON blogs;
CREATE POLICY "Allow update for all users"
ON blogs FOR UPDATE
USING (true);

-- Allow service role to bypass RLS for admin operations
-- This is handled automatically by the service role key

-- Step 5: Update existing blogs to have JSONB content (if they exist)
-- This will convert old text content to the new block format
DO $$
BEGIN
  -- If there are existing blogs with text content, convert them
  IF EXISTS (SELECT 1 FROM blogs WHERE content IS NOT NULL AND content::text != '[]') THEN
    UPDATE blogs
    SET content = CASE
      WHEN content IS NULL THEN '[]'::jsonb
      WHEN content::text != '[]'::text THEN jsonb_build_array(
        jsonb_build_object(
          'id', gen_random_uuid()::text,
          'type', 'text',
          'content', content
        )
      )
      ELSE content
    END
    WHERE content IS NOT NULL AND content::text != '[]';
  END IF;
END
$$;

-- Step 6: Insert sample data with new format
INSERT INTO blogs (title, slug, excerpt, content, category, is_published, published_at)
VALUES
  (
    'Getting Started with Hydroponics',
    'getting-started-hydroponics',
    'Learn the basics of hydroponic gardening and how to start your own system.',
    '[
      {
        "id": "1",
        "type": "heading",
        "content": "Getting Started with Hydroponics",
        "level": 1
      },
      {
        "id": "2",
        "type": "text",
        "content": "Hydroponics is a method of growing plants without soil, using mineral nutrient solutions in an aqueous solvent."
      },
      {
        "id": "3",
        "type": "heading",
        "content": "Benefits of Hydroponics",
        "level": 2
      },
      {
        "id": "4",
        "type": "list",
        "content": '{"ordered": false, "items": ["Water conservation", "Faster growth rates", "Year-round growing", "Space efficiency"]}',
        "ordered": false,
        "items": ["Water conservation", "Faster growth rates", "Year-round growing", "Space efficiency"]
      }
    ]'::jsonb,
    'basics',
    true,
    NOW()
  ),
  (
    'Understanding Nutrient Solutions',
    'understanding-nutrient-solutions',
    'A comprehensive guide to hydroponic nutrients and their importance.',
    '[
      {
        "id": "1",
        "type": "heading",
        "content": "Understanding Nutrient Solutions",
        "level": 1
      },
      {
        "id": "2",
        "type": "text",
        "content": "The right nutrient solution is crucial for healthy hydroponic plants."
      }
    ]'::jsonb,
    'education',
    true,
    NOW()
  ),
  (
    'DIY Hydroponic Systems',
    'diy-hydroponic-systems',
    'Build your own hydroponic system with these step-by-step instructions.',
    '[
      {
        "id": "1",
        "type": "heading",
        "content": "DIY Hydroponic Systems",
        "level": 1
      },
      {
        "id": "2",
        "type": "text",
        "content": "Creating your own hydroponic system can be a rewarding project."
      }
    ]'::jsonb,
    'systems',
    true,
    NOW()
  )
ON CONFLICT (slug) DO NOTHING;