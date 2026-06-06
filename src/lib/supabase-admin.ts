import { createClient } from "@supabase/supabase-js";

// Use service role key for admin operations
export const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
    },
  }
);

// Storage bucket configuration
export const createBlogImagesBucket = async () => {
  try {
    const { data, error } = await supabaseAdmin.storage.createBucket('blog-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      fileSizeLimit: 5242880, // 5MB
    });

    if (error) {
      console.error('Error creating bucket:', error);
      return false;
    }

    console.log('Bucket created successfully');
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

// Create blog_categories table if it doesn't exist
export const createBlogCategoriesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS blog_categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  try {
    const { data, error } = await supabaseAdmin.rpc('exec_sql', { sql: query });

    if (error) {
      console.error('Error creating table:', error);
      return false;
    }

    console.log('blog_categories table created');
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};