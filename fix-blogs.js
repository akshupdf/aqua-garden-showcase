/**
 * Fix and update blog posts with proper content and images
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const SUPABASE_URL = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];
const SUPABASE_SERVICE_ROLE_KEY = envContent.match(/VITE_SUPABASE_SERVICE_ROLE_KEY=(.+)/)?.[1];

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Get current blogs
async function getCurrentBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(2);

  if (error) throw error;
  return data;
}

// Comprehensive blog content with images
const delayedRainContent = [
  {
    id: "1",
    type: "heading",
    content: "The Growing Crisis of Delayed Monsoons",
    level: 2
  },
  {
    id: "2",
    type: "image",
    content: "https://images.unsplash.com/photo-1506848477530-0b1c2d2d3c4e?w=1200&h=600&fit=crop"
  },
  {
    id: "3",
    type: "text",
    content: "Across agricultural regions, farmers are facing an unprecedented challenge: delayed monsoon rains. What was once a predictable seasonal pattern has become increasingly erratic, with devastating consequences for traditional farming. In 2024 alone, many regions experienced monsoon delays of 3-4 weeks, causing significant crop failures and economic losses for farming communities."
  },
  {
    id: "4",
    type: "text",
    content: "Climate scientists warn that these delays are becoming more frequent and severe. The traditional agricultural calendar, refined over generations, is no longer reliable. Farmers who planted based on historical weather patterns found their crops withering during unexpected dry spells, while those who delayed planting faced shortened growing seasons and reduced yields."
  },
  {
    id: "5",
    type: "heading",
    content: "The Hidden Costs of Unpredictable Weather",
    level: 2
  },
  {
    id: "6",
    type: "text",
    content: "The impact extends far beyond immediate crop losses. Delayed rains create a cascade of problems: increased irrigation costs, higher pest pressure, soil degradation, and mounting debt for farmers who must take loans to survive failed seasons. The psychological toll on farming communities is equally severe, with many questioning the viability of continuing agricultural work that has sustained their families for generations."
  },
  {
    id: "7",
    type: "list",
    content: "",
    ordered: true,
    items: [
      "Increased irrigation costs during unexpected dry periods",
      "Higher susceptibility to pests and diseases due to plant stress",
      "Soil degradation from over-reliance on groundwater",
      "Reduced crop quality and market value",
      "Financial dependency on loans and credit",
      "Loss of traditional farming knowledge effectiveness"
    ]
  },
  {
    id: "8",
    type: "heading",
    content: "Hydroponics: A Weather-Independent Solution",
    level: 2
  },
  {
    id: "9",
    type: "image",
    content: "https://images.unsplash.com/photo-1584133025760-a1ef8d50270b?w=1200&h=600&fit=crop"
  },
  {
    id: "10",
    type: "text",
    content: "Enter hydroponic farming—a revolutionary approach that eliminates dependence on natural rainfall. By growing plants in nutrient-rich water solutions rather than soil, hydroponic systems create completely controlled growing environments. Rain or shine, drought or flood, hydroponic farms maintain consistent production schedules."
  },
  {
    id: "11",
    type: "text",
    content: "The water efficiency of hydroponic systems is particularly compelling during drought conditions. While traditional farming can require over 20,000 liters of water to produce 1 kilogram of tomatoes, hydroponic systems can produce the same yield using just 300-400 liters—a 95% reduction in water usage. This dramatic efficiency means hydroponic farms can thrive even when water is scarce or expensive."
  },
  {
    id: "12",
    type: "heading",
    content: "Real Success Stories from the Field",
    level: 2
  },
  {
    id: "13",
    type: "text",
    content: "Farmers who have adopted hydroponic systems report remarkable resilience during weather challenges. One farmer in a drought-affected region maintained 90% of his usual production while neighbors using traditional methods lost over 60% of their crops. Another established a hydroponic greenhouse that has provided consistent harvests for three years, despite increasingly erratic weather patterns."
  },
  {
    id: "14",
    type: "text",
    content: "These success stories aren't isolated examples. Commercial hydroponic operations worldwide are demonstrating that controlled environment agriculture can provide food security regardless of weather conditions. From rooftop gardens in cities to large-scale vertical farms, hydroponic systems are proving that we don't need to accept food insecurity as inevitable consequence of climate change."
  },
  {
    id: "15",
    type: "heading",
    content: "Making the Transition: Practical Considerations",
    level: 2
  },
  {
    id: "16",
    type: "text",
    content: "For farmers considering the transition to hydroponics, the path requires careful planning but offers substantial rewards. Initial investments in greenhouse infrastructure, growing systems, and training can be significant. However, many farmers find that the returns—both in terms of consistent production and reduced dependency on unpredictable weather—justify the investment."
  },
  {
    id: "17",
    type: "list",
    content: "",
    ordered: true,
    items: [
      "Start small with a pilot system to learn the technology",
      "Focus on high-value crops first for better ROI",
      "Invest in training and education on hydroponic management",
      "Consider cooperative models to share infrastructure costs",
      "Plan for water backup systems even with reduced usage",
      "Research market demand for consistent, high-quality produce"
    ]
  },
  {
    id: "18",
    type: "heading",
    content: "The Future is Climate-Resilient Agriculture",
    level: 2
  },
  {
    id: "19",
    type: "image",
    content: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=600&fit=crop"
  },
  {
    id: "20",
    type: "text",
    content: "As climate change continues to disrupt traditional farming patterns, hydroponics and other controlled environment agriculture methods will become increasingly essential. The technology offers a path to food security that doesn't depend on favorable weather conditions—something that's becoming rarer each year."
  },
  {
    id: "21",
    type: "text",
    content: "The delayed monsoon rains we're experiencing today are likely just the beginning of the climate challenges ahead. By embracing hydroponic farming and other innovative agricultural technologies, we can build a food system that's resilient, efficient, and capable of feeding growing populations regardless of what the weather brings."
  }
];

const yearRoundContent = [
  {
    id: "1",
    type: "heading",
    content: "Breaking Free from Seasonal Limitations",
    level: 2
  },
  {
    id: "2",
    type: "image",
    content: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&h=600&fit=crop"
  },
  {
    id: "3",
    type: "text",
    content: "Traditional farming has always been bound by seasons—plant in spring, harvest in fall, and survive winter's dormancy. But hydroponic farming shatters these ancient limitations, enabling consistent production 12 months a year. This revolutionary approach to agriculture is transforming how we think about food production, making fresh, locally-grown produce available regardless of the calendar."
  },
  {
    id: "4",
    type: "text",
    content: "The secret lies in complete environmental control. Unlike outdoor farming that's at the mercy of weather patterns, temperature fluctuations, and daylight variations, hydroponic systems create optimized growing conditions every single day. When plants receive exactly what they need—light, nutrients, water, and temperature—they don't need to rest or go dormant."
  },
  {
    id: "5",
    type: "heading",
    content: "The Science of Continuous Growing Cycles",
    level: 2
  },
  {
    id: "6",
    type: "text",
    content: "In traditional farming, seasonal changes trigger different growth phases. Shorter days and cooler temperatures signal plants to slow down or enter dormancy. But in hydroponic systems, artificial lighting and climate control eliminate these natural signals. Plants can continue their full growth cycle without interruption, producing harvest after harvest in continuous succession."
  },
  {
    id: "7",
    type: "text",
    content: "This continuous production capability transforms the economics of farming. Instead of one or two harvests per year, hydroponic systems can achieve 8-12 harvest cycles annually. Lettuce that takes 60 days to mature outdoors might be ready in 45 days in optimized hydroponic conditions, allowing for over 8 harvest cycles per year compared to just 2-3 in traditional farming."
  },
  {
    id: "8",
    type: "heading",
    content: "Essential Components for Year-Round Success",
    level: 2
  },
  {
    id: "9",
    type: "image",
    content: "https://images.unsplash.com/photo-1585320806297-9796583766ae?w=1200&h=600&fit=crop"
  },
  {
    id: "10",
    type: "text",
    content: "Successful year-round hydroponic operation requires several key components working together. The most critical is adequate lighting—during winter months when natural daylight is limited, supplemental grow lights ensure plants receive the 12-16 hours of light they need for vigorous growth. Modern LED systems make this energy-efficient and cost-effective."
  },
  {
    id: "11",
    type: "list",
    content: "",
    ordered: true,
    items: [
      "Full-spectrum LED grow lights for consistent lighting",
      "Temperature control systems (heating and cooling)",
      "Humidity management to prevent disease and optimize growth",
      "Automated nutrient delivery systems",
      "Air circulation and ventilation for plant health",
      "Water quality monitoring and management"
    ]
  },
  {
    id: "12",
    type: "heading",
    content: "Seasonal Challenges and Solutions",
    level: 2
  },
  {
    id: "13",
    type: "text",
    content: "While hydroponics eliminates most weather-related problems, each season brings unique considerations. Summer requires managing heat and intense light, while winter demands attention to humidity and reduced natural light. Spring and fall often bring fluctuating conditions that require careful system adjustments."
  },
  {
    id: "14",
    type: "text",
    content: "The key is anticipating these changes and preparing systems accordingly. Successful year-round operators maintain detailed logs of how their systems perform through seasonal transitions, using this data to refine their approaches. Over time, this creates a deep understanding of how to optimize production for every month of the year."
  },
  {
    id: "15",
    type: "heading",
    content: "Crop Selection for Continuous Production",
    level: 2
  },
  {
    id: "16",
    type: "image",
    content: "https://images.unsplash.com/photo-1574943320219-55ed85d9c55b?w=1200&h=600&fit=crop"
  },
  {
    id: "17",
    type: "text",
    content: "Not all crops are equally suited for year-round production, but many thrive in continuous hydroponic systems. Leafy greens like lettuce, spinach, and kale are excellent choices, with fast growth cycles and consistent quality. Herbs such as basil, mint, and cilantro also perform exceptionally well, providing multiple harvests throughout the year."
  },
  {
    id: "18",
    type: "text",
    content: "For more ambitious growers, tomatoes, cucumbers, and peppers can produce year-round in hydroponic systems, though they require more sophisticated support and care. The key is matching crop selection to your system capabilities and market demand. Many operators find success with a rotating mix of crops, ensuring continuous harvests while optimizing returns."
  },
  {
    id: "19",
    type: "heading",
    content: "The Economics of 12-Month Production",
    level: 2
  },
  {
    id: "20",
    type: "text",
    content: "The economic advantages of year-round hydroponic production are substantial. While initial setup costs can be higher than traditional farming, the ability to generate revenue every month dramatically improves cash flow and ROI. Instead of seasonal income spikes followed by fallow periods, hydroponic operators enjoy consistent cash flow that makes business planning and growth much more predictable."
  },
  {
    id: "21",
    type: "text",
    content: "Additionally, year-round production often commands premium prices. In many markets, fresh local produce during winter months is rare and valuable. Hydroponic operators can capture this market segment, building loyal customer relationships based on consistent availability and quality that competitors simply cannot match."
  },
  {
    id: "22",
    type: "heading",
    content: "Building Your Year-Round System",
    level: 2
  },
  {
    id: "23",
    type: "image",
    content: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop"
  },
  {
    id: "24",
    type: "text",
    content: "For those ready to embrace year-round hydroponic production, starting with proper planning is essential. Assess your available space, budget, and target markets. Consider beginning with a smaller system focused on quick-growing crops like lettuce or herbs, allowing you to learn the rhythms of continuous production before scaling up to more complex systems."
  },
  {
    id: "25",
    type: "list",
    content: "",
    ordered: true,
    items: [
      "Start with quick-growing crops for faster learning cycles",
      "Invest in quality environmental control systems",
      "Develop detailed record-keeping for system optimization",
      "Plan for scalability from the beginning",
      "Build relationships with consistent buyers",
      "Prepare for the learning curve of continuous management"
    ]
  },
  {
    id: "26",
    type: "heading",
    content: "The Future of Food is Always in Season",
    level: 2
  },
  {
    id: "27",
    type: "text",
    content: "As we face growing population pressure and climate uncertainty, the ability to produce fresh food 12 months a year becomes increasingly valuable. Hydroponic farming represents more than just an alternative to traditional agriculture—it's a pathway to food security and local food systems that can feed communities regardless of external conditions."
  },
  {
    id: "28",
    type: "text",
    content: "The technology exists today. The knowledge is available. The only question is whether we're ready to embrace a future where fresh, healthy food is available year-round, independent of seasons, weather, or traditional limitations. For hydroponic farmers, that future is already here—and it's producing bountiful harvests every single day of the year."
  }
];

async function fixBlogs() {
  try {
    const blogs = await getCurrentBlogs();

    for (const blog of blogs) {
      console.log(`\n🔧 Fixing: ${blog.title}`);

      let newContent;
      let newCoverImage;

      if (blog.slug.includes('year-round')) {
        newContent = yearRoundContent;
        newCoverImage = "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&h=600&fit=crop";
        console.log('📝 Updated with year-round content (28 blocks + images)');
      } else if (blog.slug.includes('delayed-monsoon')) {
        newContent = delayedRainContent;
        newCoverImage = "https://images.unsplash.com/photo-1506848477530-0b1c2d2d3c4e?w=1200&h=600&fit=crop";
        console.log('📝 Updated with delayed monsoon content (21 blocks + images)');
      } else {
        console.log('⏭️  Skipping this blog');
        continue;
      }

      const { error } = await supabase
        .from('blogs')
        .update({
          content: newContent,
          cover_image: newCoverImage,
          updated_at: new Date().toISOString()
        })
        .eq('id', blog.id);

      if (error) {
        console.error(`❌ Error updating ${blog.title}:`, error.message);
      } else {
        console.log(`✅ Successfully updated ${blog.title}`);
        console.log(`   Content blocks: ${newContent.length}`);
        console.log(`   Images included: ${newContent.filter(b => b.type === 'image').length}`);
        console.log(`   Cover image updated: ✅`);
      }
    }

    console.log('\n🎉 Blog content fixed successfully!');

  } catch (error) {
    console.error('❌ Error fixing blogs:', error.message);
  }
}

fixBlogs();