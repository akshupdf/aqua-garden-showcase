# 🚀 Quick Start: Supabase Blog Setup

## ✅ Ready to Start? Follow These Steps:

### **Step 1: Create New Supabase Project** (5 minutes)
- Go to: https://supabase.com
- Create new project: `asquare-hydroponics-blog`
- Wait 2-3 minutes for setup

### **Step 2: Run SQL Script** (2 minutes)
- Go to: SQL Editor in Supabase dashboard
- Copy & run the SQL from `SUPABASE_SETUP.md`
- This creates your "blogs" table

### **Step 3: Update Environment Variables** (1 minute)
**Option A - Use the helper script:**
```bash
node update-env.js https://your-project.supabase.co your-anon-key
```

**Option B - Manual update:**
1. Open `.env` file
2. Replace the old values with your new credentials:
```env
VITE_SUPABASE_URL=your-new-url
VITE_SUPABASE_ANON_KEY=your-new-key
```

### **Step 4: Test** (30 seconds)
```bash
# Restart dev server
npm run dev

# Visit blog page
# http://localhost:8080/articles

# Check browser console for:
# ✅ Supabase Connection Successful!
```

### **Step 5: Create Your First Blog Post** (5 minutes)
- Visit: `http://localhost:8080/create-articles`
- Write your first hydroponics blog post
- Click "Publish"
- See it appear on the blog page!

---

## 📚 Important Files:

- **`SUPABASE_SETUP.md`** - Detailed setup instructions
- **`update-env.js`** - Helper script to update credentials
- **`.env`** - Your environment variables (update this!)

---

## 🎯 What You'll Get:

✅ **Working blog system** with database storage
✅ **Create & publish** blog posts from admin panel
✅ **Categorized articles** (Basics, Education, Systems, etc.)
✅ **Search functionality** for articles
✅ **Markdown support** for rich content
✅ **Responsive design** for all devices

---

## 🔧 Troubleshooting:

**Problem:** "Table blogs doesn't exist"
**Solution:** Run the SQL script from SUPABASE_SETUP.md

**Problem:** "Invalid API key"
**Solution:** Update your .env file with new credentials

**Problem:** Can't create blog posts
**Solution:** Check Row Level Security policies in SQL script

---

## 🎉 You're Ready!

Once you complete these steps, your blog will be fully functional!

Need help? Check the browser console for detailed error messages.
