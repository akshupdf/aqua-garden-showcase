# Supabase Permission Fix - Complete Guide

## Problem Identified
The 401 Unauthorized error occurred because the admin panel needs the service role key to perform CRUD operations.

## Root Cause
- Supabase anon key can only read published posts (per RLS policies)
- To create, update, delete, and manage unpublished posts, we need the service role key

## Solution Status ✅ PARTIALLY IMPLEMENTED

### What's Fixed:
1. ✅ Updated `supabase.ts` to handle missing service role key gracefully
2. ✅ Updated `AdminPage.tsx` to use admin client for all operations
3. � Added fallback to anon key if service role key is missing
4. ✅ Created diagnostic scripts and documentation

### What Still Needs Your Action:
1. ❌ **You need to add the service role key** to your `.env` file

## Quick Fix (2 Steps)

### Step 1: Get Your Service Role Key
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings > API**
4. Copy the `service_role` key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### Step 2: Add to .env File
Open your `.env` file and add:
```env
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Verify
```bash
node check-env.cjs
```
You should see all three variables marked as ✅

## Detailed Instructions

### Complete Fix Guide
See: [GET_SERVICE_ROLE_KEY.md](./GET_SERVICE_ROLE_KEY.md)

### Environment Variables
Your `.env` file should contain:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## After Adding the Key
Restart your development server and test:
- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Publish/unpublish posts
- ✅ Delete posts
- ✅ Upload cover images

## Current Behavior (Without Service Role Key)
If you haven't added the service role key yet:
- The app will show a warning in console
- Admin panel will load but operations may fail
- You can still view blogs
- CRUD operations will have limited permissions

## Files Created/Updated

### Updated Files:
- `src/lib/supabase.ts` - Added admin client with fallback
- `src/components/admin/AdminPage.tsx` - Uses admin client

### New Files:
- `.env.example` - Template for environment variables
- `check-env.cjs` - Diagnostic script
- `GET_SERVICE_ROLE_KEY.md` - Step-by-step guide
- `SUPABASE_PERMISSION_FIX.md` - This file
- `run-database-migration.sh` - Database helper script

## Security Note
The service role key has full access to your database. Never expose it to the public. It's safe to use in the admin panel since it's a protected area.

## Need Help?
1. Run `node check-env.cjs` to check your setup
2. Follow [GET_SERVICE_ROLE_KEY.md](./GET_SERVICE_ROLE_KEY.md) for detailed instructions
3. Check browser console for any error messages