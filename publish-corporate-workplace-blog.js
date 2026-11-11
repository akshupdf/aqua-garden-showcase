/**
 * Script to publish the Corporate Café & Workplace Farming blog post:
 * "From Lobby to Lunch Plate: How Corporate Cafés Are Turning Unused Spaces
 * into Fresh, Visible Sustainability Projects"
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

const corporateWorkplaceBlog = {
  title: "From Lobby to Lunch Plate: How Corporate Cafés Are Turning Unused Spaces into Living Sustainability Projects",
  slug: "corporate-cafe-workplace-farming-fresh-herbs-greens",
  excerpt: "Discover how corporate cafés and workplaces are transforming unused corners, rooftops, and lobbies into productive hydroponic farms — growing fresh herbs and greens on-site while turning sustainability into something every employee can see, touch, and taste.",
  category: "urban",
  is_published: true,
  cover_image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=600&fit=crop",
  content: JSON.stringify([
    {
      id: "cw-1",
      type: "heading",
      content: "The Freshest Thing in Your Office Might Soon Be the Wall",
      level: 2
    },
    {
      id: "cw-2",
      type: "text",
      content: "Walk into the most forward-thinking corporate offices of 2026 and you'll notice something unexpected: lush towers of basil beside the espresso machine, walls of living lettuce catching the morning light in the lobby, and employees snipping fresh mint for their tea on their way to a meeting. On-site workplace farming has moved from a novelty to a signature feature of modern corporate campuses — and it's easy to see why."
    },
    {
      id: "cw-3",
      type: "text",
      content: "We help corporate cafés and workplaces grow fresh herbs and greens on-site, turning unused spaces into visible sustainability projects. It's farm-to-table with zero food miles — where the 'farm' is ten steps from the table, and every harvest tells a story your employees and visitors can literally taste."
    },
    {
      id: "cw-4",
      type: "heading",
      content: "Why Workplaces Are Growing Their Own Food",
      level: 2
    },
    {
      id: "cw-5",
      type: "text",
      content: "Corporate food service is under pressure from every direction: rising produce costs, unpredictable supply chains, employees demanding healthier and more sustainable options, and ESG goals that need to be more than a paragraph in an annual report. On-site growing addresses all of these at once — and hydroponics makes it possible anywhere, without soil, sunlight, or agricultural expertise."
    },
    {
      id: "cw-6",
      type: "list",
      ordered: false,
      items: [
        "🥬 Unmatched freshness: Herbs and greens are harvested hours before serving, not days or weeks after being shipped — flavor and nutrition peak on the plate.",
        "🌍 Visible sustainability: A living green wall or hydroponic tower is a daily, tangible proof point of your company's environmental commitment.",
        "💰 Cost control: Growing high-value crops like basil, mint, and specialty lettuce on-site cushions cafés against volatile produce prices.",
        "🌱 Zero food miles: Produce grown in the building travels zero kilometers, slashing packaging waste and transport emissions.",
        "😊 Employee engagement: Harvesting your own lunch garnish is a small moment of joy that connects people to their workplace in a way no perk can.",
        "📊 ESG storytelling: On-site farms generate measurable data — water saved, emissions avoided, harvests logged — perfect for sustainability reports."
      ]
    },
    {
      id: "cw-7",
      type: "heading",
      content: "The Unused Spaces Hiding in Plain Sight",
      level: 2
    },
    {
      id: "cw-8",
      type: "text",
      content: "Every workplace has them: the dead corner near reception, the underused stairwell landing, the stretch of café wall that receives beautiful natural light, the rooftop that's been 'future development space' for a decade. These spaces don't need to be rezoned or renovated to become productive — hydroponic systems are modular, clean, silent, and designed for indoor environments."
    },
    {
      id: "cw-9",
      type: "list",
      ordered: true,
      items: [
        "Café corners and service lines: Vertical towers steps from the kitchen let chefs harvest exactly what they need, exactly when they need it.",
        "Lobbies and reception areas: A living green wall makes a powerful first impression on clients and candidates before a single word is spoken.",
        "Rooftops and terraces: Sunlit rooftops are ideal for larger aeroponic or hydroponic installations that supply entire café operations.",
        "Break rooms and corridors: Compact countertop and wall-mounted units bring greenery — and conversations — into everyday spaces.",
        "Underused meeting rooms: Quiet, climate-controlled rooms with windows double as productive grow spaces with a stunning view."
      ]
    },
    {
      id: "cw-10",
      type: "heading",
      content: "What Grows Best in a Workplace Farm",
      level: 2
    },
    {
      id: "cw-11",
      type: "text",
      content: "The most successful corporate farms focus on high-value, high-turnover crops that cafés use daily and that lose freshness fastest in transit. These are the crops where on-site growing delivers the biggest impact on flavor, cost, and waste:"
    },
    {
      id: "cw-12",
      type: "list",
      ordered: false,
      items: [
        "🌿 Herbs: Basil, mint, cilantro, parsley, dill, and thyme — the workhorses of any café kitchen and the crops with the shortest shelf life when purchased.",
        "🥗 Leafy greens: Butterhead and romaine lettuce, kale, arugula, and spinach for salads harvested at their nutritional peak.",
        "🌱 Microgreens: Pea shoots, radish, broccoli, and sunflower microgreens — ready in 7–14 days and worth 5–10x their seed cost on the plate.",
        "🍅 Compact fruiting crops: Cherry tomatoes and strawberries for a touch of novelty that employees love to watch ripen."
      ]
    },
    {
      id: "cw-13",
      type: "heading",
      content: "How On-Site Hydroponics Actually Works",
      level: 2
    },
    {
      id: "cw-14",
      type: "text",
      content: "Modern workplace farms are built on hydroponics — growing plants in a nutrient-rich water solution instead of soil. The roots receive exactly the water, oxygen, and nutrients they need, which is why hydroponic plants grow up to 50% faster than soil-grown ones while using up to 95% less water. There's no soil to spill, no pesticides required in a controlled indoor environment, and no mess — just clean, quiet, continuously producing greenery."
    },
    {
      id: "cw-15",
      type: "text",
      content: "A typical corporate installation combines vertical growing towers, full-spectrum LED lighting tuned to supplement office light, automated nutrient dosing, and remote monitoring. The systems are designed to run themselves: water levels, pH, and nutrients are managed automatically, with alerts sent if anything needs attention. Most workplace farms need less than one hour of care per week — usually a pleasant task that rotates among team members."
    },
    {
      id: "cw-16",
      type: "heading",
      content: "Sustainability You Can See — and Measure",
      level: 2
    },
    {
      id: "cw-17",
      type: "text",
      content: "The problem with most corporate sustainability initiatives is that they're invisible. LED retrofits and offset purchases happen behind the scenes. An on-site farm is different: it's a daily, living demonstration of commitment. Employees watch lettuce regrow week after week. Visitors ask about the green wall in the lobby. And because hydroponic systems are instrumented, the sustainability story comes with hard numbers:"
    },
    {
      id: "cw-18",
      type: "list",
      ordered: false,
      items: [
        "💧 Water saved versus conventionally farmed produce (typically 90–95% less per kilogram)",
        "🚚 Food miles avoided and associated CO₂ emissions eliminated",
        "📦 Packaging waste eliminated — no plastic clamshells, no bags",
        "🍽️ Food waste reduced — harvest exactly what the kitchen needs, when it needs it",
        "📈 Kilograms harvested, logged and reportable for ESG disclosures"
      ]
    },
    {
      id: "cw-19",
      type: "heading",
      content: "The Employee Engagement Dividend",
      level: 2
    },
    {
      id: "cw-20",
      type: "text",
      content: "Beyond the produce itself, workplace farms have proven to be remarkable engagement tools. Companies report that harvest days become informal social events. Wellness programs integrate 'green minutes' where teams care for the towers. New-hire tours now include the lobby farm. In a hybrid-work era where offices compete to give people a reason to come in, a living farm that feeds everyone is a magnet no yoga room can match."
    },
    {
      id: "cw-21",
      type: "text",
      content: "There's also a subtle but powerful psychological effect: research on biophilic design consistently shows that greenery in the workplace reduces stress and improves cognitive function. A farm delivers those benefits plus a sense of shared purpose — employees aren't just sitting near plants, they're growing food for their community."
    },
    {
      id: "cw-22",
      type: "heading",
      content: "A Realistic Path to ROI",
      level: 2
    },
    {
      id: "cw-23",
      type: "text",
      content: "For a corporate café serving hundreds of meals a week, the economics are compelling. Specialty herbs and microgreens are among the most expensive ingredients per kilogram in any kitchen — and also among the most wasted, since a portion of every purchased bunch spoils before use. On-site growing eliminates spoilage, cuts purchasing costs on the highest-margin ingredients, and turns a cost center (unused space) into a production asset. Most corporate installations reach payback in 18–24 months when produce savings are combined with reduced waste."
    },
    {
      id: "cw-24",
      type: "heading",
      content: "How to Get Started: A Practical Checklist",
      level: 2
    },
    {
      id: "cw-25",
      type: "list",
      ordered: true,
      items: [
        "Audit your spaces: Identify 2–3 unused areas with access to power, water, and (ideally) natural light.",
        "Start with a pilot: One or two vertical towers growing basil, lettuce, and microgreens prove the concept with minimal investment.",
        "Partner with your café team: Let chefs choose the crops they'll actually use — buy-in from the kitchen is everything.",
        "Design for visibility: Place the farm where employees and visitors will see it daily. The visibility IS the value.",
        "Assign light ownership: A rotating 'farm champion' schedule keeps maintenance fun and spreads engagement across teams.",
        "Measure and share: Track harvests, water savings, and waste reduction — then tell the story internally and in your ESG reporting.",
        "Scale what works: Expand to additional spaces and crops based on what your kitchen and employees love most."
      ]
    },
    {
      id: "cw-26",
      type: "heading",
      content: "The Future of Work Is Green — Literally",
      level: 2
    },
    {
      id: "cw-27",
      type: "text",
      content: "The offices people want to return to are the ones that feel alive — and nothing is more alive than food growing where you work. On-site farming transforms unused square footage into fresh produce, turns abstract sustainability goals into something you can harvest with your own hands, and gives your café a story worth telling. The unused corner by the window isn't dead space. It's next quarter's basil."
    },
    {
      id: "cw-28",
      type: "text",
      content: "Ready to turn your workplace into a working farm? Start with one tower, one wall, one harvest — and watch how quickly your people grow along with it."
    }
  ])
};

async function publishCorporateBlog() {
  try {
    console.log('🚀 Publishing Corporate Workplace Farming blog post...');

    // Check if blog already exists, update or insert
    const { data: existing } = await supabaseAdmin
      .from('blogs')
      .select('id')
      .eq('slug', corporateWorkplaceBlog.slug);

    if (existing && existing.length > 0) {
      console.log(`Updating existing blog: "${corporateWorkplaceBlog.title}"...`);
      const { error } = await supabaseAdmin
        .from('blogs')
        .update({
          ...corporateWorkplaceBlog,
          updated_at: new Date().toISOString()
        })
        .eq('slug', corporateWorkplaceBlog.slug);
      if (error) throw error;
      console.log('✅ Blog updated successfully!');
    } else {
      const { data: blog, error } = await supabaseAdmin
        .from('blogs')
        .insert([{
          ...corporateWorkplaceBlog,
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
publishCorporateBlog();
