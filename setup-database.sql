-- ==========================================
-- 🌱 ASquare Hydroponics - Complete Blog Setup
-- ==========================================
-- Run this entire script in your Supabase SQL Editor
-- This will create tables, schemas, policies, and sample data
-- ==========================================

-- Step 1: Create the blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT DEFAULT 'basics',
  cover_image TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_is_published ON blogs(is_published);

-- Step 3: Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Step 4: Create policies for blog access
-- Allow public read access for published blogs
DROP POLICY IF EXISTS "Allow public read access for published blogs" ON blogs;
CREATE POLICY "Allow public read access for published blogs"
ON blogs FOR SELECT
USING (is_published = true);

-- Allow anyone to insert new blogs
DROP POLICY IF EXISTS "Allow insert for all users" ON blogs;
CREATE POLICY "Allow insert for all users"
ON blogs FOR INSERT
WITH CHECK (true);

-- Allow anyone to update blogs
DROP POLICY IF EXISTS "Allow update for all users" ON blogs;
CREATE POLICY "Allow update for all users"
ON blogs FOR UPDATE
USING (true);

-- Step 5: Insert sample blog posts
INSERT INTO blogs (title, slug, excerpt, content, category, is_published, published_at) VALUES
(
  'Getting Started with Hydroponics: A Beginner''s Guide',
  'getting-started-with-hydroponics-beginners-guide',
  'Learn the basics of hydroponic farming and how to start your first soil-free garden at home.',
  '## Getting Started with Hydroponics: A Beginner''s Guide

Hydroponic farming is revolutionizing the way we grow food, especially in urban environments where space is limited. This guide will help you understand the basics and start your hydroponic journey.

### What is Hydroponics?

Hydroponics is a method of growing plants without soil, using nutrient-rich water solutions instead. This technique allows you to grow plants faster, using less water and space than traditional farming.

### Benefits of Hydroponic Farming

- **Water Efficiency**: Uses up to 90% less water than traditional farming
- **Faster Growth**: Plants grow 30-50% faster due to optimal nutrient delivery
- **Space Saving**: Perfect for urban environments and small spaces
- **No Soil-Borne Pests**: Reduces the need for pesticides
- **Year-Round Growing**: Control your growing environment completely

### Basic Hydroponic Systems

There are several types of hydroponic systems suitable for beginners:

1. **Deep Water Culture (DWC)**: Plants float in nutrient solution
2. **Nutrient Film Technique (NFT)**: Thin film of nutrient solution flows over roots
3. **Ebb and Flow**: Periodic flooding and draining of grow tray
4. **Drip System**: Nutrient solution dripped onto growing medium

### Getting Started

To start your hydroponic journey, you''ll need:
- A suitable hydroponic system
- Growing medium (rockwool, clay pebbles, etc.)
- Nutrient solution
- pH testing kit
- Grow lights (if growing indoors)
- Quality seeds or seedlings

Stay tuned for more detailed guides on each system type!',
  'basics',
  true,
  NOW()
),
(
  'NFT vs DWC: Choosing the Right Hydroponic System',
  'nft-vs-dwc-choosing-right-hydroponic-system',
  'Compare two popular hydroponic systems to find the best fit for your space and growing goals.',
  '## NFT vs DWC: Choosing the Right Hydroponic System

When starting your hydroponic journey, choosing the right system is crucial for success. Let''s compare two popular options: Nutrient Film Technique (NFT) and Deep Water Culture (DWC).

### Deep Water Culture (DWC)

**How it works:** Plants are suspended in a net pot with their roots submerged in oxygenated nutrient solution.

**Pros:**
- Simple and inexpensive to build
- Excellent for beginners
- Low maintenance
- Rapid plant growth
- Great for leafy greens and herbs

**Cons:**
- Limited plant variety
- Requires good oxygenation
- Water temperature control needed

**Best for:** Lettuce, spinach, basil, and other leafy greens

### Nutrient Film Technique (NFT)

**How it works:** A thin film of nutrient solution continuously flows over the plant roots in a sloped channel.

**Pros:**
- Water efficient
- Professional appearance
- Good for commercial setups
- Easy to expand
- Excellent oxygenation

**Cons:**
- More complex to build
- Pump failure can be catastrophic
- Requires precise slope
- Regular maintenance needed

**Best for:** Lettuce, strawberries, herbs, and small vegetables

### Making Your Choice

**Choose DWC if you:**
- Are new to hydroponics
- Want a simple, forgiving system
- Have limited space
- Plan to grow leafy greens

**Choose NFT if you:**
- Have some hydroponic experience
- Want a scalable system
- Plan to grow commercially
- Prefer a professional setup

Both systems can produce excellent results when properly maintained. Consider your space, experience level, and growing goals when making your decision!',
  'systems',
  true,
  NOW() - INTERVAL '1 day'
),
(
  'Essential Hydroponic Nutrients: A Complete Guide',
  'essential-hydroponic-nutrients-complete-guide',
  'Understanding plant nutrition for healthy hydroponic growth. Learn about macro and micronutrients your plants need.',
  '## Essential Hydroponic Nutrients: A Complete Guide

Successful hydroponic farming depends heavily on providing the right nutrients to your plants. Unlike soil, where nutrients are naturally present, hydroponic systems require precise nutrient management.

### Macronutrients

Plants need six essential macronutrients in large quantities:

#### Primary Macronutrients
- **Nitrogen (N)**: Essential for leaf and stem growth
  - Deficiency: Yellowing leaves, stunted growth
  - Sources: Calcium nitrate, potassium nitrate

- **Phosphorus (P)**: Crucial for root development and flowering
  - Deficiency: Purple leaves, poor root growth
  - Sources: Monopotassium phosphate, ammonium phosphate

- **Potassium (K)**: Important for overall plant health
  - Deficiency: Brown leaf edges, weak stems
  - Sources: Potassium sulfate, potassium nitrate

#### Secondary Macronutrients
- **Calcium (Ca)**: Cell wall structure and root development
- **Magnesium (Mg)**: Chlorophyll production
- **Sulfur (S)**: Protein synthesis

### Micronutrients

Required in smaller quantities but equally important:
- **Iron (Fe)**: Chlorophyll synthesis
- **Manganese (Mn)**: Enzyme activation
- **Zinc (Zn)**: Growth hormones
- **Boron (B)**: Cell wall formation
- **Copper (Cu)**: Photosynthesis
- **Molybdenum (Mo)**: Nitrogen fixation

### Nutrient Solution Management

**EC Levels (Electrical Conductivity):**
- Seedlings: 0.8-1.2 mS/cm
- Vegetative stage: 1.2-1.8 mS/cm
- Flowering/fruiting: 1.8-2.5 mS/cm

**pH Levels:**
- Most plants: 5.5-6.5
- Blueberries: 4.5-5.5
- Orchids: 5.5-6.0

**Temperature:**
- Nutrient solution: 18-22°C
- Root zone: 18-24°C

### Common Nutrient Problems

**Nutrient Burn:**
- Symptoms: Brown, crispy leaf tips
- Cause: Over-fertilization
- Solution: Flush with plain water

**Nutrient Lockout:**
- Symptoms: Nutrient deficiencies despite adequate feeding
- Cause: Incorrect pH levels
- Solution: Adjust pH to proper range

**Deficiency Symptoms:**
- Nitrogen: Yellow leaves, purple stems
- Phosphorus: Dark green leaves with purple tints
- Potassium: Brown leaf edges
- Calcium: Blossom end rot in tomatoes

### Best Practices

1. **Use quality nutrients**: Invest in reputable hydroponic nutrient brands
2. **Monitor regularly**: Check EC and pH levels daily
3. **Change solution**: Replace nutrient solution every 1-2 weeks
4. **Keep records**: Track nutrient schedules and plant responses
5. **Start light**: Begin with half-strength nutrients for seedlings

Proper nutrition is the key to successful hydroponic farming. Monitor your plants closely and adjust nutrient levels as needed for optimal growth!',
  'education',
  true,
  NOW() - INTERVAL '2 days'
),
(
  'Troubleshooting Common Hydroponic Problems',
  'troubleshooting-common-hydroponic-problems',
  'Solve common issues in hydroponic farming with this practical troubleshooting guide for growers.',
  '## Troubleshooting Common Hydroponic Problems

Even experienced hydroponic growers encounter problems. This guide will help you identify and solve common issues before they become major problems.

### Root Problems

**Root Rot:**
*Symptoms:*
- Brown, slimy roots
- Foul odor from nutrient solution
- Wilting plants
- Yellowing leaves

*Causes:*
- Poor oxygenation
- High water temperature
- Overcrowding
- Contaminated equipment

*Solutions:*
- Improve aeration with air stones
- Maintain water temperature below 22°C
- Use hydrogen peroxide (3%) to treat affected roots
- Ensure proper spacing between plants

**Root Bound:**
*Symptoms:*
- Stunted growth
- Roots growing out of net pots
- Nutrient deficiency signs

*Solutions:*
- Transplant to larger containers
- Prune roots carefully
- Use appropriate pot size from the start

### Nutrient Issues

**Nutrient Burn:**
*Symptoms:*
- Brown, crispy leaf tips
- Yellowing between leaf veins
- Curling leaves

*Causes:*
- Over-fertilization
- EC levels too high
- Salt buildup

*Solutions:*
- Flush system with plain water
- Reduce nutrient concentration
- Monitor EC levels regularly

**Nutrient Deficiency:**
*Symptoms:*
- Yellowing leaves (nitrogen deficiency)
- Purple leaves (phosphorus deficiency)
- Brown leaf edges (potassium deficiency)

*Causes:*
- Insufficient nutrients
- Incorrect pH levels
- Poor nutrient solution quality

*Solutions:*
- Test and adjust pH (5.5-6.5)
- Increase nutrient concentration
- Use quality hydroponic nutrients

### Environmental Issues

**High Temperature:**
*Symptoms:*
- Wilting plants
- Root rot
- Nutrient deficiency
- Increased water evaporation

*Solutions:*
- Install fans for air circulation
- Use chillers for nutrient solution
- Provide shade in hot weather
- Increase ventilation

**Low Humidity:**
*Symptoms:*
- Crispy leaf edges
- Slow growth
- Leaf curling

*Solutions:*
- Use humidifiers
- Misting systems
- Group plants together
- Water reservoir with plants

### Lighting Problems

**Light Burn:**
*Symptoms:*
- Bleached or yellow spots on leaves
- Curling upward
- Dry, crispy leaves

*Solutions:*
- Move lights further away
- Reduce light intensity
- Use proper light fixtures
- Provide appropriate photoperiod

**Insufficient Light:**
*Symptoms:*
- Leggy growth
- Small leaves
- Poor flowering
- Slow growth

*Solutions:*
- Add more grow lights
- Increase light duration
- Use higher intensity lights
- Position lights closer

### Pest Problems

**Aphids:**
*Prevention:*
- Maintain good air circulation
- Inspect new plants
- Use insect screens

*Treatment:*
- Neem oil spray
- Ladybugs (natural predators)
- Insecticidal soap

**Spider Mites:**
*Prevention:*
- Maintain proper humidity
- Regular inspection
- Quarantine new plants

*Treatment:*
- Increase humidity
- Neem oil
- Predatory mites

### System Maintenance

**Regular Checks:**
- Daily: pH and EC levels, water temperature
- Weekly: Inspect roots, check equipment
- Monthly: Deep clean system, replace nutrient solution

**Preventive Measures:**
- Use clean equipment
- Maintain proper water temperature
- Ensure good oxygenation
- Monitor environmental conditions

### Quick Reference Guide

| Problem | Symptom | Quick Fix |
|---------|---------|-----------|
| Root Rot | Brown, slimy roots | Improve aeration, lower temp |
| Nutrient Burn | Crispy leaf tips | Flush with plain water |
| Yellow Leaves | Various causes | Check pH and nutrients |
| Wilting | Multiple causes | Check water, temp, roots |
| Slow Growth | Low light/nutrients | Adjust lighting/feeding |

Prevention is always better than cure. Regular monitoring and maintenance will prevent most problems before they start. Keep a close eye on your plants and act quickly when you notice something unusual!',
  'troubleshooting',
  true,
  NOW() - INTERVAL '3 days'
),
(
  'Urban Hydroponic Farming: Grow Food in Small Spaces',
  'urban-hydroponic-farming-small-spaces',
  'Transform your balcony, rooftop, or small apartment into a productive hydroponic garden.',
  '## Urban Hydroponic Farming: Grow Food in Small Spaces

Living in a city doesn''t mean you can''t grow your own fresh food. Urban hydroponic farming makes it possible to transform even the smallest spaces into productive gardens.

### Why Urban Hydroponics?

**Perfect for City Living:**
- No soil needed - ideal for apartments
- Vertical growing maximizes space
- Clean and mess-free
- Year-round production
- Reduces food miles and carbon footprint

### Space-Saving Hydroponic Systems

**1. Vertical Towers**
- Grow upward, not outward
- Perfect for balconies and corners
- Can accommodate 20-50 plants
- Great for herbs and leafy greens

**2. Window Gardens**
- Use natural sunlight
- Small NFT or DWC systems
- Perfect for herbs and small vegetables
- Easy to maintain

**3. Wall-Mounted Systems**
- Aesthetic and functional
- Living wall effect
- Great for decoration and food
- Saves floor space

**4. Under-Cabinet Systems**
- Utilize unused space
- LED grow lights included
- Perfect for microgreens
- Easy access in kitchen

### What to Grow in Small Spaces

**Best Plants for Urban Hydroponics:**

*Leafy Greens:*
- Lettuce (various varieties)
- Spinach
- Kale
- Swiss chard

*Herbs:*
- Basil
- Mint
- Parsley
- Cilantro
- Rosemary

*Small Vegetables:*
- Cherry tomatoes
- Peppers
- Strawberries
- Radishes

*Microgreens:*
- Sunflower shoots
- Pea shoots
- Wheatgrass
- Various salad mixes

### Setting Up Your Urban Garden

**Step 1: Assess Your Space**
- Available floor space
- Vertical space potential
- Light conditions
- Access to water and electricity
- Temperature control

**Step 2: Choose Your System**
- Consider your space constraints
- Think about what you want to grow
- Plan for future expansion
- Budget considerations

**Step 3: Lighting**
- **Natural light**: 6-8 hours direct sunlight
- **Grow lights**: LED grow lights for indoors
- **Photoperiod**: 12-16 hours depending on plants
- **Timer**: Automate lighting schedule

**Step 4: Environmental Control**
- Temperature: 18-26°C
- Humidity: 40-60%
- Air circulation: Small fans
- CO2 enrichment (optional)

### Small Space Tips

**Maximize Your Harvest:**
- Succession planting: Plant new crops every 2-3 weeks
- Choose fast-growing varieties
- Use vertical growing techniques
- Grow high-value crops (herbs, microgreens)

**Space Optimization:**
- Stack systems vertically
- Use walls and ceilings
- Choose compact plant varieties
- Prune and train plants

**Water & Nutrient Management:**
- Use smaller reservoirs
- Monitor levels more frequently
- Automated dosing systems
- Regular water changes

### Urban Challenges & Solutions

**Limited Space:**
- Use vertical systems
- Choose compact varieties
- Grow high-value crops

**Lack of Natural Light:**
- LED grow lights
- Light-reflective surfaces
- Mirror walls

**Noise Concerns:**
- Silent air pumps
- Quality fans
- Soundproofing

**Aesthetics:**
- Beautiful system designs
- Decorative plant choices
- Hide equipment when possible

### Starting Your Urban Garden

**Beginner Setup (1-2 plants):**
- Small DWC system
- LED grow light
- Basic nutrients
- pH testing kit

**Intermediate Setup (10-20 plants):**
- NFT or multiple DWC systems
- Grow lights for entire setup
- Timer for automation
- More comprehensive nutrients

**Advanced Setup (30+ plants):**
- Vertical tower system
- Full environmental control
- Automated monitoring
- Multiple growing zones

### Maintenance Schedule

**Daily:**
- Check water levels
- Monitor pH and EC
- Inspect plants for problems
- Check equipment operation

**Weekly:**
- Top off nutrients
- Clean system components
- Prune and harvest
- Adjust plant positions

**Monthly:**
- Deep clean entire system
- Replace nutrient solution
- Inspect and replace parts
- Plan next crops

### Urban Farming Benefits

**Personal:**
- Fresh, organic food
- Cost savings on groceries
- Relaxing hobby
- Learning experience

**Environmental:**
- Reduced food miles
- Lower water usage
- No pesticide runoff
- Reduced packaging waste

**Community:**
- Share excess produce
- Teach others
- Build community gardens
- Local food resilience

### Success Stories

Many urban growers are producing impressive amounts of food:
- **Balcony gardens**: 50+ heads of lettuce monthly
- **Small apartments**: Complete herb and salad supply
- **Rooftops**: Commercial-scale production
- **Community projects**: Feeding neighborhoods

Urban hydroponic farming is accessible to everyone, regardless of space constraints. Start small, learn as you grow, and expand your system as you gain experience. Your city apartment can become a productive food garden!',
  'urban',
  true,
  NOW() - INTERVAL '4 days'
);

-- Step 6: Verify the data
SELECT
  title,
  slug,
  category,
  is_published,
  created_at
FROM blogs
ORDER BY created_at DESC;

-- Success message
SELECT '✅ Database setup completed successfully! ' ||
       COUNT(*) || ' blog posts created.' as success_message
FROM blogs
WHERE is_published = true;
