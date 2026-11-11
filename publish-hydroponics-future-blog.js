/**
 * Script to publish the blog post:
 * "Hydroponics: The Future of Food Is Growing Without Soil"
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

const hydroponicsFutureBlog = {
  title: "Hydroponics: The Future of Food Is Growing Without Soil",
  slug: "hydroponics-future-of-food-growing-without-soil",
  excerpt: "Soil has been the foundation of farming for 12,000 years — but it doesn't have to be our future. Discover how hydroponics grows more food with 95% less water, zero pesticides, and no farmland at all, and why it's the key to feeding the next generation.",
  category: "basics",
  is_published: true,
  cover_image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&h=600&fit=crop",
  content: JSON.stringify([
    {
      id: "hp-1",
      type: "heading",
      content: "Farming's Next Chapter Doesn't Need Dirt",
      level: 2
    },
    {
      id: "hp-2",
      type: "text",
      content: "For roughly 12,000 years, the equation of food has been simple: seeds plus soil plus water equals harvest. But that equation is breaking down. Arable land is shrinking, freshwater is becoming scarcer, weather is becoming less predictable, and by 2050 the world will need to feed nearly 10 billion people. The good news? The future of farming no longer requires soil at all."
    },
    {
      id: "hp-3",
      type: "text",
      content: "Hydroponics — the science of growing plants in a nutrient-rich water solution instead of soil — is quietly proving that food can be grown faster, cleaner, and closer to the people who eat it than ever before. What started as a niche technology is rapidly becoming the blueprint for how humanity feeds itself in the decades ahead."
    },
    {
      id: "hp-4",
      type: "image",
      content: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1000&h=550&fit=crop"
    },
    {
      id: "hp-5",
      type: "heading",
      content: "How Plants Grow Without Soil",
      level: 2
    },
    {
      id: "hp-6",
      type: "text",
      content: "Here's the surprising truth: soil was never what plants actually needed. Plants need water, oxygen, nutrients, and light — soil is just the traditional delivery system. In a hydroponic system, roots are suspended in water (or an inert medium like coconut coir) and receive a precisely balanced nutrient solution directly. With nutrients delivered straight to the root zone, plants skip the energy-intensive hunt through soil for food — and reinvest that energy into growth."
    },
    {
      id: "hp-7",
      type: "text",
      content: "The result is remarkable: hydroponic crops grow up to 50% faster than their soil-grown counterparts, yield 20–25% more per area, and can be harvested year-round regardless of season, drought, or frost. Because the environment is controlled, there's no need for pesticides, and no risk of a failed monsoon wiping out the season."
    },
    {
      id: "hp-8",
      type: "heading",
      content: "Why Hydroponics Is the Future, Not a Fad",
      level: 2
    },
    {
      id: "hp-9",
      type: "text",
      content: "Hydroponics isn't a trend chasing attention — it's a direct answer to the three biggest problems facing modern agriculture:"
    },
    {
      id: "hp-10",
      type: "list",
      ordered: false,
      items: [
        "💧 Water: Agriculture consumes about 70% of the world's freshwater. Hydroponic systems recirculate water in closed loops and use up to 95% less than field farming — a single head of lettuce that needs ~100 liters in the field needs just a few liters hydroponically.",
        "🌾 Land: Vertical hydroponic farms stack growing layers upward, producing 10x to 100x more food per square meter. A warehouse the size of a supermarket can out-produce hundreds of acres of farmland — and it can be built in the middle of a city, a desert, or even on Mars-bound spacecraft.",
        "🚚 Distance: Food travels an average of 2,400 km before reaching your plate, losing freshness and emitting carbon along the way. Hydroponics moves farms into cities — into basements, rooftops, offices, and shipping containers — so food is harvested kilometers, or meters, from where it's eaten."
      ]
    },
    {
      id: "hp-11",
      type: "image",
      content: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=1000&h=550&fit=crop"
    },
    {
      id: "hp-12",
      type: "heading",
      content: "The Market Agrees",
      level: 2
    },
    {
      id: "hp-13",
      type: "text",
      content: "The global hydroponics market is projected to roughly double by 2030, driven by water scarcity, urbanization, and rising demand for pesticide-free produce. Major retailers now stock hydroponically grown greens as premium products. Governments from India to the Netherlands to Singapore are funding hydroponic infrastructure as food-security policy. What was experimental a decade ago is now standard practice for the world's most forward-thinking growers."
    },
    {
      id: "hp-14",
      type: "text",
      content: "Technology is accelerating the shift, too. LED lighting has become dramatically more efficient, sensors and automation now manage pH and nutrients with minimal human input, and AI-driven climate control squeezes more yield from less energy every year. Each of these curves is still improving — which means hydroponic farming gets cheaper and more productive with every passing season, while traditional farming faces rising costs and rising risk."
    },
    {
      id: "hp-15",
      type: "heading",
      content: "Where You'll See Hydroponics Next",
      level: 2
    },
    {
      id: "hp-16",
      type: "text",
      content: "The future of hydroponics isn't limited to giant commercial greenhouses. It's spreading into everyday life:"
    },
    {
      id: "hp-17",
      type: "list",
      ordered: true,
      items: [
        "Urban vertical farms: Skyscraper farms and converted warehouses supplying cities with same-day-harvested greens.",
        "Corporate cafés and offices: On-site towers growing herbs and lettuce where employees eat — farm-to-table with zero food miles.",
        "Schools and universities: Hydroponic labs teaching biology, chemistry, and nutrition with living, edible lessons.",
        "Homes and apartments: Countertop units that make fresh basil and salad greens as accessible as tap water.",
        "Harsh climates and space: Desert nations growing their own produce — and space agencies developing hydroponics for missions to the Moon and Mars."
      ]
    },
    {
      id: "hp-18",
      type: "image",
      content: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&h=550&fit=crop"
    },
    {
      id: "hp-19",
      type: "heading",
      content: "Challenges on the Path Forward",
      level: 2
    },
    {
      id: "hp-20",
      type: "text",
      content: "Honesty makes the case stronger: hydroponics isn't a magic bullet. Startup costs are higher than open-field farming, energy use for lighting is significant, and staple crops like wheat and rice aren't yet practical to grow hydroponically at scale. The near-term future of hydroponics is in high-value crops — leafy greens, herbs, microgreens, tomatoes, cucumbers, peppers, and strawberries — while grain farming remains in the field."
    },
    {
      id: "hp-21",
      type: "text",
      content: "But every one of these challenges is an engineering problem, not a biological one — and engineering problems get solved. Energy costs fall with each generation of LEDs, renewable-powered farms are already running at grid parity in sunny regions, and system prices drop as the industry scales."
    },
    {
      id: "hp-22",
      type: "heading",
      content: "The Harvest Is Just Beginning",
      level: 2
    },
    {
      id: "hp-23",
      type: "text",
      content: "The story of agriculture has always been a story of adaptation — from hand tools to tractors to fertilizers to GMOs. Hydroponics is the next great leap: farming decoupled from soil, season, and geography. It puts fresh, pesticide-free food within meters of the people who eat it, using a fraction of the water and none of the land we can't afford to lose."
    },
    {
      id: "hp-24",
      type: "text",
      content: "The future of food won't be grown the way our grandparents grew it. It will be grown in towers of green, lit by efficient LEDs, fed by recirculating water, and harvested steps from your table. The future of food is hydroponic — and it's already growing."
    }
  ])
};

async function publishHydroponicsBlog() {
  try {
    console.log('🚀 Publishing Hydroponics Future blog post...');

    // Check if blog already exists, update or insert
    const { data: existing } = await supabaseAdmin
      .from('blogs')
      .select('id')
      .eq('slug', hydroponicsFutureBlog.slug);

    if (existing && existing.length > 0) {
      console.log(`Updating existing blog: "${hydroponicsFutureBlog.title}"...`);
      const { error } = await supabaseAdmin
        .from('blogs')
        .update({
          ...hydroponicsFutureBlog,
          updated_at: new Date().toISOString()
        })
        .eq('slug', hydroponicsFutureBlog.slug);
      if (error) throw error;
      console.log('✅ Blog updated successfully!');
    } else {
      const { data: blog, error } = await supabaseAdmin
        .from('blogs')
        .insert([{
          ...hydroponicsFutureBlog,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();
      if (error) throw error;
      console.log('✅ Blog inserted successfully!');
      console.log('📝 Title:', blog[0].title);
      console.log('🔗 Slug:', blog[0].slug);
      console.log('📅 Published at:', blog[0].published_at);
    }

    console.log('🎉 Blog is now live!');

  } catch (error) {
    console.error('❌ Error publishing blog:', error);
    process.exit(1);
  }
}

// Run the publishing function
publishHydroponicsBlog();
