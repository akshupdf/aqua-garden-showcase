/**
 * Script to add cover images to the 4 blogs that are missing them
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

// Blog updates with appropriate cover images
const blogUpdates = [
  {
    slug: "getting-started-with-hydroponics-beginners-guide",
    title: "Getting Started with Hydroponics: A Beginner's Guide",
    cover_image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=1200&h=600&fit=crop"
  },
  {
    slug: "nft-vs-dwc-choosing-right-hydroponic-system",
    title: "NFT vs DWC: Choosing the Right Hydroponic System",
    cover_image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop"
  },
  {
    slug: "essential-hydroponic-nutrients-complete-guide",
    title: "Essential Hydroponic Nutrients: A Complete Guide",
    cover_image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&h=600&fit=crop"
  },
  {
    slug: "urban-hydroponic-farming-small-spaces",
    title: "Urban Hydroponic Farming: Grow Food in Small Spaces",
    cover_image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&h=600&fit=crop"
  }
];

async function addBlogImages() {
  try {
    console.log('🖼️  Adding cover images to 4 blogs...\n');

    for (const blog of blogUpdates) {
      console.log(`Updating: "${blog.title}"...`);

      const { error } = await supabaseAdmin
        .from('blogs')
        .update({
          cover_image: blog.cover_image,
          updated_at: new Date().toISOString()
        })
        .eq('slug', blog.slug);

      if (error) {
        console.error(`❌ Error updating "${blog.title}":`, error);
      } else {
        console.log(`✅ Updated: "${blog.title}"`);
        console.log(`   Image: ${blog.cover_image}`);
        console.log('');
      }
    }

    console.log('🎉 All 4 blogs now have cover images!');
    console.log('\n📝 Updated Blogs:');
    console.log('1. Getting Started with Hydroponics: A Beginner\'s Guide');
    console.log('2. NFT vs DWC: Choosing the Right Hydroponic System');
    console.log('3. Essential Hydroponic Nutrients: A Complete Guide');
    console.log('4. Urban Hydroponic Farming: Grow Food in Small Spaces');

  } catch (error) {
    console.error('❌ Error adding blog images:', error);
  }
}

addBlogImages();
