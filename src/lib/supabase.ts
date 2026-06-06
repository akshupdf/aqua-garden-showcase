import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// Use service role key for admin operations
// Fall back to anon key if service role key is not available
export const supabaseAdmin = (() => {
  if (import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY) {
    return createClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
        },
      }
    );
  } else {
    console.warn("Service role key not found. Using anon key for admin operations (limited permissions).");
    return createClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        },
      }
    );
  }
})();

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
