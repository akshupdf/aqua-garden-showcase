# Admin Panel Setup Guide

## Overview
The admin panel at `/admin` allows you to:
- Create and manage blog posts
- Upload cover images
- Manage blog categories
- Publish/unpublish posts
- Delete posts

## Prerequisites

### 1. Environment Variables
Add these to your `.env` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Storage Bucket Setup
You need to create a `blog-images` bucket in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to Storage > Buckets
3. Click "New bucket"
4. Name: `blog-images`
5. Make it public
6. Set file size limit: 5MB
7. Allowed MIME types: image/jpeg, image/png, image/gif, image/webp

### 3. Database Setup (Optional - for categories)

If you want to create a separate categories table, you can use this SQL:

```sql
CREATE TABLE IF NOT EXISTS blog_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO blog_categories (id, name) VALUES
('basics', 'Hydroponics Basics'),
('education', 'Education & Learning'),
('systems', 'System Guides'),
('maintenance', 'Maintenance Tips'),
('troubleshooting', 'Problem Solving'),
('urban', 'Urban Farming')
ON CONFLICT (id) DO NOTHING;
```

## Features

### Blog Creation
- Title, slug, excerpt
- Category selection (dropdown)
- Cover image upload
- Publish status toggle

### Category Management
- View existing categories
- Add new categories (requires blog_categories table)
- Categories are predefined by default: basics, education, systems, maintenance, troubleshooting, urban

### Image Upload
- File upload with preview
- Automatic placeholder fallback
- 5MB file size limit

### Blog Management
- View all posts
- Publish/unpublish posts
- Delete posts
- Status indicators

## Usage

1. Navigate to `/admin`
2. Fill in the blog creation form
3. Upload a cover image (optional)
4. Choose category and publish status
5. Click "Create Blog Post"
6. Manage existing posts in the list below

## Troubleshooting

### Common Issues

1. **Storage bucket not found**
   - Create the `blog-images` bucket in Supabase dashboard
   - Ensure it's set to public

2. **Image upload fails**
   - Check file size (5MB limit)
   - Verify file type is allowed
   - Use the placeholder as fallback

3. **Categories not editable**
   - Currently using predefined categories
   - Create `blog_categories` table to add/manage dynamically

### API Endpoints

- Create blog: `POST /rest/v1/blogs`
- Get blogs: `GET /rest/v1/blogs`
- Update blog: `PATCH /rest/v1/blogs?id=eq.{id}`
- Delete blog: `DELETE /rest/v1/blogs?id=eq.{id}`

## Security Notes

- The admin panel uses the public anon key
- For enhanced security, consider adding authentication
- Row Level Security (RLS) should be configured for production

## Next Steps

1. Add authentication for admin access
2. Implement image optimization
3. Add rich text editor for blog content
4. Implement blog editing functionality