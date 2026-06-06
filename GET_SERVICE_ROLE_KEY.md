# How to Get Your Supabase Service Role Key

## Why You Need This Key
The service role key is required for admin operations like:
- Creating new blog posts
- Editing existing posts
- Publishing/unpublishing posts
- Deleting posts
- Uploading images

Without this key, these operations will fail with a 401 Unauthorized error.

## Step-by-Step Guide

### 1. Go to Supabase Dashboard
1. Open your web browser
2. Go to [https://app.supabase.com](https://app.supabase.com)
3. Select your project (e.g., "asquare-hydroponics")

### 2. Navigate to API Settings
1. In the left sidebar, click on **Settings**
2. Then click on **API**

### 3. Copy the Service Role Key
1. In the "Project API keys" section
2. Find the row labeled **`service_role`**
3. Click the **copy icon** 📋 next to the key
4. The key starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. Add to Your .env File
1. Open the `.env` file in your project root
2. Add this line at the bottom:
   ```
   VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   (Paste the key you just copied)

3. Save the file

### 5. Restart Development Server
```bash
# If using npm
npm run dev

# If using another dev server, stop it and restart
```

## Example .env File
```env
VITE_SUPABASE_URL=https://kjkurecvtxohvsvbworc.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_1CBJz5ItdgrMRMduTmWhXw_w_ExTRTj
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Verify the Fix
1. Run this command to check your environment:
   ```bash
   node check-env.cjs
   ```
2. You should see "✅ VITE_SUPABASE_SERVICE_ROLE_KEY: FOUND"
3. Visit the admin panel: http://localhost:8080/admin
4. Try creating a new blog post - it should work now!

## Security Note
⚠️ **Important**: The service role key has full access to your database. Never:
- Commit it to version control (add to .gitignore)
- Share it publicly
- Use it in client-side code that will be seen by users

The key is safe to use in the admin panel since it's a protected area.

## Troubleshooting
If you still get errors after adding the key:
1. Check that you copied the entire key (no extra spaces)
2. Restart your development server
3. Run `node check-env.cjs` to verify
4. Check browser console for any remaining errors