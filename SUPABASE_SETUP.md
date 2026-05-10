# 🚀 Supabase Setup Guide for ASquare Hydroponics Blog

## Step 1: Create New Supabase Project

1. **Go to**: https://supabase.com
2. **Sign in** to your account
3. **Click**: "New Project"
4. **Fill in project details**:
   - **Name**: `asquare-hydroponics-blog`
   - **Database Password**: (choose a strong password and save it!)
   - **Region**: Choose the region closest to you (e.g., Mumbai)
   - **Pricing Plan**: Free tier is fine for starters

5. **Click**: "Create new project" and wait for it to set up (2-3 minutes)

---

## Step 2: Get Your Project Credentials

Once your project is ready:

1. **Go to**: Project Settings → API
2. **Copy these values**:
   - **Project URL**: Something like `https://xxxxx.supabase.co`
   - **anon public key**: A long JWT token

---

## Step 3: Create the Database Table

Go to the **SQL Editor** in your Supabase dashboard and run this script:

```sql
-- Create the blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT DEFAULT 'basics',
  cover_image TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on published_at for better performance
CREATE INDEX idx_blogs_published_at ON blogs(published_at DESC);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_category ON blogs(category);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access for published blogs
CREATE POLICY "Allow public read access for published blogs"
ON blogs FOR SELECT
USING (is_published = true);

-- Allow anyone to insert (you can restrict this later)
CREATE POLICY "Allow insert for authenticated users"
ON blogs FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow update for authenticated users
CREATE POLICY "Allow update for authenticated users"
ON blogs FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Create a sample blog post (optional)
INSERT INTO blogs (title, slug, excerpt, content, category, is_published, published_at)
VALUES (
  'Welcome to ASquare Hydroponics Blog',
  'welcome-to-asquare-hydroponics-blog',
  'Discover the latest tips, tricks, and insights about hydroponic farming.',
  '## Welcome to Our Blog!

We are excited to share our knowledge about hydroponic farming with you. Stay tuned for:

* **Growing Tips** - Learn the best practices for hydroponic systems
* **System Guides** - Step-by-step tutorials for different setups
* **Troubleshooting** - Solve common problems easily
* **Urban Farming** - Grow fresh food in small spaces

### Why Choose Hydroponics?

Hydroponic farming offers numerous benefits:
- Uses 90% less water than traditional farming
- Faster growth rates
- No soil-borne pests
- Perfect for urban environments

Follow our blog to learn more!',
  'basics',
  true,
  NOW()
);
```

---

## Step 4: Update Environment Variables

Once you have your new Supabase credentials, update the `.env` file:

```env
VITE_SUPABASE_URL=your-new-project-url-here
VITE_SUPABASE_ANON_KEY=your-new-anon-key-here
```

---

## Step 5: Test the Connection

1. **Restart your dev server**: Stop and run `npm run dev` again
2. **Visit**: `http://localhost:8080/articles`
3. **Check browser console**: You should see "✅ Supabase Connection Successful!"

---

## Step 6: Create Your First Blog Post

1. **Visit**: `http://localhost:8080/create-articles`
2. **Fill in the form**:
   - Title: Your blog post title
   - Slug: Auto-generated from title (you can edit)
   - Category: Choose from dropdown
   - Excerpt: Short summary
   - Content: Write in Markdown format

3. **Click**: "Publish"

4. **Check**: Go to `/articles` to see your new blog post!

---

## Troubleshooting

**Q: Getting "Table not found" error?**
A: Make sure you ran the SQL script in Step 3

**Q: Getting "Invalid API key" error?**
A: Double-check your environment variables in `.env` file

**Q: Blog posts not showing up?**
A: Make sure `is_published` is set to `true` in the database

**Q: Can't access /create-articles page?**
A: You might need to adjust RLS policies to allow inserts

---

## Need Help?

If you run into any issues, check the browser console for detailed error messages. The improved error handling will tell you exactly what's wrong!

Happy blogging! 🌱✍️
