# Rich Blog Editor Features

## Overview
This update introduces a powerful, block-based blog editor that allows for flexible content creation with different types of content blocks.

## Features

### 1. Content Block Types
- **Heading Blocks**: Create H1-H6 headings with customizable levels
- **Text Blocks**: Add paragraphs with multi-line text support
- **Image Blocks**: Upload and display images with Supabase Storage integration
- **List Blocks**: Create both bulleted and numbered lists with multiple items

### 2. Block Management
- **Add Blocks**: Click toolbar buttons to add new content blocks
- **Remove Blocks**: Click the × button on any block to remove it
- **Reorder Blocks**: Use ↑/↓ buttons to move blocks up or down
- **Flexible Ordering**: Blocks can be arranged in any order

### 3. Image Upload
- **Automatic Upload**: Images are uploaded to Supabase Storage
- **Fallback**: Uses placeholder images if upload fails
- **Preview**: See uploaded images in real-time
- **5MB Limit**: Maximum file size for images

### 4. Content Storage
- **JSON Format**: Content is stored as structured JSON in the database
- **Backward Compatible**: Existing posts with text content are converted to block format
- **Flexible Structure**: Supports mixed content types in a single post

## Database Schema Update

The `blogs` table has been updated to store content as JSONB:

```sql
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content JSONB,  -- New: Store content blocks
  cover_image TEXT,
  category TEXT DEFAULT 'basics',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Content Block Structure

Each content block follows this structure:

```json
{
  "id": "unique-id",
  "type": "heading|text|image|list",
  "content": "block content",
  "level": 2,  // For headings
  "ordered": false,  // For lists
  "items": ["item1", "item2"]  // For lists
}
```

## Usage

1. **Creating New Posts**: Use the admin panel at `/admin`
2. **Adding Content**: Click the toolbar buttons to add different block types
3. **Editing Content**: Click on any block to edit its content
4. **Saving**: The content is automatically structured and saved
5. **Viewing**: Posts are rendered at `/articles/:slug`

## Migration

If you have existing posts, the system will:
1. Convert text content to text blocks automatically
2. Maintain existing categories and metadata
3. Preserve publish status and dates

## Requirements

1. **Supabase Storage**: Ensure the `blog-images` bucket exists
2. **Database Schema**: Run `setup-database-updated.sql` in your Supabase SQL Editor
3. **Environment Variables**: Make sure Supabase keys are properly configured

## Security

- All image uploads go through Supabase Storage
- Content is stored as JSONB for data integrity
- Row Level Security (RLS) policies are in place
- Published posts are publicly readable; drafts are private

## Future Enhancements

- Rich text formatting within blocks
- Video embed support
- Code block syntax highlighting
- Drag and drop reordering
- Block templates for common layouts