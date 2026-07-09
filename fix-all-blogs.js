/**
 * Fix all blogs with double-encoded content
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

// Initialize Supabase admin client
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
  },
});

async function fixAllBlogs() {
  try {
    console.log('🔧 Fixing all blogs with double-encoded content...\n');

    // Get all blogs
    const { data: blogs, error: fetchError } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;
    if (!blogs || blogs.length === 0) {
      console.log('No blogs found');
      return;
    }

    console.log(`Found ${blogs.length} blogs to check\n`);

    let fixedCount = 0;

    for (const blog of blogs) {
      console.log(`Checking: "${blog.title.substring(0, 50)}..."`);

      if (!blog.content) {
        console.log('  ⏭️  No content, skipping\n');
        continue;
      }

      let contentBlocks = blog.content;

      // Parse content if it's a string
      if (typeof contentBlocks === 'string') {
        try {
          contentBlocks = JSON.parse(contentBlocks);
        } catch (e) {
          console.log('  ❌ Cannot parse content, skipping\n');
          continue;
        }
      }

      // Check if content is double-encoded (all content wrapped in single text block)
      if (Array.isArray(contentBlocks) && contentBlocks.length === 1) {
        const firstBlock = contentBlocks[0];

        if (firstBlock.type === 'text' && firstBlock.content) {
          try {
            // Try to parse the content field as JSON
            const innerContent = JSON.parse(firstBlock.content);

            if (Array.isArray(innerContent) && innerContent.length > 0) {
              console.log(`  ✅ Found double-encoded content with ${innerContent.length} actual blocks`);

              // Update the blog with the correct content
              const { error: updateError } = await supabaseAdmin
                .from('blogs')
                .update({
                  content: JSON.stringify(innerContent),
                  updated_at: new Date().toISOString()
                })
                .eq('id', blog.id);

              if (updateError) {
                console.log(`  ❌ Update failed: ${updateError.message}\n`);
              } else {
                console.log(`  ✅ Fixed successfully! ${innerContent.length} content blocks restored\n`);
                fixedCount++;
              }
            }
          } catch (e) {
            console.log('  ⏭️  Content field is not JSON, skipping\n');
          }
        }
      } else {
        console.log('  ⏭️  Content structure looks correct, skipping\n');
      }
    }

    console.log(`\n🎉 Fixed ${fixedCount} blogs successfully!`);

  } catch (error) {
    console.error('❌ Error fixing blogs:', error.message);
    process.exit(1);
  }
}

// Run the fix function
fixAllBlogs();