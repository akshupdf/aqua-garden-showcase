/**
 * Script to create and publish 2 blog posts:
 * 1. Why Hydroponics is the Future of Agriculture
 * 2. Why Hydroponics Should Be in Office Canteens, Premium Cafes & Big Corporate Clients
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

// Blog Post 1: Why Hydroponics is the Future
const hydroponicsFutureBlog = {
  title: "Why Hydroponics is the Future of Agriculture in 2026",
  slug: "why-hydroponics-is-future-agriculture-2026",
  excerpt: "Discover why hydroponic farming is revolutionizing agriculture in 2026. From water conservation to year-round production, learn how this soil-less growing method is solving modern food challenges.",
  category: "basics",
  is_published: true,
  cover_image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=1200&h=600&fit=crop",
  content: [
    {
      id: "hf-1",
      type: "heading",
      content: "The Agricultural Revolution We've Been Waiting For",
      level: 2
    },
    {
      id: "hf-2",
      type: "text",
      content: "Traditional farming has sustained humanity for millennia, but in 2026, it's facing unprecedented challenges. Climate change, water scarcity, soil degradation, and growing population pressure are pushing conventional agriculture to its limits. Hydroponics—the practice of growing plants without soil—emerges not just as an alternative, but as the necessary evolution of food production."
    },
    {
      id: "hf-3",
      type: "text",
      content: "The global hydroponics market, valued at $12.5 billion in 2025, is projected to reach $25 billion by 2030. This explosive growth isn't driven by trends, but by fundamental agricultural necessities. As arable land shrinks and water becomes scarcer, hydroponic systems offer solutions that traditional farming simply cannot match."
    },
    {
      id: "hf-4",
      type: "heading",
      content: "Water Efficiency: The 95% Solution",
      level: 2
    },
    {
      id: "hf-5",
      type: "text",
      content: "Perhaps the most compelling argument for hydroponics as the future is its extraordinary water efficiency. Traditional agriculture consumes approximately 70% of the world's freshwater resources. Meanwhile, hydroponic systems use 95% less water than conventional farming while producing equal or higher yields."
    },
    {
      id: "hf-6",
      type: "text",
      content: "In drought-prone regions like California, Australia, and India, this water efficiency isn't just advantageous—it's essential. Hydroponic farms recirculate water through closed-loop systems, capturing and reusing water that would otherwise be lost to evaporation or soil absorption. A single hydroponic greenhouse can produce the same yield as a 10-acre traditional farm using just 10% of the water."
    },
    {
      id: "hf-7",
      type: "heading",
      content: "Space Efficiency: Growing Up, Not Out",
      level: 2
    },
    {
      id: "hf-8",
      type: "text",
      content: "Urbanization is consuming agricultural land at alarming rates. By 2050, 68% of the world's population will live in cities, yet traditional farming requires vast horizontal expanses. Hydroponics, particularly vertical farming, transforms this equation by growing upward rather than outward."
    },
    {
      id: "hf-9",
      type: "text",
      content: "A single 1,500 square foot vertical hydroponic farm can produce the equivalent of 5 acres of traditional farmland. This spatial efficiency makes hydroponics perfect for urban environments, bringing food production closer to consumers and reducing the carbon footprint associated with transportation."
    },
    {
      id: "hf-10",
      type: "heading",
      content: "Year-Round Production: Ending Seasonal Scarcity",
      level: 2
    },
    {
      id: "hf-11",
      type: "text",
      content: "Traditional farming operates on nature's calendar—plant in spring, harvest in fall, survive winter's dormancy. Hydroponic systems shatter these limitations, enabling consistent production 365 days a year. Controlled environments eliminate weather dependencies, allowing farmers to deliver fresh produce regardless of season or climate conditions."
    },
    {
      id: "hf-12",
      type: "text",
      content: "This year-round capability transforms food economics. Instead of seasonal income spikes, hydroponic operators enjoy consistent cash flow. Markets that once faced winter scarcity now access fresh local produce year-round, creating stability for both producers and consumers."
    },
    {
      id: "hf-13",
      type: "heading",
      content: "Superior Quality and Nutrition",
      level: 2
    },
    {
      id: "hf-14",
      type: "text",
      content: "Hydroponic systems deliver consistently higher quality produce. By precisely controlling nutrient delivery, pH levels, and environmental conditions, hydroponic plants achieve optimal growth that translates to superior taste, appearance, and nutritional content."
    },
    {
      id: "hf-15",
      type: "text",
      content: "Studies show that hydroponically grown vegetables can contain up to 50% more vitamins and minerals than conventionally grown produce. The absence of soil eliminates soil-borne pathogens and reduces pesticide use, resulting in cleaner, safer food."
    },
    {
      id: "hf-16",
      type: "heading",
      content: "Climate Resilience: Farming Without Weather Risk",
      level: 2
    },
    {
      id: "hf-17",
      type: "text",
      content: "As climate change intensifies, traditional farmers face increasing risks from droughts, floods, unseasonable temperatures, and extreme weather events. A single storm can destroy months of work and investment. Hydroponic farms operate within controlled environments that are insulated from these external threats."
    },
    {
      id: "hf-18",
      type: "text",
      content: "This climate resilience makes hydroponics essential for food security. While traditional farmers lose crops to delayed monsoons or unexpected frosts, hydroponic operations maintain consistent production schedules. The ability to guarantee food supply regardless of weather conditions is invaluable as climate volatility increases."
    },
    {
      id: "hf-19",
      type: "heading",
      content: "Reduced Environmental Impact",
      level: 2
    },
    {
      id: "hf-20",
      type: "text",
      content: "Hydroponic farming dramatically reduces agriculture's environmental footprint. Beyond water conservation, hydroponic systems eliminate agricultural runoff—the primary cause of water pollution from fertilizer and pesticide use. Closed-loop systems capture and reuse nutrients, preventing contamination of waterways."
    },
    {
      id: "hf-21",
      type: "text",
      content: "Hydroponics also eliminates soil degradation, reduces land use pressure, and can be powered by renewable energy. When coupled with solar power, hydroponic farms can operate with near-zero carbon emissions, representing the sustainable future of food production."
    },
    {
      id: "hf-22",
      type: "heading",
      content: "Economic Viability and Scalability",
      level: 2
    },
    {
      id: "hf-23",
      type: "text",
      content: "While initial setup costs for hydroponic systems can be higher than traditional farming, the economic advantages are compelling. Higher yields per square foot, year-round production, reduced water and fertilizer costs, and premium pricing for consistent quality create strong returns on investment."
    },
    {
      id: "hf-24",
      type: "text",
      content: "Small-scale hydroponic operations can be established with minimal investment, while commercial vertical farms are attracting significant venture capital. The technology scales efficiently from home systems to warehouse-sized operations, making hydroponics accessible at every level."
    },
    {
      id: "hf-25",
      type: "heading",
      content: "The Future is Already Here",
      level: 2
    },
    {
      id: "hf-26",
      type: "text",
      content: "Hydroponics isn't some futuristic technology—it's operating successfully today across every scale. From home countertop systems to commercial vertical farms covering acres, hydroponic farming is proving its viability and superiority for modern food production."
    },
    {
      id: "hf-27",
      type: "text",
      content: "As we face growing population pressure, climate uncertainty, and resource constraints, hydroponics offers a proven solution that addresses all these challenges simultaneously. The question isn't whether hydroponics will play a central role in future agriculture—it's how quickly we can scale this technology to feed a growing world on a shrinking planet."
    }
  ]
};

// Blog Post 2: Hydroponics for Corporate Clients
const corporateBlog = {
  title: "Why Your Office Canteen, Café, or Corporate Campus Needs Hydroponics",
  slug: "why-office-canteen-cafe-corporate-needs-hydroponics-2026",
  excerpt: "Discover why leading corporations are installing hydroponic systems in their office canteens, premium cafés, and corporate campuses. From employee wellness to sustainability goals, learn the business case for on-site fresh food production.",
  category: "urban",
  is_published: true,
  cover_image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1200&h=600&fit=crop",
  content: [
    {
      id: "cc-1",
      type: "heading",
      content: "The Corporate Wellness Revolution",
      level: 2
    },
    {
      id: "cc-2",
      type: "text",
      content: "In 2026, leading corporations are discovering that employee wellness extends beyond health insurance and gym memberships. Fresh, nutritious food available daily in office canteens and corporate cafés is becoming a powerful tool for attracting and retaining top talent. Hydroponic systems installed directly in corporate spaces are delivering farm-fresh produce while demonstrating environmental leadership."
    },
    {
      id: "cc-3",
      type: "text",
      content: "Companies like Google, Microsoft, and various Fortune 500 firms have already integrated vertical gardens and hydroponic systems into their campuses. The results speak for themselves: improved employee satisfaction, enhanced corporate image, and measurable contributions to sustainability goals."
    },
    {
      id: "cc-4",
      type: "heading",
      content: "Employee Health and Productivity Benefits",
      level: 2
    },
    {
      id: "cc-5",
      type: "text",
      content: "The connection between nutrition and workplace performance is well-established. Employees with access to fresh, nutrient-dense vegetables report higher energy levels, improved concentration, and better overall health. Hydroponic systems provide daily harvests of leafy greens, herbs, and vegetables that are significantly more nutritious than produce that's traveled thousands of miles."
    },
    {
      id: "cc-6",
      type: "text",
      content: "Corporate wellness programs that incorporate fresh food access see measurable returns. Healthcare costs decrease, sick days reduce, and productivity increases. The psychological benefits of working in environments with living greenery are equally significant—improved air quality, reduced stress levels, and enhanced workplace satisfaction."
    },
    {
      id: "cc-7",
      type: "heading",
      content: "Environmental Leadership and Sustainability",
      level: 2
    },
    {
      id: "cc-8",
      type: "text",
      content: "For corporations committed to sustainability, hydroponic systems offer visible, measurable environmental benefits. Each hydroponic installation demonstrates commitment to reducing carbon footprints, conserving water, and supporting local food systems. These aren't just environmental ideals—they're tangible contributions that employees, customers, and stakeholders can see and appreciate."
    },
    {
      id: "cc-9",
      type: "text",
      content: "The numbers are compelling: a single corporate hydroponic system can save 100,000+ liters of water annually compared to traditional farming, eliminate food miles, and reduce packaging waste. For companies pursuing LEED certification, carbon neutrality goals, or ESG (Environmental, Social, Governance) targets, on-site food production provides measurable, verifiable impact."
    },
    {
      id: "cc-10",
      type: "heading",
      content: "Brand Image and Competitive Advantage",
      level: 2
    },
    {
      id: "cc-11",
      type: "text",
      content: "In competitive industries where differentiation is crucial, hydroponic installations create powerful brand narratives. Companies with living walls, vertical gardens, or hydroponic farms in their cafés and lobbies communicate innovation, environmental consciousness, and employee care more effectively than any marketing campaign."
    },
    {
      id: "cc-12",
      type: "text",
      content: "For premium cafés and restaurants, hydroponic systems provide the ultimate farm-to-table experience. Chefs harvest ingredients minutes before preparation, ensuring flavor and freshness that competitors cannot match. The visual appeal of growing plants creates ambiance and becomes a conversation piece that attracts customers and social media attention."
    },
    {
      id: "cc-13",
      type: "heading",
      content: "Economic Advantages for Big Corporate Clients",
      level: 2
    },
    {
      id: "cc-14",
      type: "text",
      content: "Beyond the environmental and employee benefits, hydroponic systems offer compelling economic returns for large corporate clients. The initial investment is typically recouped within 18-24 months through reduced food purchasing costs, decreased waste, and the operational efficiencies of on-site production."
    },
    {
      id: "cc-15",
      type: "list",
      ordered: true,
      items: [
        "Reduced Food Costs: On-site production eliminates supply chain markups and transportation costs for premium fresh produce.",
        "Waste Reduction: Harvest-on-demand means virtually zero spoilage compared to traditional produce procurement.",
        "Operational Efficiency: Automated systems require minimal maintenance, typically just 2-3 hours weekly.",
        "Tax Benefits: Many jurisdictions offer tax incentives for green infrastructure and sustainable technology investments.",
        "Brand Value: Enhanced corporate image translates to customer loyalty and competitive market positioning."
      ]
    },
    {
      id: "cc-16",
      type: "heading",
      content: "Corporate Social Responsibility (CSR) Impact",
      level: 2
    },
    {
      id: "cc-17",
      type: "text",
      content: "Corporate hydroponic installations provide powerful CSR narratives. They demonstrate commitment to employee health, environmental sustainability, and local food systems—issues that resonate deeply with modern consumers and employees. These initiatives generate positive media coverage and strengthen community relationships."
    },
    {
      id: "cc-18",
      type: "text",
      content: "Many companies extend their hydroponic impact beyond their campuses by donating excess harvest to local food banks or schools, creating additional community benefits and goodwill. The educational value of corporate hydroponics—hosting school visits, providing internships, or offering workshops—further amplifies CSR impact."
    },
    {
      id: "cc-19",
      type: "heading",
      content: "Implementation Models for Every Scale",
      level: 2
    },
    {
      id: "cc-20",
      type: "text",
      content: "Hydroponic systems can be scaled to fit any corporate environment. Small office canteens might feature compact countertop units producing herbs and microgreens. Mid-sized companies can install vertical gardens in lobbies or break rooms. Large corporate campuses can dedicate warehouse spaces to commercial-scale vertical farms."
    },
    {
      id: "cc-21",
      type: "text",
      content: "The technology is modular and scalable. Companies can start small, demonstrate success, and expand based on results. Professional installation services handle design, setup, and ongoing maintenance, requiring minimal corporate resources while delivering maximum impact."
    },
    {
      id: "cc-22",
      type: "heading",
      content: "The Competitive Edge for Premium Establishments",
      level: 2
    },
    {
      id: "cc-23",
      type: "text",
      content: "For premium cafés, restaurants, and corporate dining facilities, hydroponic systems provide the ultimate competitive edge. The ability to offer ingredients harvested just minutes before preparation creates quality that simply cannot be purchased. This freshness translates to superior taste, appearance, and nutritional value that discerning customers immediately recognize and appreciate."
    },
    {
      id: "cc-24",
      type: "text",
      content: "The visual element of growing plants enhances ambiance and creates unique dining environments. Instagram-worthy hydroponic installations become destinations in themselves, driving foot traffic and generating social media buzz that traditional restaurants cannot replicate."
    },
    {
      id: "cc-25",
      type: "heading",
      content: "Food Security and Business Continuity",
      level: 2
    },
    {
      id: "cc-26",
      type: "text",
      content: "Recent global disruptions have highlighted the vulnerability of food supply chains. Corporate hydroponic systems provide a measure of food security, ensuring consistent access to fresh produce regardless of external disruptions. For large corporate campuses feeding thousands of employees daily, this operational resilience is increasingly valuable."
    },
    {
      id: "cc-27",
      type: "text",
      content: "The ability to produce food on-site also provides quality control that external suppliers cannot match. Companies manage the entire process from seed to harvest, ensuring pesticide-free production, optimal freshness, and complete traceability."
    },
    {
      id: "cc-28",
      type: "heading",
      content: "The Future of Corporate Food Service",
      level: 2
    },
    {
      id: "cc-29",
      type: "text",
      content: "As corporations increasingly recognize the interconnected benefits of on-site food production—employee wellness, environmental impact, brand image, and economic returns—hydroponic installations are becoming standard rather than exceptional. The companies leading this trend are gaining competitive advantages in talent attraction, customer loyalty, and market positioning."
    },
    {
      id: "cc-30",
      type: "text",
      content: "The question for corporate decision-makers is no longer whether hydroponics makes business sense—it's which competitors will implement it first. In 2026 and beyond, on-site hydroponic production isn't just an innovative addition to corporate campuses; it's becoming an essential component of forward-thinking business strategy."
    }
  ]
};

async function publishHydroponicsBlogs() {
  try {
    console.log('🚀 Publishing hydroponics blog posts...\n');

    // Check if blog 1 already exists, update or insert
    const { data: existing1 } = await supabaseAdmin
      .from('blogs')
      .select('id')
      .eq('slug', hydroponicsFutureBlog.slug);

    if (existing1 && existing1.length > 0) {
      console.log(`Updating existing blog: "${hydroponicsFutureBlog.title}"...`);
      const { error: err1 } = await supabaseAdmin
        .from('blogs')
        .update({
          ...hydroponicsFutureBlog,
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('slug', hydroponicsFutureBlog.slug);
      if (err1) throw err1;
      console.log('✅ Updated Blog 1 successfully!');
    } else {
      console.log(`Inserting blog: "${hydroponicsFutureBlog.title}"...`);
      const { data: blog1, error: err1 } = await supabaseAdmin
        .from('blogs')
        .insert([{
          ...hydroponicsFutureBlog,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();
      if (err1) throw err1;
      console.log('✅ Blog 1 inserted successfully:', blog1[0].title);
    }

    // Wait a moment between posts
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if blog 2 already exists, update or insert
    const { data: existing2 } = await supabaseAdmin
      .from('blogs')
      .select('id')
      .eq('slug', corporateBlog.slug);

    if (existing2 && existing2.length > 0) {
      console.log(`Updating existing blog: "${corporateBlog.title}"...`);
      const { error: err2 } = await supabaseAdmin
        .from('blogs')
        .update({
          ...corporateBlog,
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('slug', corporateBlog.slug);
      if (err2) throw err2;
      console.log('✅ Updated Blog 2 successfully!');
    } else {
      console.log(`Inserting blog: "${corporateBlog.title}"...`);
      const { data: blog2, error: err2 } = await supabaseAdmin
        .from('blogs')
        .insert([{
          ...corporateBlog,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();
      if (err2) throw err2;
      console.log('✅ Blog 2 inserted successfully:', blog2[0].title);
    }

    console.log('\n🎉 All hydroponics blogs published successfully!');
    console.log('\n📝 Published Blogs:');
    console.log('1. Why Hydroponics is the Future of Agriculture in 2026');
    console.log('2. Why Your Office Canteen, Café, or Corporate Campus Needs Hydroponics');

  } catch (error) {
    console.error('❌ Error publishing hydroponics blogs:', error);
  }
}

publishHydroponicsBlogs();
