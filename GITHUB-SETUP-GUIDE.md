# 🔐 GitHub Actions Secrets Setup Guide

## ✅ Step 1: Go to Your GitHub Repository

Your code has been successfully pushed to:
**Repository:** `akshupdf/aqua-garden-showcase`

Visit: https://github.com/akshupdf/aqua-garden-showcase

## ✅ Step 2: Navigate to GitHub Actions Settings

1. Click on **Settings** tab in your repository
2. In the left sidebar, click on **Secrets and variables** → **Actions**
3. You'll see a page titled "Actions secrets and variables"

## ✅ Step 3: Add GitHub Secrets

Click **"New repository secret"** for each of the following:

### **Secret 1: VITE_SUPABASE_URL**
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://kjkurecvtxohvsvbworc.supabase.co`
- **Click:** "Add secret"

### **Secret 2: VITE_SUPABASE_ANON_KEY**
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `sb_publishable_1CBJz5ItdgrMRMduTmWhXw_w_ExTRTj`
- **Click:** "Add secret"

## ✅ Step 4: Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. You should see the workflow: "Supabase Heartbeat Monitor"
3. GitHub may ask you to enable Actions - click "Enable Actions on this repository"

## ✅ Step 5: Test the Workflow

1. In the **Actions** tab, click on "Supabase Heartbeat Monitor"
2. Click **"Run workflow"** button (top right)
3. Select the `main` branch
4. Click **"Run workflow"** to test immediately
5. Wait for the workflow to complete (should take ~30 seconds)

## ✅ Step 6: Verify It Works

1. Click on the workflow run you just triggered
2. Expand the steps to see the logs
3. Look for: `✅ Heartbeat successful - Supabase project is active`
4. If successful, you'll see it run automatically every 6 hours!

## 🎯 What This Accomplishes

✅ **Prevents Supabase Free Tier pausing** - Heartbeat runs every 6 hours
✅ **Automated monitoring** - No manual intervention needed
✅ **Free solution** - Uses GitHub Actions (no cost)
✅ **Reliable** - Runs even when your computer is off
✅ **Easy monitoring** - Check GitHub Actions tab anytime

## 🔧 Troubleshooting

**If GitHub Actions fails:**
1. Check that secrets are copied exactly (no extra spaces)
2. Verify your Supabase project is not paused
3. Check the workflow logs in GitHub Actions tab
4. Make sure Actions is enabled in your repository

**If secrets don't save:**
1. Make sure you have admin/owner permissions
2. Try refreshing the page and adding again
3. Check for any special characters in values

## 📊 Monitoring Schedule

Your heartbeat will run automatically:
- **Every 6 hours:** 00:00, 06:00, 12:00, 18:00 UTC
- **Manual trigger:** Available anytime via Actions tab
- **Status checks:** Visit Actions tab to see recent runs

## 🎉 After Setup

Your Supabase project will stay active 24/7! The heartbeat will:
- Send requests every 6 hours
- Keep your Free Tier project from pausing
- Work automatically in the background
- Provide monitoring logs in GitHub Actions

---

## 📞 Next Steps

1. **Set up the secrets** (follow steps above)
2. **Test the workflow** (manual trigger)
3. **Monitor first 24 hours** (check Actions tab)
4. **Relax!** - Your Supabase is now protected

**That's it! Your Free Tier Supabase project will never pause again.** 🎉