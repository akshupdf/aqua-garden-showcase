/**
 * Fix AI Hydroponics blog content format
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

// Fixed AI Hydroponics Blog Content
const aiHydroponicsContent = [
  {
    id: "intro-heading",
    type: "heading",
    content: "The AI Revolution Growing in Your Living Room",
    level: 1
  },
  {
    id: "intro-text",
    type: "text",
    content: "In 2026, the most revolutionary farming technology isn't found in massive fields—it's humming quietly in urban apartments, rooftop gardens, and community centers. AI-driven hydroponics has transformed from experimental tech into the fastest-growing segment of sustainable agriculture, and the numbers are staggering."
  },
  {
    id: "stat-heading",
    type: "heading",
    content: "By the Numbers: The AI Hydroponics Explosion",
    level: 2
  },
  {
    id: "stats-list",
    type: "list",
    ordered: false,
    items: [
      "🎯 Market projected to reach $20 billion by 2035, growing at 22.5% CAGR",
      "💧 Water usage reduced by 90-95% compared to traditional farming",
      "🤖 Labor costs cut by 70% through automated monitoring and feeding",
      "📈 Crop yields increased by 30-50% through AI-optimized nutrient delivery",
      "🏙️ Urban food supply chains shortened by 90%, reducing carbon footprint",
      "⚡ Energy efficiency improved by 60% with smart LED integration"
    ]
  },
  {
    id: "what-is-heading",
    type: "heading",
    content: "What Makes AI-Driven Hydroponics Different?",
    level: 2
  },
  {
    id: "what-is-text",
    type: "text",
    content: "Traditional hydroponics already eliminated soil and reduced water use. But AI-driven systems represent a quantum leap in efficiency and automation. These systems don't just grow plants—they learn, adapt, and optimize in real-time."
  },
  {
    id: "features-heading",
    type: "heading",
    content: "The 6 Game-Changing AI Features for 2026",
    level: 2
  },
  {
    id: "feature-1-heading",
    type: "heading",
    content: "1. Predictive Nutrient Dosing",
    level: 3
  },
  {
    id: "feature-1-text",
    type: "text",
    content: "AI algorithms analyze plant growth patterns, leaf color analysis, and environmental data to predict exactly what nutrients your plants need—often before deficiency symptoms appear. This precision feeding prevents waste and maximizes growth rates."
  },
  {
    id: "feature-2-heading",
    type: "heading",
    content: "2. Computer Vision Disease Detection",
    level: 3
  },
  {
    id: "feature-2-text",
    type: "text",
    content: "Advanced cameras and AI image recognition detect early signs of pests, diseases, or nutrient deficiencies with 95% accuracy—often before human eyes can spot them. This early detection capability can save entire crops from catastrophic loss."
  },
  {
    id: "feature-3-heading",
    type: "heading",
    content: "3. Automated Climate Control",
    level: 3
  },
  {
    id: "feature-3-text",
    type: "text",
    content: "Smart systems continuously monitor temperature, humidity, CO2 levels, and light intensity. AI adjusts these parameters in real-time, creating perfect growing conditions that would be impossible to maintain manually. The system learns your plants' preferences over time."
  },
  {
    id: "feature-4-heading",
    type: "heading",
    content: "4. Growth Cycle Optimization",
    level: 3
  },
  {
    id: "feature-4-text",
    type: "text",
    content: "Machine learning algorithms analyze thousands of data points to optimize light schedules, feeding times, and harvest cycles. Some AI systems have reduced time-to-harvest by 15-20% while simultaneously improving crop quality."
  },
  {
    id: "feature-5-heading",
    type: "heading",
    content: "5. Energy Management Integration",
    level: 3
  },
  {
    id: "feature-5-text",
    type: "text",
    content: "Smart AI systems integrate with renewable energy sources and utility pricing to run energy-intensive operations during optimal times. This can reduce electricity costs by 40-60% while minimizing carbon footprint."
  },
  {
    id: "feature-6-heading",
    type: "heading",
    content: "6. Mobile App Control & Monitoring",
    level: 3
  },
  {
    id: "feature-6-text",
    type: "text",
    content: "Modern AI hydroponic systems are accessible from anywhere. Real-time monitoring, alerts, and manual override controls are available through smartphone apps. Some systems can even be managed entirely through voice commands via smart home integration."
  },
  {
    id: "case-heading",
    type: "heading",
    content: "Real-World Success Stories from 2026",
    level: 2
  },
  {
    id: "case-1-heading",
    type: "heading",
    content: "Brooklyn Micro-Farm: 400 lbs of Produce Monthly",
    level: 3
  },
  {
    id: "case-1-text",
    type: "text",
    content: "A 2026 case study showed how a 500 sq ft Brooklyn apartment equipped with AI-driven vertical hydroponics produces 400 lbs of leafy greens monthly. The system runs on solar power, uses 95% less water than traditional farming, and requires just 2 hours of weekly maintenance."
  },
  {
    id: "case-2-heading",
    type: "heading",
    content: "Singapore Urban Farm: Restaurant Supply Revolution",
    level: 3
  },
  {
    id: "case-2-text",
    type: "text",
    content: "A Singapore restaurant group installed AI hydroponic systems on their rooftops in 2025, now supplying 80% of their herbs and vegetables. Food miles dropped from 2,000 to 2, while quality improved dramatically. ROI was achieved in just 14 months."
  },
  {
    id: "getting-started-heading",
    type: "heading",
    content: "Getting Started with AI Hydroponics in 2026",
    level: 2
  },
  {
    id: "getting-started-text",
    type: "text",
    content: "The barrier to entry has never been lower. Entry-level AI hydroponic systems now start under $500, with mid-range systems ($1,000-3,000) offering professional-level automation. Here's what to look for:"
  },
  {
    id: "checklist-list",
    type: "list",
    ordered: false,
    items: [
      "🔧 Choose systems with proven AI algorithms (avoid experimental tech)",
      "📊 Prioritize data logging and analysis capabilities",
      "🔒 Look for robust security features (these are IoT devices)",
      "📱 Ensure mobile app integration and remote monitoring",
      "🌱 Select systems with active user communities and support",
      "⚡ Consider energy efficiency ratings and renewable integration",
      "📈 Start with proven crops: lettuce, herbs, leafy greens, tomatoes"
    ]
  },
  {
    id: "future-heading",
    type: "heading",
    content: "The Future is Automated: What's Next for AI Hydroponics?",
    level: 2
  },
  {
    id: "future-text",
    type: "text",
    content: "The next wave of AI hydroponic innovation is already emerging: swarm robotics for pollination, advanced genetic optimization through machine learning, and community-scale automated micro-farms. By 2030, experts predict AI-managed urban farms could supply 15-20% of global produce demand."
  },
  {
    id: "conclusion-heading",
    type: "heading",
    content: "The Time to Embrace AI-Driven Growing is Now",
    level: 2
  },
  {
    id: "conclusion-text",
    type: "text",
    content: "AI-driven hydroponics isn't just about growing plants—it's about growing them smarter, faster, and more sustainably than ever before. Whether you're a home grower, urban farmer, or commercial producer, the automation revolution is here. The question isn't whether AI will transform agriculture—it's whether you'll be ahead of the curve or playing catch-up."
  }
];

async function fixAIBlog() {
  try {
    console.log('🔧 Fixing AI-Driven Hydroponics blog content...');

    // Get the AI blog
    const { data: blogs, error: fetchError } = await supabaseAdmin
      .from('blogs')
      .select('*')
      .eq('slug', 'ai-driven-hydroponics-smart-automation-urban-farming-2026');

    if (fetchError) throw fetchError;
    if (!blogs || blogs.length === 0) {
      console.error('❌ AI hydroponics blog not found');
      process.exit(1);
    }

    const blog = blogs[0];
    console.log(`📝 Found blog: "${blog.title}"`);

    // Update the content with proper JSON array format
    const { error: updateError } = await supabaseAdmin
      .from('blogs')
      .update({
        content: aiHydroponicsContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', blog.id);

    if (updateError) throw updateError;

    console.log('✅ AI-Driven Hydroponics blog content fixed successfully!');
    console.log(`📊 Content blocks: ${aiHydroponicsContent.length}`);
    console.log(`🎯 Headings: ${aiHydroponicsContent.filter(b => b.type === 'heading').length}`);
    console.log(`📝 Text blocks: ${aiHydroponicsContent.filter(b => b.type === 'text').length}`);
    console.log(`📋 Lists: ${aiHydroponicsContent.filter(b => b.type === 'list').length}`);
    console.log('');
    console.log('🎉 Blog content is now properly formatted and ready to display!');

  } catch (error) {
    console.error('❌ Error fixing blog:', error.message);
    process.exit(1);
  }
}

// Run the fix function
fixAIBlog();